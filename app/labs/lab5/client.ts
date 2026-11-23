import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export type Assignment = {
  id: number;
  title: string;
  description: string;
  due: string;
  completed: boolean;
  score: number;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

export const fetchWelcomeMessage = async (): Promise<string> => {
  const response = await axios.get<string>(`${HTTP_SERVER}/lab5/welcome`);
  return response.data;
};

export const fetchHello = async (signal?: AbortSignal): Promise<{ message: string }> => {
  const response = await fetch("/api/lab5/hello", { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

export const fetchAssignment = async (): Promise<Assignment> => {
  const response = await axios.get<Assignment>(ASSIGNMENT_API);
  return response.data;
};

export const updateTitle = async (title: string): Promise<Assignment> => {
  const response = await axios.get<Assignment>(
    `${ASSIGNMENT_API}/title/${encodeURIComponent(title)}`
  );
  return response.data;
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(TODOS_API);
  return response.data;
};

export const removeTodo = async (todo: Pick<Todo, "id">): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/${todo.id}/delete`);
  return response.data;
};

export const createNewTodo = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${TODOS_API}/create`);
  return response.data;
};

export const postNewTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  const response = await axios.post<Todo>(TODOS_API, todo);
  return response.data;
};

export const deleteTodo = async (todo: Pick<Todo, "id">): Promise<void> => {
  await axios.delete(`${TODOS_API}/${todo.id}`);
};

export const updateTodo = async (
  id: number,
  changes: Partial<Omit<Todo, "id">>
): Promise<void> => {
  await axios.put(`${TODOS_API}/${id}`, changes);
};
