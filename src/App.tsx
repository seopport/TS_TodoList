import React from 'react';
import Layout from './components/Layout';
import TodoPage from './components/TodoPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
