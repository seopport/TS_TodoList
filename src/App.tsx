import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from '../src/shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
