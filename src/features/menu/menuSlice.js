import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};


export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
    closeMenu: (state) => {
      state.open = false;
    },
  },
});


export const { toggleMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;