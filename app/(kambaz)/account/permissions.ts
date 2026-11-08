import type { User } from "./AccountContext";

export function canManageCourses(user: User | null) {
  return user === null || user.role === "FACULTY" || user.role === "ADMIN";
}
