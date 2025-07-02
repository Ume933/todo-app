// components/TodoItem.tsx
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleComplete,
  editTodo,
} from "../store/todoSlice";
import { useState } from "react";

interface Props {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem = ({ id, text, completed }: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    dispatch(editTodo({ id, newText: editedText }));
    setIsEditing(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleComplete(id))}
      />
      {isEditing ? (
        <>
          <input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: completed ? "line-through" : "none" }}>
            {text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
    </div>
  );
};

export default TodoItem;
