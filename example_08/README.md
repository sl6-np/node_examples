# Path parameters and query strings
Get one user with a path parameter (`/users/2`) and filter users with a query string (`/users?name=al`)

## Before you start

You need a running MS SQL Server (local, Docker or Azure SQL) and a database. This example reuses the `Users` table from example_07. If you do not have it yet, run this in your SQL client:

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name NVARCHAR(50),
    age INT
);
```

Then add some users to search through. Run this to start from a clean, known set of rows:

```sql
DELETE FROM Users;

INSERT INTO Users (id, name, age) VALUES
    (1, 'Alice', 20),
    (2, 'Bob', 25),
    (3, 'Charlie', 31),
    (4, 'Diana', 22),
    (5, 'Alan', 40),
    (6, 'Eve', 19);
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

The terminal should print `Connected to MS SQL`.

### Open browser

Go to

```
http://localhost:3000/
```

## Path parameter: one user

A path parameter is part of the URL path. `:id` in the route is a placeholder and Express puts the real value in `req.params.id`.

```js
app.get('/users/:id', ...)   // /users/2  ->  req.params.id === '2'
```

Try

```
http://localhost:3000/users/1
http://localhost:3000/users/3
http://localhost:3000/users/99
http://localhost:3000/users/abc
```

Expected: users 1 and 3 are returned, `99` gives a `404 User not found`, `abc` gives a `400`.

> `req.params.id` is always a string, so the server converts it with `Number()` before using it.

## Query string: filter users

A query string comes after `?` in the URL, as `key=value` pairs joined by `&`. Express puts them in `req.query`.

```js
app.get('/users', ...)   // /users?name=al&minAge=21  ->  req.query === { name: 'al', minAge: '21' }
```

Try

```
http://localhost:3000/users
http://localhost:3000/users?name=al
http://localhost:3000/users?minAge=25
http://localhost:3000/users?name=a&minAge=25
http://localhost:3000/users?minAge=abc
```

Expected with the sample data:

| URL | Result |
|-----|--------|
| `/users?name=al` | Alice, Alan |
| `/users?minAge=25` | Bob, Charlie, Alan |
| `/users?name=a&minAge=25` | Charlie, Alan |
| `/users?minAge=abc` | `400` error |

### Shutdown server

```
CTRL + C
```

# Exercise

1. Look at the terminal log for `/users/2` and `/users?name=al`. What do `req.params` and `req.query` contain? What type are the values?
2. When should you use a path parameter and when a query string? Hint: which one identifies one specific thing, and which one filters or sorts a list?
3. Request `/users/1abc` and `/users/1.5`. Why does each one return a 400?
4. Add a `maxAge` query option so `/users?minAge=20&maxAge=30` returns only users aged 20 to 30.
5. In the `name` filter, replace `.input('name', ...)` with string concatenation. Why would `/users?name=x' OR '1'='1` now be dangerous? (Put the code back afterwards.)
