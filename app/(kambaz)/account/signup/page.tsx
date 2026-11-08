"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";

import { useUsersStore } from "../../store/usersStore";

export default function Signup() {
  const addUser = useUsersStore((state) => state.addUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const { setCurrentUser } = useAccountContext();
  const router = useRouter();

  const signup = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    if (password !== verifyPassword) {
      setError("Passwords do not match. Enter the same password in both fields.");
      return;
    }
    setError("");
    setCurrentUser(addUser({
      _id: crypto.randomUUID(),
      username,
      password,
      firstName: "",
      lastName: "",
      email: "",
      role: "STUDENT",
      loginId: "",
      section: "",
      lastActivity: "",
      totalActivity: "",
    }));
    router.push("/account/profile");
  };

  return (
    <div id="wd-signup-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Sign up</h1>
      <input
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
        id="wd-password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        value={verifyPassword}
        onChange={(event) => {
          setVerifyPassword(event.target.value);
          setError("");
        }}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "wd-signup-error" : undefined}
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      {error && <p id="wd-signup-error" role="alert" className="mb-2 text-sm text-red-600">{error}</p>}
      <button className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-center text-white" type="button" onClick={signup} id="wd-signup-btn">
        Sign up
      </button>{" "}
      <Link href="/account/signin" id="wd-signin-link">
        Sign in
      </Link>
    </div>
  );
}
