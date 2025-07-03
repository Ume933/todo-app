import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleComplete,
  editTodo,
  updateStatus,
} from "../store/todoSlice";
import { useState } from "react";

interface Props {
  id: string;
  text: string;
  status: "pending" | "in-progress" | "completed";
}

const TodoItem = ({ id, text, status }: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    dispatch(editTodo({ id, newText: editedText }));
    setIsEditing(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateStatus({ id, newStatus: e.target.value as "pending" | "in-progress" | "completed" }));
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <input
        type="checkbox"
        checked={status === "completed"}
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
          <span
            style={{
              textDecoration: status === "completed" ? "line-through" : "none",
              color:
                status === "completed"
                  ? "gray"
                  : status === "in-progress"
                  ? "orange"
                  : "black",
            }}
          >
            {text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <select value={status} onChange={handleStatusChange}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
    </div>
  );
};

export default TodoItem;
