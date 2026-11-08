"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import {
  emptyCourse,
  useCoursesStore,
  type Course,
} from "../store/coursesStore";

import { useAccountContext } from "../account/AccountContext";
import { canManageCourses } from "../account/permissions";
import { useEnrollmentsStore } from "../store/enrollmentsStore";

export default function Dashboard() {
  const courses = useCoursesStore((state) => state.courses);
  const addCourse = useCoursesStore((state) => state.addCourse);
  const updateCourse = useCoursesStore((state) => state.updateCourse);
  const [course, setCourse] = useState<Course>(emptyCourse);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const enrollments = useEnrollmentsStore((state) => state.enrollments);
  const { currentUser } = useAccountContext();
  const canManage = canManageCourses(currentUser);
  const handleAddCourse = () => {
    if (!canManageCourses(currentUser)) return;
    addCourse(course);
  };
  const handleUpdateCourse = () => {
    if (!canManageCourses(currentUser)) return;
    updateCourse(course);
  };
  const visibleCourses = currentUser && !showAllCourses ? courses.filter((c) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === c._id)) : courses;
  return (
    <div id="wd-dashboard">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <div className="flex gap-2">
          <button id="wd-my-enrollments-toggle" type="button" aria-pressed={showAllCourses} onClick={() => setShowAllCourses(!showAllCourses)} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">My Enrollments</button>
          <button id="wd-enrollments-toggle" type="button" aria-pressed={showAllCourses} onClick={() => setShowAllCourses(!showAllCourses)} className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white">Enrollments</button>
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
          onClick={handleAddCourse}
        >
          Add
        </button>
        <button
          type="button"
          className="rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
          id="wd-update-course-click"
          onClick={handleUpdateCourse}
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
      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />
      <div
        id="wd-dashboard-courses"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {visibleCourses.map((c) => (
          <CourseCard
            key={c._id}
            course={c}
            onEdit={() => {
              if (!canManageCourses(currentUser)) return;
              setCourse({ ...c });
            }}
          />
        ))}
      </div>
    </div>
  );
}
