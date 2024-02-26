import { configureStore } from '@reduxjs/toolkit';
import GeneralSlice from './slices/GeneralSlice';

const store = configureStore({
  reducer: {
    General: GeneralSlice,
  },
  // middleware
});

export default store;
