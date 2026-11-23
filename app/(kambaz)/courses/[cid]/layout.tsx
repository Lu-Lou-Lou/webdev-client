"use client";

import { ReactNode, useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";
import type { Course } from "../../store/coursesStore";
import { findCourse, findMyCourses } from "../client";

import { useAccountContext } from "../../account/AccountContext";


export default function CoursesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { cid } = useParams();
  const courseId = typeof cid === "string" ? cid : "";
  const [showCourseNav, setShowCourseNav] = useState(true);
  const [loaded, setLoaded] = useState<{ key: string; course?: Course; denied?: boolean }>();
  const { currentUser } = useAccountContext();
  const userId = currentUser?._id;
  const key = JSON.stringify([courseId, userId]);

  useEffect(() => {
    let active = true;
    const request = userId
      ? findMyCourses().then((courses) => courses.find((item) => item._id === courseId))
      : findCourse(courseId);
    request.then((course) => {
      if (active) setLoaded({ key, course, denied: !course });
    }).catch(() => {
      if (active) setLoaded({ key });
    });
    return () => { active = false; };
  }, [courseId, key, userId]);

  if (loaded?.key !== key) return null;
  if (loaded.denied) redirect("/dashboard");
  if (!loaded.course) return <p role="alert">Unable to load this course.</p>;
  const { course } = loaded;
  return (
    <div id="wd-courses">
      <h2 className="text-2xl font-semibold text-red-600">
        <FaAlignJustify
          className="me-4 mb-1 inline cursor-pointer text-xl"
          onClick={() => setShowCourseNav(!showCourseNav)}
          title="Toggle course navigation"
        />
        <Breadcrumb course={course} />
      </h2>
      <hr className="my-3" />
      <div className="flex gap-4">
        {showCourseNav ? (
          <div className="hidden w-[140px] shrink-0 md:block">
            <CourseNavigation cid={courseId} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
