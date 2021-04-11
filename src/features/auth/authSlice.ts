import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
    authenticate: (state) => {
      state.authenticated = true;
    },
    authUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
  },
});

export const { authenticate, authUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
