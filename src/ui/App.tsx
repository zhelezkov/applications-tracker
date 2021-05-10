import { Layout } from 'antd';
import { useGate, useStore } from 'effector-react';
import React from 'react';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import Auth from './features/auth/Auth';
import { $isAuthenticated, usersGate } from './features/auth/model';
import { schemaGate } from './features/schema/model';

function App() {
  useGate(usersGate);
  useGate(schemaGate);

  const isAuthenticated = useStore($isAuthenticated);

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <Layout>
      <AppHeader />
      <AppContent />
    </Layout>
  );
}

export default App;
