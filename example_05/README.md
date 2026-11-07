# JSON response
Send a simple JSON response with a GET request

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

You should see:

```
{"message":"Hello, Express server is running!"}
```

Then go to

```
http://localhost:3000/user
```

### Check the response with curl

```
curl -i http://localhost:3000/user
```

Look for the header `Content-Type: application/json`. `res.json()` sets it for you, while `res.send('text')` sends `text/html`.

### Shutdown server

```
CTRL + C
```

# Exercise

1. Open DevTools (F12) > Network, refresh `/user` and find the `Content-Type` header. How is it different from `/` in example_03?
2. Add a new route `/products` that returns an array of three product objects. What does the browser show?
3. Replace `res.json(...)` with `res.send(...)` in `/user` using the same object. Does the output change? Does the `Content-Type` change?
4. Make a JSON route return a status code of 404 together with `{ error: 'Not found' }` (hint: `res.status(404).json(...)`).
