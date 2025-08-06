import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"; 
import type { Todo } from "../types/todo";
import type { PayloadAction } from "@reduxjs/toolkit";
interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

// ===================== Thunks =====================

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const data = await api.getTodos();
    console.log("Redux Todos:", data); 

  return data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Omit<Todo, "id">) => {
  const data = await api.createTodo(todo);
  return data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string) => {
  await api.deleteTodo(id);
  return id;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updatedFields }: { id: string; updatedFields: Partial<Todo> }) => {
    const data = await api.updateTodo(id, updatedFields);
    return data;
  }
);

// ===================== Slice =====================
//track the state api call
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {//request start
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch todos";
      })

      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })

      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })

      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export default todoSlice.reducer;
