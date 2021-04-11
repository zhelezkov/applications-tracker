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

  const [users, setUsers] = React.useState<User[]>([]);

  const ipc = useIpc();

  useEffect(() => {
    const users = ipc.sendSync('listUsers');
    console.log('users', users);
    setUsers(users);
  }, []);

  return (
    <div>
      <Auth />
    </div>
  );
}

export default App;
