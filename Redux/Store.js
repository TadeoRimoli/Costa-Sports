import { configureStore } from '@reduxjs/toolkit';
import GeneralSlice from './slices/GeneralSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ecommerceAPI } from '../src/services/ecommerceAPI';

const store = configureStore({
  reducer: {
    General: GeneralSlice,
    [ecommerceAPI.reducerPath]:ecommerceAPI.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ecommerceAPI.middleware) // Corrección: Utilizar getDefaultMiddleware() en lugar de buildGetDefaultMiddleware
  // middleware
});

setupListeners(store.dispatch)

export default store;
