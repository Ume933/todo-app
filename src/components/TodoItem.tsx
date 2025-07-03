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
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

const TodoItem = ({ id, title, description, status }: Props) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleEdit = () => {
    dispatch(editTodo({ id, newTitle: editedTitle, newDescription: editedDescription }));
    setIsEditing(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateStatus({ id, newStatus: e.target.value as "pending" | "in-progress" | "completed" }));
  };

  return (
    <div className="flex flex-col border rounded p-3 mb-2">
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={status === "completed"}
          onChange={() => dispatch(toggleComplete(id))}
          className="mr-2"
        />
        {isEditing ? (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Title"
              className="border p-1 rounded mb-1"
            />
            <input
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Description"
              className="border p-1 rounded"
            />
            <button onClick={handleEdit} className="bg-blue-500 text-white px-2 py-1 rounded mt-1">Save</button>
          </>
        ) : (
          <div>
            <strong
              style={{
                textDecoration: status === "completed" ? "line-through" : "none",
                color:
                  status === "completed"
                    ? "gray"
                    : status === "in-progress"
                    ? "red"
                    : "green",
              }}
            >
              {title}
            </strong>
            <p
              style={{
                textDecoration: status === "completed" ? "line-through" : "none",
                color:
                  status === "completed"
                    ? "gray"
                    : status === "in-progress"
                    ? "red"
                    : "green",
              }}
            >
              {description}
            </p>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
          </div>
        )}
        <select value={status} onChange={handleStatusChange} className="ml-auto border p-1 rounded">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => dispatch(deleteTodo(id))} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
