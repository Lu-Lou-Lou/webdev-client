import Link from "next/link";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name" className="mb-1 block text-sm">
        Assignment Name
      </label>
      <input
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
        className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
      />

      <textarea
        id="wd-description"
        className="mb-6 h-40 w-full rounded border border-neutral-300 p-3"
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Vercel."
      />

      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="wd-points" className="w-1/3 text-right text-sm">
          Points
        </label>
        <input
          id="wd-points"
          defaultValue={100}
          className="flex-1 rounded border border-neutral-300 px-3 py-2"
        />
      </div>
      <div className="mb-4 flex items-center gap-4">
        <label htmlFor="wd-group" className="w-1/3 text-right text-sm">
          Assignment Group
        </label>
        <select
          id="wd-group"
          defaultValue="ASSIGNMENTS"
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
          defaultValue="Percentage"
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
            defaultValue="Online"
            className="w-full rounded border border-neutral-300 px-3 py-2"
          >
            <option value="Online">Online</option>
            <option value="Paper">Paper</option>
          </select>
          <div className="mt-4 mb-2 font-semibold">Online Entry Options</div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-media-recordings" />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-student-annotation" />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input type="checkbox" id="wd-file-upload" />
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
            defaultValue="Everyone"
            className="mb-4 w-full rounded border border-neutral-300 px-3 py-2"
          />

          <label htmlFor="wd-due-date" className="mb-1 block font-semibold">
            Due
          </label>
          <input
            type="date"
            id="wd-due-date"
            defaultValue="2024-05-13"
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
                defaultValue="2024-05-06"
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
        <Link
          href={`/courses/${cid}/assignments`}
          id="wd-save"
          className="rounded bg-red-600 px-4 py-2 text-white no-underline"
        >
          Save
        </Link>
      </div>
    </div>
  );
}