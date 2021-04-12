import styled from 'styled-components';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import useIpc from '../../app/hooks';
import React, { useCallback, useEffect } from 'react';

import type { User } from '../../../types/user';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const UserSelect = styled(Select)`
  min-width: 300px;
  margin-bottom: 32px;
`;

export default () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, selectUser] = React.useState<User | null>(null);

  const ipc = useIpc();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await ipc.invoke('listUsers');
      console.log('users', users);
      setUsers(users);
    };

    fetchUsers();
  }, [ipc]);

  const handleUserSelect = useCallback(
    (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const id = event.target.value as number;
      console.log(id);
      selectUser(users.find((user) => user.id === id) ?? null);
    },
    [users]
  );

  return (
    <Wrapper>
      <FormControl>
        <InputLabel id="user-choose">Выберите пользователя</InputLabel>
        <UserSelect
          value={selectedUser?.id ?? ''}
          labelId="user-choose"
          onChange={handleUserSelect}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </UserSelect>
        <Button color="primary" variant="contained">
          Войти
        </Button>
      </FormControl>
    </Wrapper>
  );
};
