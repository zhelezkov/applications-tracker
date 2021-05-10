import { Button, Select } from 'antd';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import useIpc from '../../ipc';

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
` as typeof Select;

const Auth = () => {
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
    (id?: number) => {
      console.log(id);
      selectUser(users.find((user) => user.id === id) ?? null);
    },
    [users]
  );

  return (
    <Wrapper>
      <UserSelect
        value={selectedUser?.id}
        placeholder="Выберите пользователя"
        onChange={handleUserSelect}
      >
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </UserSelect>
      <Button color="primary">Войти</Button>
    </Wrapper>
  );
};

export default Auth;
