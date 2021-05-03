import { Layout, Menu } from 'antd';
import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Header: HeaderWrapper } = Layout;

const Logo = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
`;

const Header = () => {
  const { push: pushHistory } = useHistory();
  const { pathname } = useLocation();

  const handleMenuClick = useCallback(
    (info: { key: React.Key }) => {
      if (typeof info.key !== 'string') return;
      pushHistory(info.key);
    },
    [pushHistory]
  );

  return (
    <HeaderWrapper>
      <Logo />
      <Menu
        selectedKeys={[pathname]}
        onClick={handleMenuClick}
        theme="dark"
        mode="horizontal"
      >
        <Menu.Item key="/orders">Заказы</Menu.Item>
        <Menu.Item key="/history">Хроника</Menu.Item>
        <Menu.Item key="/settings">Настройки</Menu.Item>
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
