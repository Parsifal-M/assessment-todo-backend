import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './db';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/todos', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM todos');
    const todos = result.rows;
    res.json(todos);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting todos');
  }
});

app.post('/todos', async (req, res) => {
  const { title, completed } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *',
      [title, completed]
    );
    const todo = result.rows[0];
    res.json(todo);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating todo');
  }
});

app.put('/todos/:id', async (req, res) => {
  const { title, completed } = req.body;
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    );
    const todo = result.rows[0];
    res.json(todo);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating todo');
  }
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    const result = await client.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );
    const todo = result.rows[0];
    res.json(todo);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting todo');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
