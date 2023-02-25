import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [todo, setTodo] = useState<Todo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTodo() {
      const response = await axios.get(`/todos/${id}`);
      setTodo(response.data);
    }

    fetchTodo();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/todos/${id}`);
    navigate('/');
  };

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <Link to="/">Back to list</Link>
      <br />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
