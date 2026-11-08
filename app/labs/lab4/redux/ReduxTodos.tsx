import ReduxTodoForm from "./ReduxTodoForm";
import ReduxTodoItem from "./ReduxTodoItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./todosReducer";
import type { RootState } from "./store";

export default function ReduxTodos() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("Learn Mongo");
  const [editingId, setEditingId] = useState<string | null>(null);
  return (
    <div id="wd-redux-todos">
      <h3>Redux Todo List</h3>
      <ReduxTodoForm title={title} setTitle={setTitle} editingId={editingId} save={() => {
        if (editingId) {
          dispatch(updateTodo({ id: editingId, title }));
          setEditingId(null);
        } else {
          dispatch(addTodo(title));
        }
        setTitle("Learn Mongo");
      }} />
      <ul className="m-0 max-w-lg list-none p-0">
        {todos.map((todo) => (
          <ReduxTodoItem key={todo.id} todo={todo} edit={(item) => {
            setTitle(item.title);
            setEditingId(item.id);
          }} remove={(id) => dispatch(deleteTodo(id))} />
        ))}
      </ul>
    </div>
  );
}
