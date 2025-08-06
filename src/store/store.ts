// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import  userReducer  from "./userSlice";
import userListReducer from "./userListSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    userList:userListReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
