"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAssignmentsStore } from "../../../store/assignmentsStore";
import { useAccountContext } from "../../../account/AccountContext";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentItem from "./AssignmentItem";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { currentUser } = useAccountContext();
  const canManage = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const assignments = useAssignmentsStore((state) => state.assignments);
  const deleteAssignment = useAssignmentsStore((state) => state.deleteAssignment);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  return (
    <div id="wd-assignments">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="relative">
          <FaSearch className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500" />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded border border-neutral-300 py-1.5 pr-3 pl-9 text-sm"
          />
        </div>
        {canManage && <div className="flex gap-2">
          <button
            id="wd-add-assignment-group"
            type="button"
            className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          >
            <FaPlus /> Group
          </button>
          <button
            id="wd-add-assignment"
            onClick={() => router.push(`/courses/${cid}/assignments/new`)}
            type="button"
            className="inline-flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            <FaPlus /> Assignment
          </button>
        </div>}
      </div>
      <h3
        id="wd-assignments-title"
        className="mb-3 flex items-center justify-between rounded bg-neutral-200 p-3 text-lg"
      >
        <span>ASSIGNMENTS 40% of Total</span>
        {canManage && <button
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}
          type="button"
          className="rounded border border-neutral-300 bg-white px-2 py-0.5 text-sm"
        >
          <FaPlus />
        </button>}
      </h3>
      <ul id="wd-assignment-list" className="m-0 list-none p-0">
        {assignments.filter((assignment) => assignment.course === cid && assignment.name.toLowerCase().includes(search.toLowerCase())).map((assignment) => (
          <AssignmentItem key={assignment._id} cid={cid} aid={assignment._id} title={assignment.name}
            details={`Multiple Modules | Not available until ${assignment.availableFrom} | Due ${assignment.dueDate} | ${assignment.points} pts`}
            onDelete={canManage ? () => setDeletingId(assignment._id) : undefined} />
        ))}
      </ul>
      {deletingId && (
        <div id="wd-delete-assignment-dialog" role="dialog" aria-modal="true" aria-labelledby="wd-delete-assignment-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
            <h3 id="wd-delete-assignment-title" className="mb-4 text-lg">Delete this assignment?</h3>
            <div className="flex justify-end gap-2">
              <button id="wd-delete-assignment-cancel" type="button" className="rounded border border-neutral-300 px-3 py-1.5" onClick={() => setDeletingId(null)}>Cancel</button>
              <button id="wd-delete-assignment-confirm" type="button" className="rounded bg-red-600 px-3 py-1.5 text-white" onClick={() => { deleteAssignment(deletingId, cid); setDeletingId(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}