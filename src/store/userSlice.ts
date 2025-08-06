import { createSlice} from "@reduxjs/toolkit";
import  type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  uid: string | null;
  email: string | null;
  role: "user" | "admin" | "super-admin";
}

const initialState: UserState = {
  uid: null,
  email: null,
  role: "user", 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logoutUser(state) {
      state.uid = null;
      state.email = null;
      state.role = "user";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
