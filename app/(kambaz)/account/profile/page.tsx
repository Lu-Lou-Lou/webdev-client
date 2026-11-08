"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";


import { useUsersStore } from "../../store/usersStore";

export default function Profile() {
  const updateUser = useUsersStore((state) => state.updateUser);
  const [profile, setProfile] = useState<User | null>(null);
  const [dob, setDob] = useState("2000-01-01");
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) { router.push("/account/signin"); return; }
    const frame = requestAnimationFrame(() => setProfile({ ...currentUser }));
    return () => cancelAnimationFrame(frame);
  }, [currentUser, router]);
  const signout = () => { setCurrentUser(null); router.push("/account/signin"); };
  if (!profile || !currentUser) return null;
  return (
    <div id="wd-profile-screen" className="max-w-sm">
      <h1 className="mb-3 text-2xl font-semibold">Profile</h1>
      <input
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        id="wd-username"
        placeholder="username"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.password}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.firstName}
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
        placeholder="First Name"
        id="wd-firstname"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.lastName}
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        placeholder="Last Name"
        id="wd-lastname"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        type="date"
        id="wd-dob"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <input
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        type="email"
        id="wd-email"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      />
      <select
        value={profile.role}
        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        id="wd-role"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">Teaching assistant</option>
        <option value="STUDENT">Student</option>
      </select>
      <button type="button" id="wd-update-profile-btn" onClick={() => { updateUser(profile); setCurrentUser({ ...profile }); }} className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white">Update</button>
      <button
        type="button"
        onClick={signout}
        id="wd-signout-btn"
        className="block w-full rounded bg-red-600 px-3 py-2 text-center text-white no-underline"
      >
        Signout
      </button>
    </div>
  );
}