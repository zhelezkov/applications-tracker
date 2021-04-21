import React, { useEffect } from 'react';
import Auth from './features/auth/Auth';
import { useAppDispatch } from './app/hooks';
import { authenticate } from './features/auth/authSlice';

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
