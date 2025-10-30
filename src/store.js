import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menu/menuSlice.js';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});