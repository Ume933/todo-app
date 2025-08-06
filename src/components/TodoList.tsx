// Dashboard.tsx or TodoList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todoSlice";
import type { RootState, AppDispatch } from "../store/store";
import TodoItem from "./TodoItem";

 const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    console.log("dispatching fetchtodos");
    dispatch(fetchTodos());
  }, [dispatch]);

  // const handleDelete = (id: string) => {
  //   dispatch(deleteTodo(id));
  // };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {todos.map((todo) => (
         <TodoItem 
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          status={todo.status}
        />
      ))}
    </div>
  );
};
export default TodoList;
