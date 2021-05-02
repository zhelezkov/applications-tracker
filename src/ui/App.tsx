import { useGate, useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Auth from './features/auth/Auth';
import Orders from './features/orders/Orders';
import { $schema, schemaGate } from './features/schema/model';

function App() {
  useGate(schemaGate);

  const schema = useStore($schema);

  useEffect(() => {
    console.log(schema);
  }, [schema]);

  return (
    <HashRouter>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/">
        <Orders />
      </Route>
    </HashRouter>
  );
}

export default App;
