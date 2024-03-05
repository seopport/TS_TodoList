import React from 'react';
import Layout from './components/Layout';
import TodoPage from './components/TodoPage';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TodoPage />
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
