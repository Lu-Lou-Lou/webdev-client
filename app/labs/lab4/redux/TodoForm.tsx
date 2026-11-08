import type { ReduxTodo } from "./todosReducer";

export default function TodoForm({ todo, setTodo, addTodo, updateTodo }: {
  todo: ReduxTodo;
  setTodo: (todo: ReduxTodo) => void;
  addTodo: () => void;
  updateTodo: () => void;
}) {
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      <input
        id="wd-local-todo-title"
        className="rounded border border-neutral-300 px-2 py-1"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <button
        type="button"
        id="wd-local-add-todo"
        className="rounded bg-green-600 px-3 py-1.5 text-sm text-white"
        onClick={todo.id === "-1" ? addTodo : updateTodo}
      >
        {todo.id === "-1" ? "Add" : "Update"}
      </button>
    </div>
  );
}
