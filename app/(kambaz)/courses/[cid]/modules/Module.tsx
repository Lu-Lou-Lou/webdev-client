import { useState } from "react";
import type { CourseModule } from "../../../store/modulesStore";
import ModuleControlButtons from "./ModuleControlButtons";
import Lesson from "./Lesson";
export default function Module({ module, onUpdate, onDelete }: {
  module: CourseModule;
  onUpdate?: (name: string) => Promise<boolean>;
  onDelete?: () => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2">
        {draft === null ? <span>{module.name}</span> : (
          <input
            aria-label="Module name"
            className="w-1/2 rounded border border-neutral-300 px-2 py-1 text-base"
            value={draft}
            readOnly={saving}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={async (event) => {
              if (event.key === "Escape" && !saving) setDraft(null);
              if (event.key !== "Enter" || !draft.trim() || saving || !onUpdate) return;
              setSaving(true);
              if (await onUpdate(draft)) setDraft(null);
              setSaving(false);
            }}
          />
        )}
        <ModuleControlButtons onEdit={onUpdate && (() => setDraft(module.name))} onDelete={onDelete} />
      </div>
      <ul className="wd-lessons m-0 list-none p-0">{module.lessons?.map((lesson) => <Lesson key={lesson._id} title={lesson.name}>{lesson.description.split("\n").filter(Boolean).map((item, index) => <li key={index} className="wd-content-item">{item}</li>)}</Lesson>)}</ul>
    </li>
  );
}
