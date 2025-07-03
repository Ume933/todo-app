import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import type { AppDispatch } from "../store/store";

const AddTodo = () => {
const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  
  const dispatch = useDispatch<AppDispatch>();

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") return;
    dispatch(addTodo({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 bg-gray-100 rounded shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded"
      ></textarea>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add Task
      </button>
    </form>
  );
};

export default AddTodo;
