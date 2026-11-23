"use client";

import { useCallback, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import {
  emptyCourse,
  useCoursesStore,
  type Course,
} from "../store/coursesStore";

import { useAccountContext } from "../account/AccountContext";
import { canManageCourses } from "../account/permissions";
import * as client from "../courses/client";
import { enrollIntoCourse, unenrollFromCourse } from "../courses/enrollmentsClient";
import { getAccountError } from "../account/client";

export default function Dashboard() {
  const courses = useCoursesStore((state) => state.courses);
  const setCourses = useCoursesStore((state) => state.setCourses);
  const [course, setCourse] = useState<Course>(emptyCourse);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useAccountContext();
  const userId = currentUser?._id;
  const canManage = canManageCourses(currentUser);

  const refresh = useCallback(async (active: () => boolean = () => true) => {
    const [all, mine] = await Promise.all([
      client.fetchAllCourses(),
      userId ? client.findMyCourses() : Promise.resolve([]),
    ]);
    if (active()) {
      setCourses(all);
      setMyCourses(mine);
    }
  }, [setCourses, userId]);

  useEffect(() => {
    let active = true;
    refresh(() => active).catch((error: unknown) => {
      if (active) setError(getAccountError(error, "Unable to load courses."));
    });
    return () => { active = false; };
  }, [refresh]);

  async function applyChange(change: () => Promise<unknown>) {
    setBusy(true);
    setError("");
    try {
      await change();
      await refresh();
    } catch (error) {
      setError(getAccountError(error, "Unable to save the course change."));
    } finally {
      setBusy(false);
    }
  }

  const visibleCourses = userId && !showAllCourses ? myCourses : courses;
  return (
    <div id="wd-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div className="flex gap-2">
          <button id="wd-my-enrollments-toggle" type="button" aria-pressed={!showAllCourses} onClick={() => setShowAllCourses(false)} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">My Enrollments</button>
          <button id="wd-enrollments-toggle" type="button" aria-pressed={showAllCourses} onClick={() => setShowAllCourses(true)} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">Enrollments</button>
        </div>
      </div>
      <hr />
      {canManage && <>
      <h5 className="flex flex-wrap items-center gap-2">
        New Course
        <button
          type="button"
          className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          id="wd-add-new-course-click"
          disabled={busy || !course.name.trim()}
          onClick={() => applyChange(() => client.createCourse(course))}
        >
          Add
        </button>
        <button
          type="button"
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
          id="wd-update-course-click"
          disabled={busy || course._id === emptyCourse._id || !course.name.trim()}
          onClick={() => applyChange(() => client.updateCourse(course))}
        >
          Update
        </button>
      </h5>
      <input
        className="mb-2 mt-2 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.name}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
        id="wd-course-name"
      />
      <textarea
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        rows={3}
        value={course.description}
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
        id="wd-course-description"
      />
      <label htmlFor="wd-course-number">Sample course number</label>
      <input
        type="text"
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.number}
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
        id="wd-course-number"
      />
      <label htmlFor="wd-course-my-number">My course number</label>
      <input
        type="text"
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.number}
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
        id="wd-course-my-number"
      />
      <label htmlFor="wd-course-start-date">Start date</label>
      <input
        type="date"
        className="mb-3 block w-full max-w-xl rounded border border-neutral-300 px-3 py-1.5"
        value={course.startDate}
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
        id="wd-course-start-date"
      />
      </>}
      <hr />
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((c) => {
          const enrolled = myCourses.some((item) => item._id === c._id);
          return (
          <CourseCard
            key={c._id}
            course={c}
            enrolled={enrolled}
            busy={busy}
            onEdit={() => setCourse({ ...c })}
            onDelete={() => applyChange(async () => {
              await client.deleteCourse(c._id);
              if (course._id === c._id) setCourse(emptyCourse);
            })}
            onToggleEnrollment={() => {
              if (!userId) return;
              const change = enrolled ? unenrollFromCourse : enrollIntoCourse;
              void applyChange(() => change(userId, c._id));
            }}
          />
          );
        })}
      </div>
    </div>
  );
}
