import { useState } from "react";
import type { ReduxTodo } from "./todosReducer";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const emptyTodo: ReduxTodo = { id: "-1", title: "Learn Mongo" };

export default function TodoList() {
  const [todos, setTodos] = useState<ReduxTodo[]>([
    { id: "1", title: "Learn HTML" },
    { id: "2", title: "Learn CSS" },
  ]);
  const [todo, setTodo] = useState<ReduxTodo>(emptyTodo);
  const addTodo = () => {
    setTodos([...todos, { ...todo, id: crypto.randomUUID() }]);
    setTodo(emptyTodo);
  };
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((item) => item.id !== id));
    if (todo.id === id) setTodo(emptyTodo);
  };
  const updateTodo = () => {
    setTodos(todos.map((item) => item.id === todo.id ? { ...todo } : item));
    setTodo(emptyTodo);
  };
  return (
    <div id="wd-local-todo-list">
      <h3>Local State Todo List</h3>
      <TodoForm todo={todo} setTodo={setTodo} addTodo={addTodo} updateTodo={updateTodo} />
      <ul className="m-0 max-w-lg list-none p-0">
        {todos.map((item) => (
          <TodoItem key={item.id} todo={item} deleteTodo={deleteTodo} setTodo={setTodo} />
        ))}
      </ul>
    </div>
  );
}
