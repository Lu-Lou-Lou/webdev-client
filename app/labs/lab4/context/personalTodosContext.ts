import { createContext, createElement, useContext, useState, type ReactNode } from "react";

export type Todo = { id: string; title: string };

type PersonalTodosContextValue = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const PersonalTodosContext = createContext<PersonalTodosContextValue | null>(null);

export function PersonalTodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (title: string) => {
    if (!title.trim()) return;
    const todo = { id: crypto.randomUUID(), title: title.trim() };
    setTodos((current) => [...current, todo]);
  };
  const updateTodo = (todo: Todo) => {
    setTodos((current) => current.map((item) =>
      item.id === todo.id ? { ...todo } : item
    ));
  };
  const deleteTodo = (id: string) =>
    setTodos((current) => current.filter((todo) => todo.id !== id));

  return createElement(PersonalTodosContext.Provider, {
    value: { todos, addTodo, updateTodo, deleteTodo },
  }, children);
}

export function usePersonalTodosContext() {
  const value = useContext(PersonalTodosContext);
  if (!value) throw new Error("usePersonalTodosContext must be used inside PersonalTodosProvider");
  return value;
}
