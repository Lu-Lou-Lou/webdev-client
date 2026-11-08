"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { emptyUser, useAccountContext, type User } from "../../../../account/AccountContext";
import { useUsersStore } from "../../../../store/usersStore";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser, setCurrentUser } = useAccountContext();
  const canManage = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const users = useUsersStore((state) => state.users);
  const addUser = useUsersStore((state) => state.addUser);
  const updateUser = useUsersStore((state) => state.updateUser);
  const enrollments = useEnrollmentsStore((state) => state.enrollments);
  const enroll = useEnrollmentsStore((state) => state.enroll);
  const unenroll = useEnrollmentsStore((state) => state.unenroll);
  const [person, setPerson] = useState<User>({ ...emptyUser });
  const enrolled = users.filter((user) => enrollments.some((item) => item.user === user._id && item.course === cid));
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!canManage) return;
    if (person._id) {
      updateUser(person);
      if (person._id === currentUser?._id) setCurrentUser({ ...person });
    } else {
      const user = addUser(person);
      enroll(user._id, cid);
    }
    setPerson({ ...emptyUser });
  };
  return (
    <div id="wd-people-table" className="overflow-x-auto">
      {canManage && <form onSubmit={save} id="wd-people-form" className="mb-4 flex flex-wrap items-end gap-2">
        {(["firstName", "lastName", "username", "password", "email", "loginId", "section", "lastActivity", "totalActivity"] as const).map((field) => (
          <label key={field} className="text-sm">
            {field}
            <input id={`wd-person-${field}`} type={field === "password" ? "password" : "text"} value={person[field]} onChange={(event) => setPerson({ ...person, [field]: event.target.value })} className="block rounded border border-neutral-300 px-3 py-1.5" />
          </label>
        ))}
        <label className="text-sm">Role
          <select id="wd-person-role" value={person.role} onChange={(event) => setPerson({ ...person, role: event.target.value })} className="block rounded border border-neutral-300 px-3 py-1.5">
            {["USER", "ADMIN", "FACULTY", "STUDENT", "TA"].map((role) => <option key={role}>{role}</option>)}
          </select>
        </label>
        <button id="wd-save-person" type="submit" className="rounded bg-blue-600 px-3 py-1.5 text-white">{person._id ? "Update" : "Add person"}</button>
        {person._id && <button type="button" onClick={() => setPerson({ ...emptyUser })} className="rounded border border-neutral-300 px-3 py-1.5">Cancel</button>}
      </form>}
      <table className="w-full border-collapse text-left text-sm">
        <thead><tr className="border-b border-neutral-300">
          {["Name", "Login ID", "Section", "Role", "Last Activity", "Total Activity"].map((label) => <th key={label} className="p-2">{label}</th>)}
          {canManage && <th className="p-2">Actions</th>}
        </tr></thead>
        <tbody>{enrolled.map((user) => <tr key={user._id} className="odd:bg-neutral-50">
          <td className="wd-full-name p-2 text-nowrap"><FaUserCircle className="me-2 inline text-4xl text-neutral-500" /><span className="wd-first-name">{user.firstName}</span>{" "}<span className="wd-last-name">{user.lastName}</span></td>
          <td className="wd-login-id p-2">{user.loginId}</td><td className="wd-section p-2">{user.section}</td><td className="wd-role p-2">{user.role}</td><td className="wd-last-activity p-2">{user.lastActivity}</td><td className="wd-total-activity p-2">{user.totalActivity}</td>
          {canManage && <td className="p-2"><button type="button" onClick={() => setPerson({ ...user })} className="me-2 rounded bg-yellow-400 px-2 py-1">Edit</button><button type="button" onClick={() => unenroll(user._id, cid)} className="rounded bg-red-600 px-2 py-1 text-white">Remove</button></td>}
        </tr>)}</tbody>
      </table>
    </div>
  );
}
