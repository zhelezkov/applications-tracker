import { Button, Select } from 'antd';
import { useStore } from 'effector-react';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { $currentUser, $users, userSelected } from './model';

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
  const users = useStore($users);
  const currentUser = useStore($currentUser);

  console.log(users);

  const handleUserSelect = useCallback((id?: number) => {
    console.log(id);
    if (!id) return;
    userSelected(id);
  }, []);

  return (
    <Wrapper>
      <UserSelect
        value={currentUser?.id}
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
