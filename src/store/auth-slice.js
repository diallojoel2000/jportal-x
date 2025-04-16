import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, permissions: [] };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      console.log("Authenticated");
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
