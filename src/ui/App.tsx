import React, { useEffect } from 'react';
import Auth from './features/auth/Auth';
import useIpc, { useAppDispatch } from './app/hooks';
import { authenticate } from './features/auth/authSlice';
import type { User } from '../types/user';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(authenticate());
    }, 2000);
  }, [dispatch]);

  return <Auth />;
}

export default App;
