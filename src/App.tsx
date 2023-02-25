import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoDetail } from './components/TodoDetail';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoForm />} />
        <Route path="/details/:id" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
};
