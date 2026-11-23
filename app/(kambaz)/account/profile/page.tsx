"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";
import * as client from "../client";
import { useUsersStore } from "../../store/usersStore";

export default function Profile() {
  const syncUser = useUsersStore((state) => state.syncUser);
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { currentUser, setCurrentUser } = useAccountContext();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }
    const frame = requestAnimationFrame(() => setProfile(currentUser));
    return () => cancelAnimationFrame(frame);
  }, [currentUser, router]);

  const updateProfile = async () => {
    if (!profile) return;
    setBusy(true);
    setError("");
    try {
      const user = await client.updateUser(profile);
      syncUser(user);
      setCurrentUser(user);
      setProfile(user);
    } catch (error) {
      setError(client.getAccountError(error, "Unable to update your profile."));
    } finally {
      setBusy(false);
    }
  };

  const signout = async () => {
    setBusy(true);
    setError("");
    try {
      await client.signout();
      setCurrentUser(null);
      router.push("/account/signin");
    } catch (error) {
      setError(client.getAccountError(error, "Unable to sign out."));
    } finally {
      setBusy(false);
    }
  };

  if (!profile) return error ? <p role="alert">{error}</p> : null;
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
        value={profile.password ?? ""}
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
        id="wd-password"
        placeholder="New password (optional)"
        type="password"
        autoComplete="new-password"
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
        value={profile.dob ?? "2000-01-01"}
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
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
        disabled
        id="wd-role"
        className="mb-2 w-full rounded border border-neutral-300 px-3 py-2"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">Teaching assistant</option>
        <option value="STUDENT">Student</option>
      </select>
      {error && <p role="alert" className="mb-2 text-sm text-red-600">{error}</p>}
      <button type="button" id="wd-update-profile-btn" onClick={updateProfile} disabled={busy} className="mb-2 block w-full rounded bg-blue-600 px-3 py-2 text-white">Update</button>
      <button
        type="button"
        onClick={signout}
        disabled={busy}
        id="wd-signout-btn"
        className="block w-full rounded bg-red-600 px-3 py-2 text-center text-white no-underline"
      >
        Signout
      </button>
    </div>
  );
}
