import { createSlice } from "@reduxjs/toolkit";

const initialState = { title: null, errors: [], displayMessage: null };

const alertSlice = createSlice({
  name: "e",
  initialState: initialState,
  reducers: {
    showError(state, payload) {},
    showSuccess(state, payload) {},
  },
});

export const alertActions = alert.actions;
export default alertSlice;
