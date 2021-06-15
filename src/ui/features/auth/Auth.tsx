import { Button, Input, message, Select } from 'antd';
import { useStore } from 'effector-react';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { $users, $usersById, userSelected } from './model';
import { compare } from 'bcryptjs';

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

const PasswordInput = styled(Input.Password)`
  max-width: 300px;
  margin-bottom: 32px;
`;

const Auth = () => {
  const users = useStore($users);
  const usersById = useStore($usersById);

  const [selectedUser, selectUser] = useState<number>();
  const [password, setPassword] = useState<string>();

  const handleUserSelect = useCallback((id?: number) => {
    selectUser(id);
  }, []);

  const handleEnter = useCallback(async () => {
    if (!selectedUser || !password) return;
    const user = usersById[selectedUser];
    if (!user) return;
    const passwordsEqual = await compare(password, user.password);
    if (!passwordsEqual) {
      message.error('неверный пароль');
      return;
    }
    userSelected(selectedUser);
  }, [password, selectedUser, usersById]);

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  return (
    <Wrapper>
      <UserSelect
        value={selectedUser}
        placeholder="Выберите пользователя"
        onChange={handleUserSelect}
      >
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </UserSelect>
      {Boolean(selectedUser) && (
        <PasswordInput
          placeholder="Введите пароль"
          value={password}
          onChange={handlePasswordChange}
        />
      )}
      <Button
        color="primary"
        disabled={!selectedUser || !password}
        onClick={handleEnter}
      >
        Войти
      </Button>
    </Wrapper>
  );
};

export default Auth;
