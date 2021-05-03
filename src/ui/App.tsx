import { Layout } from 'antd';
import { useGate } from 'effector-react';
import React from 'react';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import { schemaGate } from './features/schema/model';

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
