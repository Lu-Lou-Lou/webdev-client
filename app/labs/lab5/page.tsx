import Environment from "./Environment";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithRemoteObjects from "./WorkingWithRemoteObjects";

export default function Lab5() {
  return (
    <div id="wd-lab5" className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">Lab 5</h2>
      <Environment />
      <PathParameters />
      <QueryParameters />
      <WorkingWithRemoteObjects />
    </div>
  );
}
