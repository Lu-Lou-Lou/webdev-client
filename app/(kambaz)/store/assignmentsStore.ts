"use client";

import { create } from "zustand";
import type assignmentsJson from "../database/assignments.json";

export type Assignment = (typeof assignmentsJson)[number];
export const emptyAssignment: Assignment = {
  _id: "new", course: "", name: "New Assignment",
  points: 100, group: "ASSIGNMENTS", displayGradeAs: "Percentage",
  submissionType: "Online", assignTo: "Everyone", textEntry: false, websiteUrl: false,
  mediaRecordings: false, studentAnnotation: false, fileUpload: false,
  description: "", dueDate: "", availableFrom: "", availableUntil: "", notes: "",
};

type AssignmentsStore = {
  assignments: Assignment[];
  setAssignments: (assignments: Assignment[]) => void;
  addAssignment: (assignment: Assignment) => void;
  updateAssignment: (assignment: Assignment) => void;
  deleteAssignment: (id: string, course: string) => void;
};

export const useAssignmentsStore = create<AssignmentsStore>((set) => ({
  assignments: [],
  setAssignments: (assignments) => set({ assignments }),
  addAssignment: (assignment) => set((state) => ({
    assignments: [...state.assignments, assignment],
  })),
  updateAssignment: (assignment) => set((state) => ({
    assignments: state.assignments.map((item) =>
      item._id === assignment._id && item.course === assignment.course ? { ...assignment } : item),
  })),
  deleteAssignment: (id, course) => set((state) => ({
    assignments: state.assignments.filter((item) => item._id !== id || item.course !== course),
  })),
}));
