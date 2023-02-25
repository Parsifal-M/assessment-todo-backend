import { Pool } from 'pg';

const pool = new Pool({
  user: 'pg-user',
  host: 'localhost',
  database: 'todo',
  password: 'password',
  port: 5432,
});


async function createTodosTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN NOT NULL
      )
    `);
    console.log('todos table created successfully');
  } catch (err) {
    console.error('Error creating todos table', err);
  } finally {
    client.release();
  }
}

createTodosTable();

export { pool };