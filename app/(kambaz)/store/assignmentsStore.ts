"use client";

import { create } from "zustand";
import assignmentsJson from "../database/assignments.json";

export type Assignment = (typeof assignmentsJson)[number];
export const emptyAssignment: Assignment = {
  ...assignmentsJson[0], _id: "new", course: "", name: "New Assignment",
  description: "", dueDate: "", availableFrom: "", availableUntil: "", notes: "",
};

type AssignmentsStore = {
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string, course: string) => void;
};

export const useAssignmentsStore = create<AssignmentsStore>((set) => ({
  assignments: assignmentsJson,
  addAssignment: (assignment) => set((state) => ({
    assignments: [...state.assignments, { ...assignment, _id: crypto.randomUUID() }],
  })),
  updateAssignment: (assignment) => set((state) => ({
    assignments: state.assignments.map((item) =>
      item._id === assignment._id && item.course === assignment.course ? { ...assignment } : item),
  })),
  deleteAssignment: (id, course) => set((state) => ({
    assignments: state.assignments.filter((item) => item._id !== id || item.course !== course),
  })),
}));
