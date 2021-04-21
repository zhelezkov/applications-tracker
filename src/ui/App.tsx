import React from 'react';
import Auth from './features/auth/Auth';
import { HashRouter, Route } from 'react-router-dom';
import Orders from './features/orders/Orders';
import { useAppDispatch } from './app/hooks';
import { useAsync } from 'react-use';
import { loadSchema } from '../types/schema';
import { setSchema } from './features/schema/schemaSlice';

function App() {
  const dispatch = useAppDispatch();
  useAsync(async () => {
    const schema = await loadSchema();
    dispatch(setSchema(schema));
  }, []);

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
