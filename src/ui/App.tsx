import { Layout } from 'antd';
import { useGate } from 'effector-react';
import React from 'react';
import { schemaGate } from '../models/schema';
import AppContent from './AppContent';
import AppHeader from './AppHeader';

function App() {
  useGate(schemaGate);

  // const schema = useStore($schema);

  return (
    <Layout>
      <AppHeader />
      <AppContent />
    </Layout>
  );
}

export default App;
