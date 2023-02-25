import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await axios.get('/todos');
      setTodos(response.data);
    }

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add a new to-do item</Link>
    </div>
  );
};
