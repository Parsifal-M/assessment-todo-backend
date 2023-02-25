import express, { Request, Response } from "express";
import { pool } from "./db";

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

// GET /todos - retrieves a list of all to-do items
app.get("/todos", async (req: Request, res: Response) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error("Error getting todos", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// GET /todos/:id - retrieves a single to-do item by ID
app.get("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM todos WHERE id = $1", [
      id,
    ]);
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error getting todo", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// POST /todos - adds a new to-do item
app.post("/todos", async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding todo", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// PUT /todos/:id - updates an existing to-do item by ID
app.put("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, completed } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error updating todo", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// DELETE /todos/:id - deletes a to-do item by ID
app.delete("/todos/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error("Error deleting todo", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
