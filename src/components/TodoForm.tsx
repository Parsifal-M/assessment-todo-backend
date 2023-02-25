import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axios.post('/todos', { title, completed });
    navigate('/');
  };

  return (
    <div>
      <h1>Add a new to-do item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
