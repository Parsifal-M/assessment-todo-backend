# Backend-Todo-App
This is a simple Todo app created for the purpose of the Cockpit Assessment. The app uses Node.js and Express for the backend, and Postgres as the database. Sequelize is used as the ORM.

# Installation and Setup

* Clone the repository
* Install dependencies by running yarn
* Create a new PostgreSQL database and update the database URI in src/database.ts to point to your database.
* Run the app with yarn start.

# Endpoints

`GET /api/todos`
Returns a list of all todos in the database.

```bash
curl http://localhost:4000/api/todos
```

`POST /api/todos`
Adds a new todo to the database. Expects a JSON body with the following properties: title, description, and status. Returns the newly created todo.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"Buy groceries", "description":"Get milk, bread, and eggs", "status": false}' http://localhost:4000/api/todos
```

`PUT /api/todos/:id`
Updates an existing todo. Expects a JSON body with the following properties: title, description, and status. Returns the updated todo.

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"title":"Buy groceries (updated)", "description":"Get milk, bread, eggs, and cheese", "status": true}' http://localhost:4000/api/todos/1
```

`DELETE /api/todos/:id`
Deletes an existing todo.

```bash
curl -X DELETE http://localhost:4000/api/todos/1
```

## Note
This backend does not use migrations to create the database tables. Instead, the database schema is defined by creating models in Sequelize. As such, there is no need to run `yarn migrate`.