import { createContext, createElement, useContext, useState, type ReactNode } from "react";

export type Todo = { id: string; title: string };

type TodosContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextValue | null>(null);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (title: string) => {
    if (!title.trim()) return;
    const todo = { id: crypto.randomUUID(), title: title.trim() };
    setTodos((current) => [...current, todo]);
  };
  const updateTodo = (todo: Todo) => {
    if (!todo.title.trim()) return;
    setTodos((current) => current.map((item) =>
      item.id === todo.id ? { ...todo, title: todo.title.trim() } : item
    ));
  };
  const deleteTodo = (id: string) =>
    setTodos((current) => current.filter((todo) => todo.id !== id));

  return createElement(TodosContext.Provider, {
    value: { todos, addTodo, updateTodo, deleteTodo },
  }, children);
}

export function useTodosContext() {
  const value = useContext(TodosContext);
  if (!value) throw new Error("useTodosContext must be used inside TodosProvider");
  return value;
}
