"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Module from "./Module";
import ModulesControls from "./ModulesControls";
import { useModulesStore } from "../../../store/modulesStore";
import { useAccountContext } from "../../../account/AccountContext";
import { canManageCourses } from "../../../account/permissions";
import { getAccountError } from "../../../account/client";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useAccountContext();
  const canManage = canManageCourses(currentUser);
  const { modules, setModules, addModule, updateModule, deleteModule } = useModulesStore();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    client.findModulesForCourse(cid).then((items) => {
      if (active) setModules(items);
    }).catch((error: unknown) => {
      if (active) setError(getAccountError(error, "Unable to load modules."));
    });
    return () => { active = false; };
  }, [cid, setModules]);

  async function save(change: () => Promise<void>) {
    setError("");
    try {
      await change();
      return true;
    } catch (error) {
      setError(getAccountError(error, "Unable to save the module change."));
      return false;
    }
  }

  return (
    <div>
      <ModulesControls onCreate={canManage ? (name) => save(async () => {
        addModule(await client.createModuleForCourse(cid, name));
      }) : undefined} />
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <ul id="wd-modules" className="m-0 list-none p-0">
        {modules.filter((module) => module.course === cid).map((module) => (
          <Module key={module._id} module={module}
            onUpdate={canManage ? (name) => save(async () => {
              updateModule(await client.updateModule(module._id, name));
            }) : undefined}
            onDelete={canManage ? () => void save(async () => {
              await client.deleteModule(module._id);
              deleteModule(module._id);
            }) : undefined}
          />
        ))}
      </ul>
    </div>
  );
}
