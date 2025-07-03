import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
};

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; description: string }>) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        status: "pending",
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === "completed" ? "pending" : "completed";
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; newTitle: string; newDescription: string }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTitle;
        todo.description = action.payload.newDescription;
      }
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: "pending" | "in-progress" | "completed" }>
    ) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.newStatus;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, editTodo, updateStatus } =
  todoSlice.actions;

export default todoSlice.reducer;
