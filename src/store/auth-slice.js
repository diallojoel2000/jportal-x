import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: { isAuthenticated: false } };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser(state, payload) {
      console.log("authenticated", payload);
      state.user = payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
