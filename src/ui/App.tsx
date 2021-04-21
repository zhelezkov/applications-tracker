import React from 'react';
import Auth from './features/auth/Auth';
import { HashRouter, Route } from 'react-router-dom';
import Orders from './features/orders/Orders';

function App() {
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
