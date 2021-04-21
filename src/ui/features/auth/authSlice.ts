import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface AuthState {
  authenticated: boolean;
  user?: string;
}

const initialState: AuthState = {
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { authUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
