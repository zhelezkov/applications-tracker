import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import schemaSlice from '../features/schema/schemaSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    schema: schemaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
