import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../store/todoSlice";
import type { AppDispatch } from "../store/store";
import type { Todo } from "../store/todoSlice";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className="flex justify-between items-center p-2 border-b">
      <span
        onClick={() => dispatch(toggleTodo(todo.id))}
        className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
