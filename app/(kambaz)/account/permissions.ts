import type { User } from "./AccountContext";

export function canManageCourses(user: User | null) {
  return user?.role === "FACULTY" || user?.role === "ADMIN";
}
