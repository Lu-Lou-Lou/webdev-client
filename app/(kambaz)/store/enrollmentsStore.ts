"use client";

import { create } from "zustand";
import enrollmentsJson from "../database/enrollments.json";

export type Enrollment = (typeof enrollmentsJson)[number];
type EnrollmentsStore = {
  enrollments: Enrollment[];
  enroll: (user: string, course: string) => void;
  unenroll: (user: string, course: string) => void;
};

export const useEnrollmentsStore = create<EnrollmentsStore>((set) => ({
  enrollments: enrollmentsJson,
  enroll: (user, course) => set((state) => ({
    enrollments: state.enrollments.some((item) => item.user === user && item.course === course)
      ? state.enrollments
      : [...state.enrollments, { _id: crypto.randomUUID(), user, course }],
  })),
  unenroll: (user, course) => set((state) => ({
    enrollments: state.enrollments.filter((item) => item.user !== user || item.course !== course),
  })),
}));
