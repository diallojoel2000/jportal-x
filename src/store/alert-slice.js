import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: { errors: {} }, displayMessage: null };

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    showError(state, payload) {
      state.message = payload;
    },
    showSuccess(state, payload) {},
  },
});

export const alertActions = alertSlice.actions;
export default alertSlice;
