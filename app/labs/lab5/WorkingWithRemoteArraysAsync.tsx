"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { createNewTodo, deleteTodo, fetchTodos, postNewTodo, removeTodo, updateTodo, type Todo } from "./client";

export default function WorkingWithRemoteArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [busy, setBusy] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [edit, setEdit] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTodos() {
      try {
        const result = await fetchTodos();
        if (active) setTodos(result);
      } catch {
        if (active) setErrorMessage("Unable to load todos.");
      } finally {
        if (active) setBusy(false);
      }
    }

    void loadTodos();
    return () => {
      active = false;
    };
  }, []);

  async function applyTodoChange(change: () => Promise<void>, fallback: string) {
    setBusy(true);
    setErrorMessage("");
    try {
      await change();
    } catch (error) {
      const message = axios.isAxiosError<{ message?: unknown }>(error)
        ? error.response?.data?.message
        : undefined;
      setErrorMessage(typeof message === "string" ? message : fallback);
    } finally {
      setBusy(false);
    }
  }

  function saveTodo(id: number, changes: Partial<Pick<Todo, "title" | "completed">>) {
    return applyTodoChange(async () => {
      await updateTodo(id, changes);
      setTodos((current) => current.map((todo) => todo.id === id ? { ...todo, ...changes } : todo));
      if (changes.title !== undefined) setEdit(null);
    }, "Unable to update the todo.");
  }

  return (
    <div id="wd-asynchronous-arrays" className="space-y-3">
      <h3 className="text-xl font-bold">Working with Arrays Asynchronously</h3>
      <h4 className="flex items-center gap-3">
        Todos
        <button
          type="button"
          id="wd-create-todo"
          aria-label="Create todo"
          className="text-green-600 disabled:opacity-50"
          disabled={busy}
          onClick={() => applyTodoChange(async () => setTodos(await createNewTodo()), "Unable to create a todo.")}
        >
          <FaPlusCircle aria-hidden="true" />
        </button>
        <button
          type="button"
          id="wd-post-todo"
          aria-label="Create todo with POST"
          className="text-blue-600 disabled:opacity-50"
          disabled={busy}
          onClick={() => applyTodoChange(async () => {
            const todo = await postNewTodo({ title: "New Posted Todo", completed: false });
            setTodos((current) => [...current, todo]);
          }, "Unable to post the todo.")}
        >
          <FaPlusCircle aria-hidden="true" />
        </button>
      </h4>
      {errorMessage && (
        <p id="wd-todo-error-message" role="alert" className="rounded bg-red-100 px-3 py-2 text-red-800">
          {errorMessage}
        </p>
      )}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <input
              aria-label={`Completed: ${todo.title}`}
              type="checkbox"
              checked={todo.completed}
              disabled={busy}
              onChange={(event) => saveTodo(todo.id, { completed: event.target.checked })}
            />
            {edit?.id === todo.id ? (
              <input
                autoFocus
                aria-label="Edit todo title"
                className="rounded border px-2 py-1"
                value={edit.title}
                readOnly={busy}
                onChange={(event) => setEdit({ id: todo.id, title: event.target.value })}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && !busy) setEdit(null);
                  if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    if (!busy && edit.title.trim()) void saveTodo(todo.id, { title: edit.title });
                  }
                }}
              />
            ) : (
              <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
            )}
            <button
              type="button"
              aria-label={`Edit ${todo.title}`}
              className="text-blue-600 disabled:opacity-50"
              disabled={busy}
              onClick={() => setEdit({ id: todo.id, title: todo.title })}
            >
              <FaPencilAlt aria-hidden="true" />
            </button>
            <button
              type="button"
              id="wd-remove-todo"
              aria-label={`Remove ${todo.title}`}
              className="text-red-600 disabled:opacity-50"
              disabled={busy}
              onClick={() => applyTodoChange(async () => {
                setTodos(await removeTodo(todo));
                if (edit?.id === todo.id) setEdit(null);
              }, "Unable to remove the todo.")}
            >
              <FaTrash aria-hidden="true" />
            </button>
            <button
              type="button"
              id="wd-delete-todo"
              aria-label={`Delete ${todo.title} with HTTP DELETE`}
              className="text-2xl text-red-600 disabled:opacity-50"
              disabled={busy}
              onClick={() => applyTodoChange(async () => {
                await deleteTodo(todo);
                setTodos((current) => current.filter((item) => item.id !== todo.id));
                if (edit?.id === todo.id) setEdit(null);
              }, "Unable to delete the todo.")}
            >
              <TiDelete aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
