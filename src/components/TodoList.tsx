import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { Todo } from "../store/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
const todos = useSelector((state: RootState) => state.todo.todos);
  return (
    <div>
      {todos.map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
