import { axiosWithCredentials as api } from "../account/client";

const USERS_API = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/users`;

export async function enrollIntoCourse(userId: string, courseId: string) {
  await api.post(`${USERS_API}/${encodeURIComponent(userId)}/courses/${encodeURIComponent(courseId)}`);
}

export async function unenrollFromCourse(userId: string, courseId: string) {
  await api.delete(`${USERS_API}/${encodeURIComponent(userId)}/courses/${encodeURIComponent(courseId)}`);
}
