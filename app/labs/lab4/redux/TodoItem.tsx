import type { ReduxTodo } from "./todosReducer";

export default function TodoItem({ todo, deleteTodo, setTodo }: {
  todo: ReduxTodo;
  deleteTodo: (id: string) => void;
  setTodo: (todo: ReduxTodo) => void;
}) {
  return (
    <li className="mb-1 flex items-center justify-between rounded border border-neutral-200 px-3 py-1">
      <span>{todo.title}</span>
      <span className="flex gap-2">
        <button type="button" onClick={() => setTodo({ ...todo })} className="rounded bg-yellow-400 px-2 py-0.5 text-sm">
          Edit
        </button>
        <button type="button" onClick={() => deleteTodo(todo.id)} className="rounded bg-red-600 px-2 py-0.5 text-sm text-white">
          Delete
        </button>
      </span>
    </li>
  );
}
