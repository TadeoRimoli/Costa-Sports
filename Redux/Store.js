import { configureStore } from '@reduxjs/toolkit';
import GeneralSlice from './slices/GeneralSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ecommerceAPI } from '../src/services/ecommerceAPI';
import { authApi } from '../src/services/authAPI';
import { profileApi } from '../src/services/profileApi';

const store = configureStore({
  reducer: {
    General: GeneralSlice,
    [ecommerceAPI.reducerPath]:ecommerceAPI.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [profileApi.reducerPath]:profileApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ecommerceAPI.middleware,authApi.middleware,profileApi.middleware) 
});

setupListeners(store.dispatch)

export default store;
