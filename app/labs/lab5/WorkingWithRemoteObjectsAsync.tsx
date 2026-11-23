"use client";

import { useEffect, useState } from "react";
import { fetchAssignment, updateTitle, type Assignment } from "./client";

export default function WorkingWithRemoteObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAssignment() {
      try {
        const result = await fetchAssignment();
        if (active) {
          setAssignment(result);
          setTitle(result.title);
        }
      } catch {
        if (active) setError("Unable to load the assignment.");
      }
    }

    void loadAssignment();
    return () => {
      active = false;
    };
  }, []);

  async function saveTitle() {
    setSaving(true);
    setError("");
    try {
      const result = await updateTitle(title);
      setAssignment(result);
      setTitle(result.title);
    } catch {
      setError("Unable to update the assignment title.");
    } finally {
      setSaving(false);
    }
  }

  const fieldClass = "block w-full max-w-md rounded border border-neutral-300 px-2 py-1";

  return (
    <div id="wd-asynchronous-objects" className="space-y-3">
      <h3 className="text-xl font-bold">Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <input
        aria-label="Assignment title"
        className={fieldClass}
        value={title}
        disabled={!assignment || saving}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        aria-label="Assignment description"
        className={fieldClass}
        rows={3}
        value={assignment?.description ?? ""}
        readOnly
      />
      <input
        aria-label="Assignment due date"
        className="block rounded border border-neutral-300 px-2 py-1"
        type="date"
        value={assignment?.due ?? ""}
        readOnly
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={assignment?.completed ?? false} disabled />
        Completed
      </label>
      <button
        type="button"
        className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white disabled:opacity-50"
        onClick={saveTitle}
        disabled={!assignment || saving || !title.trim() || title === "." || title === ".."}
      >
        Update Title
      </button>
      {error && <p role="alert">{error}</p>}
      <pre className="overflow-x-auto">{JSON.stringify(assignment ?? {}, null, 2)}</pre>
      <hr />
    </div>
  );
}
