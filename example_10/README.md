# HTML string response
Respond with HTML written as a string in `server.js`

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
http://localhost:3000/
```

Then try

```
http://localhost:3000/time
http://localhost:3000/users
```

### Check the Content-Type

In a second terminal:

```
curl -i http://localhost:3000/
```

`res.send()` sees a string and sets `Content-Type: text/html` for you. Compare with example_09 (HTML read from a file) and example_05 (JSON).

### Shutdown server

```
CTRL + C
```

# Exercise

1. Refresh `/time` a few times. Does the page change? Why does a static `.html` file (example_09) not do this?
2. Add a third user to the `users` array in `server.js`. Does `/users` show them? Do you need to restart the server?
3. Change `'<h1>Hello ...'` to plain text without any tags. Does the browser still show it? What does `curl -i` show for the Content-Type now?
4. Send `res.send({ message: 'hi' })` from a new route. What is the Content-Type this time, and why is it different from a string?
5. Add a `GET /greet` route that reads `req.query.name` and replies with `<h1>Hello NAME</h1>`. Try `/greet?name=<b>Bob</b>`. What happens, and why is putting user input straight into HTML dangerous (XSS)?
6. Which is easier to maintain for a big page: an HTML string in `server.js` or a separate file? Why?
