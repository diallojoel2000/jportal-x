import { createSlice } from "@reduxjs/toolkit";

const initialState = { pageTitle: null };

const pageTitleSlice = createSlice({
  name: "title",
  initialState: initialState,
  reducers: {
    changeTitle(state, payload) {
      state.pageTitle = payload;
    },
  },
});

export const pageTitleActions = pageTitleSlice.actions;
export default pageTitleSlice;
