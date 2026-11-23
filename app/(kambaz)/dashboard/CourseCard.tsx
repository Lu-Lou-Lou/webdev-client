import Link from "next/link";
import Image from "next/image";
import type { Course } from "../store/coursesStore";

import { useAccountContext } from "../account/AccountContext";
import { canManageCourses } from "../account/permissions";

export default function CourseCard({
  course,
  enrolled, busy, onEdit, onDelete, onToggleEnrollment,
}: {
  course: Course;
  enrolled: boolean;
  busy: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleEnrollment: () => void;
}) {
  const { currentUser } = useAccountContext();
  return (
    <div className="wd-dashboard-course w-[300px] max-w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <Link
        href={!currentUser || enrolled ? `/courses/${course._id}/home` : "/dashboard"}
        className="wd-dashboard-course-link block text-neutral-900 no-underline"
      >
        <Image
          src={course.image}
          width={300}
          height={160}
          alt={course.name}
          className="h-40 w-full object-cover"
        />
        <div className="p-4">
          <h5 className="wd-dashboard-course-title m-0 mb-2 truncate text-lg font-semibold whitespace-nowrap">
            {course.name}
          </h5>
          <p className="wd-dashboard-course-description m-0 mb-3 h-[100px] overflow-hidden text-sm text-neutral-600">
            {course.description}
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            Go
          </button>
          {currentUser && <button
            type="button"
            disabled={busy}
            id={`wd-${enrolled ? "unenroll" : "enroll"}-${course._id}`}
            className={`ms-2 rounded px-3 py-1.5 text-sm font-medium text-white ${enrolled ? "bg-red-600" : "bg-green-600"}`}
            onClick={(event) => {
              event.preventDefault();
              onToggleEnrollment();
            }}
          >{enrolled ? "Unenroll" : "Enroll"}</button>}
          {canManageCourses(currentUser) && <>
          <button
            type="button"
            id="wd-edit-course-click"
            className="ms-2 inline-flex items-center justify-center rounded bg-yellow-400 px-3 py-1.5 text-sm font-medium"
            onClick={(event) => {
              event.preventDefault();
              if (!canManageCourses(currentUser)) return;
              onEdit();
            }}
          >
            Edit
          </button>
          <button
            type="button"
            id="wd-delete-course-click"
            disabled={busy}
            className="ms-2 inline-flex items-center justify-center rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
            onClick={(event) => {
              event.preventDefault();
              if (!canManageCourses(currentUser)) return;
              onDelete();
            }}
          >
            Delete
          </button>
          </>}
        </div>
      </Link>
    </div>
  );
}
