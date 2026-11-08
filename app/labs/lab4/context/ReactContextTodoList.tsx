import { useState, type FormEvent } from "react";
import { useTodosContext, type Todo } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodosContext();
  const [draft, setDraft] = useState<Todo>({ id: "", title: "" });
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.title.trim()) return;
    if (draft.id) updateTodo(draft);
    else addTodo(draft.title);
    setDraft({ id: "", title: "" });
  };

  return (
    <div id="wd-react-context-todo-list" className="my-4 max-w-xl">
      <h3>Sample Context Todo List</h3>
      <form onSubmit={save} className="mb-2 flex flex-wrap gap-2">
        <label htmlFor="wd-context-todo-title">Title</label>
        <input
          id="wd-context-todo-title"
          className="rounded border border-neutral-300 px-3 py-1.5"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          required
        />
        <button id="wd-context-todo-save" type="submit" className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white">
          {draft.id ? "Update" : "Add"}
        </button>
        {draft.id && (
          <button type="button" onClick={() => setDraft({ id: "", title: "" })} className="rounded bg-neutral-600 px-3 py-1.5 text-sm font-medium text-white">
            Cancel
          </button>
        )}
      </form>
      <ul className="m-0 list-none p-0">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center gap-2 rounded border border-neutral-200 p-2">
            <span className="flex-1">{todo.title}</span>
            <button type="button" onClick={() => setDraft({ ...todo })} className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
              Edit
            </button>
            <button type="button" onClick={() => {
              deleteTodo(todo.id);
              if (draft.id === todo.id) setDraft({ id: "", title: "" });
            }} className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
