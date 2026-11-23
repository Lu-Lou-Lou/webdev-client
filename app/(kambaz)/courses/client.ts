import { axiosWithCredentials as api } from "../account/client";
import type { Course } from "../store/coursesStore";
import type { CourseModule } from "../store/modulesStore";
import type { Assignment } from "../store/assignmentsStore";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const MY_COURSES_API = `${HTTP_SERVER}/api/users/current/courses`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const segment = encodeURIComponent;

export async function fetchAllCourses() {
  return (await api.get<Course[]>(COURSES_API)).data;
}

export async function findMyCourses() {
  return (await api.get<Course[]>(MY_COURSES_API)).data;
}

export async function findCourse(courseId: string) {
  return (await api.get<Course>(`${COURSES_API}/${segment(courseId)}`)).data;
}

export async function createCourse(course: Course) {
  return (await api.post<Course>(MY_COURSES_API, course)).data;
}

export async function updateCourse(course: Course) {
  return (await api.put<Course>(`${COURSES_API}/${segment(course._id)}`, course)).data;
}

export async function deleteCourse(id: string) {
  await api.delete(`${COURSES_API}/${segment(id)}`);
}

export async function findModulesForCourse(courseId: string) {
  return (await api.get<CourseModule[]>(`${COURSES_API}/${segment(courseId)}/modules`)).data;
}

export async function createModuleForCourse(courseId: string, name: string) {
  return (await api.post<CourseModule>(`${COURSES_API}/${segment(courseId)}/modules`, { name })).data;
}

export async function updateModule(id: string, name: string) {
  return (await api.put<CourseModule>(`${MODULES_API}/${segment(id)}`, { name })).data;
}

export async function deleteModule(id: string) {
  await api.delete(`${MODULES_API}/${segment(id)}`);
}

export async function findAssignmentsForCourse(courseId: string) {
  return (await api.get<Assignment[]>(`${COURSES_API}/${segment(courseId)}/assignments`)).data;
}

export async function createAssignmentForCourse(courseId: string, assignment: Assignment) {
  return (await api.post<Assignment>(`${COURSES_API}/${segment(courseId)}/assignments`, assignment)).data;
}

export async function updateAssignment(assignment: Assignment) {
  return (await api.put<Assignment>(`${ASSIGNMENTS_API}/${segment(assignment._id)}`, assignment, {
    params: { courseId: assignment.course },
  })).data;
}

export async function deleteAssignment(courseId: string, assignmentId: string) {
  await api.delete(`${ASSIGNMENTS_API}/${segment(assignmentId)}`, { params: { courseId } });
}
