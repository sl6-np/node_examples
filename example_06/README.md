# HTTP methods
GET, POST, PUT, PATCH and DELETE on a simple JSON object

## Run the following commands

### Initialize npm
```
npm init -y
```

### Install express
```
npm install express
npm install --save-dev nodemon
```

### Add the devStart script

In `package.json`, add this under `scripts`:

```
"devStart": "nodemon server.js"
```

### Open in VS Code
```
code .
```

### Run server
```
npm run devStart
```

### Open browser

Go to

```
http://localhost:3000/user
```

The browser can only send GET requests from the address bar. For the other methods, open a second terminal and use `curl`.

> The commands below work in Command Prompt (cmd). In Windows PowerShell, write `curl.exe --%` instead of `curl`, otherwise the quotes in the JSON are lost. For example: `curl.exe --% -i -X PATCH -H "Content-Type: application/json" -d "{\"age\":30}" http://localhost:3000/user`

### Try each method

| Method | What it does | Status |
|--------|--------------|--------|
| GET | Read the object | 200 (404 if deleted) |
| POST | Create the object | 201 (409 if it already exists) |
| PUT | Replace the whole object | 200 |
| PATCH | Change only the fields you send | 200 |
| DELETE | Remove the object | 204 |

Read:

```
curl -i http://localhost:3000/user
```

Replace the whole object (PUT):

```
curl -i -X PUT -H "Content-Type: application/json" -d "{\"id\":1,\"name\":\"Bob\"}" http://localhost:3000/user
```

Change one field (PATCH):

```
curl -i -X PATCH -H "Content-Type: application/json" -d "{\"age\":30}" http://localhost:3000/user
```

Delete (DELETE):

```
curl -i -X DELETE http://localhost:3000/user
```

Create again (POST):

```
curl -i -X POST -H "Content-Type: application/json" -d "{\"id\":2,\"name\":\"Carol\",\"age\":25}" http://localhost:3000/user
```

The object lives in memory, so restarting the server resets it to Alice.

### Shutdown server

```
CTRL + C
```

# Exercise

1. Run the PUT example, then GET. Which fields are left? Now run the PATCH example. What is the difference between PUT and PATCH?
2. DELETE the user, then GET it. What status code do you get? Then POST twice in a row. What happens the second time?
3. Remove `app.use(express.json());` and send a PATCH request. What is `req.body` in the server log, and why?
4. Add a `GET /user/name` route that returns only `{ "name": "..." }`.
