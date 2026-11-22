"use client";

import { useState } from "react";

export default function WorkingWithRemoteObjects() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;
  const [assignment, setAssignment] = useState({
    title: "NodeJS Assignment",
    score: "0",
    completed: false,
  });
  const [moduleObject, setModuleObject] = useState({
    name: "Introduction to Node.js",
    description: "Learn Express HTTP routes",
  });
  const linkClassName = "inline-block rounded bg-blue-600 px-3 py-2 text-white";

  return (
    <div id="wd-working-with-remote-objects" className="space-y-3">
      <h3 className="text-xl font-bold">Working With Objects</h3>
      <h4>Retrieving Objects</h4>

      <a
        id="wd-retrieve-assignments"
        href={ASSIGNMENT_API_URL}
        className={linkClassName}
      >
        Get Assignment
      </a>

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        href={`${ASSIGNMENT_API_URL}/title`}
        className={linkClassName}
      >
        Get Assignment Title
      </a>

      <h4>Modifying Properties</h4>
      <div className="flex flex-wrap items-center gap-2">
        <a
          id="wd-update-assignment-title"
          href={`${ASSIGNMENT_API_URL}/title/${encodeURIComponent(assignment.title)}`}
          className={linkClassName}
        >
          Update Title
        </a>
        <input
          id="wd-assignment-title"
          aria-label="Assignment title"
          className="rounded border p-2"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          id="wd-update-assignment-score"
          href={`${ASSIGNMENT_API_URL}/score/${encodeURIComponent(assignment.score)}`}
          className={linkClassName}
        >
          Update Score
        </a>
        <input
          id="wd-assignment-score"
          aria-label="Assignment score"
          className="rounded border p-2"
          type="number"
          step="any"
          value={assignment.score}
          onChange={(e) => setAssignment({ ...assignment, score: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          id="wd-update-assignment-completed"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
          className={linkClassName}
        >
          Update Completed
        </a>
        <input
          id="wd-assignment-completed"
          aria-label="Assignment completed"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        />
      </div>

      <h4>Module (On Your Own)</h4>
      <div className="flex flex-wrap gap-2">
        <a id="wd-retrieve-module" href={MODULE_API_URL} className={linkClassName}>
          Get Module
        </a>
        <a
          id="wd-retrieve-module-name"
          href={`${MODULE_API_URL}/name`}
          className={linkClassName}
        >
          Get Module Name
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          id="wd-update-module-name"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(moduleObject.name)}`}
          className={linkClassName}
        >
          Update Module Name
        </a>
        <input
          id="wd-module-name"
          aria-label="Module name"
          className="rounded border p-2"
          value={moduleObject.name}
          onChange={(e) => setModuleObject({ ...moduleObject, name: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          id="wd-update-module-description"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(moduleObject.description)}`}
          className={linkClassName}
        >
          Update Module Description
        </a>
        <input
          id="wd-module-description"
          aria-label="Module description"
          className="rounded border p-2"
          value={moduleObject.description}
          onChange={(e) => setModuleObject({ ...moduleObject, description: e.target.value })}
        />
      </div>
    </div>
  );
}
