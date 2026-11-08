import { useState, type FormEvent } from "react";
import { usePersonalTodosContext } from "./personalTodosContext";

export default function PersonalContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = usePersonalTodosContext();
  const [title, setTitle] = useState("");
  const add = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  };

  return (
    <div id="wd-personal-context-todo-list" className="my-4 max-w-xl">
      <h3>My Context Todo List</h3>
      <form onSubmit={add} className="mb-2 flex flex-wrap gap-2">
        <label htmlFor="wd-personal-context-todo-title">New todo</label>
        <input
          id="wd-personal-context-todo-title"
          className="rounded border border-neutral-300 px-3 py-1.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit" id="wd-personal-context-todo-add" className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white">
          Add
        </button>
      </form>
      <ul className="m-0 list-none p-0">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center gap-2 rounded border border-neutral-200 p-2">
            <input
              aria-label="Todo title"
              className="min-w-0 flex-1 rounded border border-neutral-300 px-3 py-1.5"
              value={todo.title}
              onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
            />
            <button type="button" onClick={() => deleteTodo(todo.id)} className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
