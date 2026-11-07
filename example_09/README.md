# Static HTML page
Respond with an HTML file instead of JSON

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

### Create the public folder

Create a folder named `public` and put two files in it: `index.html` and `about.html`. Express will send these files to the browser exactly as they are written.

```
example_09/
  server.js
  public/
    index.html
    about.html
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

You should see the page from `public/index.html`. Then try

```
http://localhost:3000/about.html
http://localhost:3000/about-us
```

### Check the Content-Type

In a second terminal:

```
curl -i http://localhost:3000/
```

The `Content-Type` is `text/html`, not `application/json` like in example_05.

### Shutdown server

```
CTRL + C
```

# Exercise

1. Edit `public/index.html` and refresh the browser. Do you need to restart the server? Why not (compare with a change in `server.js`)?
2. `/about.html` and `/about-us` show the same page, but only one has a route in `server.js`. Which one, and what does `express.static` do for the other?
3. Visit `http://localhost:3000/server.js`. Why can't you download it? What would happen if you served the project root instead of `public`?
4. Add a `public/style.css` file, link it in `index.html` with `<link rel="stylesheet" href="/style.css">` and change the heading colour. Check the Content-Type of `/style.css` with `curl -i`.
5. Add `res.send('<h1>Hello</h1>')` in a new `GET /inline` route. How is this different from `sendFile`, and why is a separate `.html` file easier to maintain?
