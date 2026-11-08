import { useModulesStore, type CourseModule } from "../../../store/modulesStore";
import ModuleControlButtons from "./ModuleControlButtons";
import Lesson from "./Lesson";
export default function Module({ module }: { module: CourseModule }) {
  const updateModule = useModulesStore((state) => state.updateModule);
  return (
    <li className="wd-module mb-5 overflow-hidden border border-neutral-400 p-0 text-xl">
      <div className="wd-title flex items-center justify-between bg-neutral-200 p-3 ps-2">
        {module.editing ? <input className="w-1/2 rounded border border-neutral-300 px-2 py-1 text-base" defaultValue={module.name} onChange={(e) => updateModule({ ...module, name: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") updateModule({ ...module, editing: false }); }} /> : <span>{module.name}</span>}
        <ModuleControlButtons moduleId={module._id} />
      </div>
      <ul className="wd-lessons m-0 list-none p-0">{module.lessons?.map((lesson) => <Lesson key={lesson._id} title={lesson.name}>{lesson.description.split("\n").filter(Boolean).map((item, index) => <li key={index} className="wd-content-item">{item}</li>)}</Lesson>)}</ul>
    </li>
  );
}
