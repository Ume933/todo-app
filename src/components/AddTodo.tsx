import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import type { AppDispatch } from "../store/store";

const AddTodo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!title || !description) return;

  dispatch(addTodo({
    title, description,
    status: "pending"
  }));
  setTitle("");
  setDescription("");
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default AddTodo;