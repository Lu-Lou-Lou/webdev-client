"use client";

import { create } from "zustand";
import usersJson from "../database/users.json";
import type { User } from "../account/AccountContext";

type UsersStore = {
  users: User[];
  addUser: (user: User) => User;
  updateUser: (user: User) => void;
  syncUser: (user: User) => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
  users: usersJson,
  addUser: (user) => {
    const added = { ...user, _id: crypto.randomUUID() };
    set((state) => ({ users: [...state.users, added] }));
    return added;
  },
  updateUser: (user) => set((state) => ({
    users: state.users.map((item) => item._id === user._id ? { ...user } : item),
  })),
  syncUser: (user) => set((state) => ({
    users: state.users.some((item) => item._id === user._id)
      ? state.users.map((item) => item._id === user._id ? user : item)
      : [...state.users, user],
  })),
}));
