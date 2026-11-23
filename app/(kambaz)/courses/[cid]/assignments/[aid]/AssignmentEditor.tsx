"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emptyAssignment, useAssignmentsStore } from "../../../../store/assignmentsStore";
import * as client from "../../../client";
import { getAccountError } from "../../../../account/client";
import { useAccountContext } from "../../../../account/AccountContext";

export default function AssignmentEditor({ cid, aid }: { cid: string; aid: string }) {
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const canManage = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const { addAssignment, updateAssignment } = useAssignmentsStore();
  const [assignment, setAssignment] = useState(() => ({ ...emptyAssignment, course: cid }));
  const [loaded, setLoaded] = useState(aid === "new");
  const [found, setFound] = useState(aid === "new");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (aid === "new") return;
    let active = true;
    client.findAssignmentsForCourse(cid).then((items) => {
      if (!active) return;
      const original = items.find((item) => item._id === aid);
      if (original) {
        setAssignment(original);
        setFound(true);
      }
    }).catch((error: unknown) => {
      if (active) setError(getAccountError(error, "Unable to load the assignment."));
    }).finally(() => {
      if (active) setLoaded(true);
    });
    return () => { active = false; };
  }, [aid, cid]);

  async function save() {
    if (!canManage || !found) return;
    setBusy(true);
    setError("");
    try {
      if (aid === "new") addAssignment(await client.createAssignmentForCourse(cid, assignment));
      else updateAssignment(await client.updateAssignment(assignment));
      router.push(`/courses/${cid}/assignments`);
    } catch (error) {
      setError(getAccountError(error, "Unable to save the assignment."));
    } finally {
      setBusy(false);
    }
  }

  if (!loaded) return null;
  if (!found || (aid === "new" && !canManage)) {
    return <div>{error || "Assignment not found."} <Link href={`/courses/${cid}/assignments`}>Back to assignments</Link></div>;
  }
  return (
    <div id="wd-assignments-editor">
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <label htmlFor="wd-name" className="mb-1 block text-sm">
        Assignment Name
      </label>
      <input
        id="wd-name"
        disabled={!canManage || busy}
        value={assignment.name}
        onChange={(e) => setAssignment({ ...assignment, name: e.target.value })}
        className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <textarea
        id="wd-description"
        disabled={!canManage || busy}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        className="mb-6 h-40 w-full rounded border border-neutral-300 p-3"
      />

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="wd-points" className="w-1/3 text-right text-sm">
          Points
        </label>
        <input
          id="wd-points"
        disabled={!canManage || busy}
        value={assignment.points}
        onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })}
          className="flex-1 rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="wd-group" className="w-1/3 text-right text-sm">
          Assignment Group
        </label>
        <select
          id="wd-group"
        disabled={!canManage || busy}
        value={assignment.group}
        onChange={(e) => setAssignment({ ...assignment, group: e.target.value })}
          className="flex-1 rounded border border-neutral-300 px-3 py-2"
        >
          <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          <option value="QUIZZES">QUIZZES</option>
          <option value="EXAMS">EXAMS</option>
          <option value="PROJECT">PROJECT</option>
        </select>
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label
          htmlFor="wd-display-grade-as"
          className="w-1/3 text-right text-sm"
        >
          Display Grade as
        </label>
        <select
          id="wd-display-grade-as"
        disabled={!canManage || busy}
        value={assignment.displayGradeAs}
        onChange={(e) => setAssignment({ ...assignment, displayGradeAs: e.target.value })}
          className="flex-1 rounded border border-neutral-300 px-3 py-2"
        >
          <option value="Percentage">Percentage</option>
          <option value="Points">Points</option>
        </select>
      </div>

      <div className="mb-4 flex items-start gap-4">
        <label
          htmlFor="wd-submission-type"
          className="w-1/3 text-right text-sm"
        >
          Submission Type
        </label>
        <div className="flex-1 rounded border border-neutral-300 p-4">
          <select
            id="wd-submission-type"
        disabled={!canManage || busy}
        value={assignment.submissionType}
        onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}
            className="w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
          <div className="mt-4 mb-2 font-semibold">Online Entry Options</div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-text-entry"
        disabled={!canManage || busy}
        checked={assignment.textEntry}
        onChange={(e) => setAssignment({ ...assignment, textEntry: e.target.checked })} />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-website-url"
        disabled={!canManage || busy}
        checked={assignment.websiteUrl}
        onChange={(e) => setAssignment({ ...assignment, websiteUrl: e.target.checked })} />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-media-recordings"
        disabled={!canManage || busy}
        checked={assignment.mediaRecordings}
        onChange={(e) => setAssignment({ ...assignment, mediaRecordings: e.target.checked })} />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-student-annotation"
        disabled={!canManage || busy}
        checked={assignment.studentAnnotation}
        onChange={(e) => setAssignment({ ...assignment, studentAnnotation: e.target.checked })} />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-file-upload"
        disabled={!canManage || busy}
        checked={assignment.fileUpload}
        onChange={(e) => setAssignment({ ...assignment, fileUpload: e.target.checked })} />
            <label htmlFor="wd-file-upload">File Upload</label>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-start gap-4">
        <span className="w-1/3 text-right text-sm">Assign</span>
        <div className="flex-1 rounded border border-neutral-300 p-4">
          <label htmlFor="wd-assign-to" className="mb-1 block font-semibold">
            Assign to
          </label>
          <input
            id="wd-assign-to"
        disabled={!canManage || busy}
        value={assignment.assignTo}
        onChange={(e) => setAssignment({ ...assignment, assignTo: e.target.value })}
            className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
          />

          <label htmlFor="wd-due-date" className="mb-1 block font-semibold">
            Due
          </label>
          <input
            type="date"
            id="wd-due-date"
        disabled={!canManage || busy}
        value={assignment.dueDate}
        onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
            className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="wd-available-from"
                className="mb-1 block font-semibold"
              >
                Available from
              </label>
              <input
                type="date"
                id="wd-available-from"
        disabled={!canManage || busy}
        value={assignment.availableFrom}
        onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
                className="w-full rounded border border-neutral-300 px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="wd-available-until"
                className="mb-1 block font-semibold"
              >
                Until
              </label>
              <input
                type="date"
                id="wd-available-until"
        disabled={!canManage || busy}
        value={assignment.availableUntil}
        onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
                className="w-full rounded border border-neutral-300 px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      <label htmlFor="wd-ai-editor-notes" className="mb-1 block text-sm">
        Sample notes
      </label>
      <textarea
        id="wd-ai-editor-notes"
        disabled={!canManage || busy}
        value={assignment.notes}
        onChange={(e) => setAssignment({ ...assignment, notes: e.target.value })}
        className="mb-6 h-40 w-full rounded border border-neutral-300 p-3"
      />

      <hr className="mb-4 border-neutral-300" />
      <div className="flex justify-end gap-2">
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-cancel"
          className="rounded border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-900 no-underline"
        >
          Cancel
        </Link>
        {canManage && <button
          type="button"
          onClick={save}
          id="wd-save"
          disabled={busy || !assignment.name.trim()}
          className="rounded bg-red-600 px-4 py-2 text-white no-underline"
        >
          Save
        </button>}
      </div>
    </div>
  );
}