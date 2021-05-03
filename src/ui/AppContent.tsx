import { Layout } from 'antd';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import OrdersPage from './pages/orders/OrdersPage';

const { Content } = Layout;

const Wrapper = styled(Content)`
  padding-top: 16px;
  display: flex;
  height: calc(100vh - 64px);
  //overflow: hidden;
`;

const AppContent = () => {
  return (
    <Wrapper>
      <Switch>
        <Route exact path="/orders">
          <OrdersPage />
        </Route>
        <Route exact path="/history">
          <div>/history</div>
        </Route>
        <Route exact path="/settings">
          <div>Настройки</div>
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default AppContent;
