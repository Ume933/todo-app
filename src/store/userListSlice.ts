// store/userListSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers, assignUserRole } from "../api";

export const getAllUsers = createAsyncThunk("sadmin/fetchAll", async () => {
  return await fetchAllUsers();
});

export const updateUserRole = createAsyncThunk(
  "sadmin/updateRole",
  async ({ uid, role }: { uid: string; role: string }) => {
    await assignUserRole(uid, role);
    return { uid, role };
  }
);

interface User {
  uid: string;
  email: string;
  role: string;
}

interface UserListState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserListState = {
  users: [],
  loading: false,
  error: null,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { uid, role } = action.payload;
        const user = state.users.find((u) => u.uid === uid);
        if (user) user.role = role;
      });
  },
});

export default userListSlice.reducer;
