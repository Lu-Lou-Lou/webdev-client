import axios from "axios";
import type { User } from "./AccountContext";

export const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
type Credentials = { username: string; password: string };
type PublicUser = Omit<User, "password">;

export const signin = async (credentials: Credentials): Promise<PublicUser> => {
  const response = await axiosWithCredentials.post<PublicUser>(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (credentials: Credentials): Promise<PublicUser> => {
  const response = await axiosWithCredentials.post<PublicUser>(`${USERS_API}/signup`, credentials);
  return response.data;
};

export const profile = async (): Promise<PublicUser | null> => {
  const response = await axiosWithCredentials.get<PublicUser | null>(`${USERS_API}/profile`);
  return response.data;
};

export const updateUser = async (user: User): Promise<PublicUser> => {
  const { _id, username, firstName, lastName, email, role, dob, password } = user;
  const response = await axiosWithCredentials.put<PublicUser>(`${USERS_API}/${encodeURIComponent(_id)}`, {
    username, firstName, lastName, email, role, dob, password: password || undefined,
  });
  return response.data;
};

export const signout = async (): Promise<void> => {
  await axiosWithCredentials.post(`${USERS_API}/signout`);
};

export function getAccountError(error: unknown, fallback: string): string {
  const message = axios.isAxiosError<{ message?: unknown }>(error)
    ? error.response?.data?.message
    : undefined;
  return typeof message === "string" ? message : fallback;
}
