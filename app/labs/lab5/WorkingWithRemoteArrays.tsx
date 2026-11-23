"use client";

import { useState } from "react";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithRemoteArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    completed: false,
    description: "Create a NodeJS server with ExpressJS",
  });
  const todoUrl = /^[1-9]\d*$/.test(todo.id)
    ? `${API}/${encodeURIComponent(todo.id)}`
    : undefined;
  const linkClass = "inline-block rounded bg-blue-600 px-3 py-1.5 text-sm text-white";
  const inputClass = "rounded border border-neutral-300 px-2 py-1";
  const rowClass = "flex flex-wrap items-center gap-2";

  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>

      <a id="wd-retrieve-todos" href={API} className={linkClass}>
        Get Todos
      </a>

      <h4>Retrieving an Item from an Array by ID</h4>
      <div className={rowClass}>
        <a id="wd-retrieve-todo-by-id" href={todoUrl} className={linkClass}>
          Get Todo by ID
        </a>
        <input
          id="wd-todo-id"
          aria-label="Todo ID"
          className={inputClass}
          value={todo.id}
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
      </div>

      <h4>Filtering Array Items</h4>
      <a id="wd-retrieve-completed-todos" href={`${API}?completed=true`} className={linkClass}>
        Get Completed Todos
      </a>

      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" href={`${API}/create`} className={linkClass}>
        Create Todo
      </a>

      <h4>Removing from an Array</h4>
      <a
        id="wd-remove-todo"
        href={todoUrl && `${todoUrl}/delete`}
        className="inline-block rounded bg-red-600 px-3 py-1.5 text-sm text-white"
      >
        Remove Todo with ID = {todo.id}
      </a>

      <h4>Updating an Item in an Array</h4>
      <div className={rowClass}>
        <a
          id="wd-update-todo-title"
          href={todoUrl && `${todoUrl}/title/${encodeURIComponent(todo.title)}`}
          className={linkClass}
        >
          Update Todo
        </a>
        <input
          id="wd-todo-title"
          aria-label="Todo title"
          className={inputClass}
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>
      <div className={rowClass}>
        <a
          id="wd-update-todo-completed"
          href={todoUrl && `${todoUrl}/completed/${todo.completed}`}
          className={linkClass}
        >
          Complete Todo ID = {todo.id}
        </a>
        <input
          id="wd-todo-completed"
          aria-label="Todo completed"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />
      </div>
      <div className={rowClass}>
        <a
          id="wd-update-todo-description"
          href={todoUrl && `${todoUrl}/description/${encodeURIComponent(todo.description)}`}
          className={linkClass}
        >
          Describe Todo ID = {todo.id}
        </a>
        <input
          id="wd-todo-description"
          aria-label="Todo description"
          className={inputClass}
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
      </div>
    </div>
  );
}
