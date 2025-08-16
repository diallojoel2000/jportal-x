import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null };

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    clearError(state) {
      state.message = null;
    },
    showError(state, payload) {
      state.message = payload;
    },
    showSuccess(state, payload) {
      state.message = payload;
    },
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
