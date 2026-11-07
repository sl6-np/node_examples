# MS SQL database
Connect Express to a Microsoft SQL Server database and read rows with a query

## Before you start

You need a running MS SQL Server (local, Docker or Azure SQL) and a database. Run this in your SQL client to create the table used in this example:

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    age INT
);

INSERT INTO Users (id, name, age) VALUES (1, 'Alice', 20), (2, 'Bob', 25);
```

## Run the following commands

### Initialize npm
```
npm init -y
```

### Install dependencies
```
npm install express mssql dotenv
npm install --save-dev nodemon
```

- `mssql` talks to SQL Server.
- `dotenv` loads the credentials from a `.env` file.

### Add the devStart script

In `package.json`, add this under `scripts`:

```
"devStart": "nodemon server.js"
```

### Create the .env file

Copy the example file:

```
copy .env.example .env
```

Open `.env` and replace the placeholders with your real credentials:

```
DB_SERVER=your-server-name
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password
```

> `.env` holds secrets, so it must never be committed to git. It is already listed in `.gitignore`. Only `.env.example` (with fake values) is shared.

### Open in VS Code
```
code .
```

### Run server
```
npm run devStart
```

The terminal should print `Connected to MS SQL`. If it prints `Database connection failed`, check your `.env` values.

### Open browser

Go to

```
http://localhost:3000/
```

You should see the current database time. Then try

```
http://localhost:3000/users
```

### Shutdown server

```
CTRL + C
```

# Exercise

1. Put a wrong password in `.env` and restart. What does the terminal print? What does `GET /` return, and why is it a 500 and not a crash?
2. Add a new row to the `Users` table in your SQL client, then refresh `/users`. Do you need to restart the server? Why not?
3. Add a `GET /users/:id` route that returns one user. Use `.input('id', sql.Int, req.params.id)` and `WHERE id = @id`. Why is this safer than building the query with string concatenation (SQL injection)?
4. Return a 404 from `GET /users/:id` when the user does not exist.
