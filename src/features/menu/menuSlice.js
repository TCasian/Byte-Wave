import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  shown: true,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
    closeMenu: (state) => {
      state.open = false;
    },
    showHeader: (state, action) => {
      state.shown = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, showHeader } = menuSlice.actions;
export default menuSlice.reducer;
