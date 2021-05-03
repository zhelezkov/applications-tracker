import { Layout } from 'antd';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { $schema, schemaGate } from './features/schema/model';
import Header from './Header';

const { Content } = Layout;

function App() {
  useGate(schemaGate);

  const schema = useStore($schema);

  return (
    <Layout>
      <Header />
      <Content>
        <Switch>
          <Route exact path="/orders">
            <div>/orders</div>
          </Route>
          <Route exact path="/history">
            <div>/history</div>
          </Route>
          <Route exact path="/settings">
            <div>Настройки</div>
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
}

export default App;
