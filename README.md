# Node.js + Express Examples

A collection of small, self-contained examples that each illustrate one backend concept. Every folder is its own Node.js project using [Express](https://expressjs.com/), with a `README.md` of step-by-step instructions, a working `server.js`, and (where relevant) exercises.

## Contents

| # | Folder | Topic | Key idea | New concepts |
|---|--------|-------|----------|--------------|
| 00 | [example_00](./example_00) | Simple backend server - part 1 | Run an Express server | `npm init`, installing Express, a single `GET /` route, `app.listen` |
| 01 | [example_01](./example_01) | Simple backend server - part 2 | Edit, restart, refresh | Code changes need a server restart to take effect (exercise) |
| 02 | [example_02](./example_02) | Simple backend server - part 3 | Developer efficiency | `nodemon` auto-restart, npm scripts (`npm run devStart`) |
| 03 | [example_03](./example_03) | Logging | Debugging, trace your code | `console.log` to trace requests, multiple routes (`/` and `/hello`) |
| 04 | [example_04](./example_04) | HTTP status codes | Common responses: 200, 404, 502 and more | `res.status()`, redirects, a 404 catch-all, a real 502 from a failed upstream call, per-route logging |
| 05 | [example_05](./example_05) | JSON response | Send JSON from a GET route | `res.json()`, the `application/json` Content-Type, objects and arrays in JSON |
| 06 | [example_06](./example_06) | HTTP methods | Manipulate a JSON object with GET, POST, PUT, PATCH, DELETE | `express.json()`, `req.body`, in-memory data, testing with `curl` |
| 07 | [example_07](./example_07) | MS SQL database | Read rows from SQL Server in a route | `mssql` connection pool, `.env` credentials with `dotenv`, SQL queries in routes |
| 08 | [example_08](./example_08) | Path parameters and query strings | Get one user by id, filter users by name and age | `req.params`, `req.query`, parameterized SQL with `.input()`, 400 and 404 responses |

## Example summaries

### example_00 - Simple backend server (part 1)
Starts the smallest possible Express server on port 3000 with one route that responds with a greeting. Walks through project setup, running the server, viewing it in the browser and shutting it down.

### example_01 - Simple backend server (part 2)
Same server as part 1, with an exercise: change the response, refresh the browser, then restart the server and observe when changes actually appear.

### example_02 - Simple backend server (part 3)
Adds `nodemon` as a dev dependency and a `devStart` npm script so the server restarts automatically on every file save.

### example_03 - Logging
Adds `console.log` statements and a second route (`/hello`) to show how to trace which handler is running while the server handles requests.

### example_04 - HTTP status codes
One route per common status code (200, 201, 204, 301, 400, 401, 403, 500, 502, 503) plus a catch-all 404. Each route logs when it is accessed. The 502 is produced for real by calling an upstream server that is not running. Shows how to inspect status codes in the browser DevTools and with `curl -i`.

### example_05 - JSON response
Two GET routes that reply with JSON using `res.json()`: `/` returns a simple message and `/user` returns an object with a number, string, boolean and array. Shows how to check the `application/json` Content-Type in the browser and with `curl -i`.

### example_06 - HTTP methods
One `/user` route handled with five methods. GET reads a JSON object kept in memory, POST creates it, PUT replaces it, PATCH changes selected fields and DELETE removes it. Introduces `express.json()` to read the request body and uses `curl` to send non-GET requests.

### example_07 - MS SQL database
Connects to a Microsoft SQL Server database with the `mssql` package. Credentials are placeholders in a `.env` file (copied from `.env.example`) and loaded with `dotenv`. `GET /` checks the connection and `GET /users` returns rows from a `Users` table.

### example_08 - Path parameters and query strings
Builds on example_07. `GET /users/:id` reads the id from the path with `req.params` and returns one user (400 for a bad id, 404 when not found). `GET /users` accepts optional `name` and `minAge` query strings read from `req.query` to filter the list. Includes SQL to insert sample users and uses `.input()` so values never get concatenated into the SQL.

## Running an example

Each example is independent. From the repository root:

```
cd example_XX
npm install
node server.js          # or: npm run devStart (examples that use nodemon)
```

Then open http://localhost:3000/. Stop the server with `CTRL + C`. All examples use port 3000, so run one at a time.

> See each example's own `README.md` for the full walkthrough and exercises.

## Adding a new example

Keep the structure consistent:

1. Create a folder named `example_NN` (next number, zero-padded).
2. Include `server.js`, `package.json` and a `README.md`.
3. In the example's `README.md`: a title, a one-line summary, the commands to run, and an `# Exercise` section.
4. Add a row to the **Contents** table and a short summary above.
