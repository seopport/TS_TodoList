import React from 'react';
import TodoPage from '../components/TodoPage';
import Detail from '../components/Detail';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<TodoPage />} />
          <Route path='/detail' element={<Detail />} />
          <Route path='*' element={<Navigate replace to='/' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
