"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { emptyAssignment, useAssignmentsStore } from "../../../../store/assignmentsStore";
import { useAccountContext } from "../../../../account/AccountContext";

export default function AssignmentEditor({ cid, aid }: { cid: string; aid: string }) {
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const canManage = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const assignments = useAssignmentsStore((state) => state.assignments);
  const addAssignment = useAssignmentsStore((state) => state.addAssignment);
  const updateAssignment = useAssignmentsStore((state) => state.updateAssignment);
  const original = assignments.find((item) => item._id === aid && item.course === cid);
  const [assignment, setAssignment] = useState(() => ({ ...(original ?? emptyAssignment), course: cid }));
  const save = () => {
    if (!canManage || (aid !== "new" && !original)) return;
    const draft = { ...assignment, course: cid };
    if (aid === "new") addAssignment(draft);
    else updateAssignment({ ...draft, _id: aid });
    router.push(`/courses/${cid}/assignments`);
  };
  if (aid !== "new" && !original) return <div>Assignment not found. <Link href={`/courses/${cid}/assignments`}>Back to assignments</Link></div>;
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name" className="mb-1 block text-sm">
        Assignment Name
      </label>
      <input
        id="wd-name"
        disabled={!canManage}
        value={assignment.name}
        onChange={(e) => setAssignment({ ...assignment, name: e.target.value })}
        className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <textarea
        id="wd-description"
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
        checked={assignment.textEntry}
        onChange={(e) => setAssignment({ ...assignment, textEntry: e.target.checked })} />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-website-url"
        disabled={!canManage}
        checked={assignment.websiteUrl}
        onChange={(e) => setAssignment({ ...assignment, websiteUrl: e.target.checked })} />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-media-recordings"
        disabled={!canManage}
        checked={assignment.mediaRecordings}
        onChange={(e) => setAssignment({ ...assignment, mediaRecordings: e.target.checked })} />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-student-annotation"
        disabled={!canManage}
        checked={assignment.studentAnnotation}
        onChange={(e) => setAssignment({ ...assignment, studentAnnotation: e.target.checked })} />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-file-upload"
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
        disabled={!canManage}
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
          className="rounded bg-red-600 px-4 py-2 text-white no-underline"
        >
          Save
        </button>}
      </div>
    </div>
  );
}