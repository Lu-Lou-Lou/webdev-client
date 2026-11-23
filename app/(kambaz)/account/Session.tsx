"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useAccountContext } from "./AccountContext";
import { profile } from "./client";
import { useUsersStore } from "../store/usersStore";

export default function Session({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(true);
  const { setCurrentUser } = useAccountContext();

  useEffect(() => {
    let active = true;
    profile().then((user) => {
      if (!active) return;
      setCurrentUser(user);
      if (user) useUsersStore.getState().syncUser(user);
    }).catch(() => {
      if (active) setCurrentUser(null);
    }).finally(() => {
      if (active) setPending(false);
    });
    return () => { active = false; };
  }, [setCurrentUser]);

  return pending ? null : children;
}
