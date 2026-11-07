# HTTP status codes
Common responses: 200, 404, 502 and more

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

### Open in VS Code
```
code .
```

### Update package.json
```
{
  "name": "example_04",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "devStart": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "express": "^5.3.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

### Run server
```
npm run devStart
```

### Open browser

Visit each route below. Watch the terminal: every route logs `we are at: ...` when it is accessed.

| Route | Status | Meaning |
|-------|--------|---------|
| http://localhost:3000/ok | 200 OK | The request succeeded |
| `POST /items` | 201 Created | A new resource was created |
| http://localhost:3000/no-content | 204 No Content | Success, nothing to send back |
| http://localhost:3000/old-page | 301 Moved Permanently | Redirects to `/ok` |
| http://localhost:3000/bad-request | 400 Bad Request | The client sent something invalid |
| http://localhost:3000/unauthorized | 401 Unauthorized | The client has not logged in |
| http://localhost:3000/forbidden | 403 Forbidden | The client is not allowed |
| http://localhost:3000/error | 500 Internal Server Error | The server made a mistake |
| http://localhost:3000/bad-gateway | 502 Bad Gateway | Our server called another server and it failed |
| http://localhost:3000/unavailable | 503 Service Unavailable | Temporarily unable to respond |
| http://localhost:3000/anything-else | 404 Not Found | No route matched |

### See the status code
In the browser: open DevTools (`F12`), go to the **Network** tab, refresh the page and look at the **Status** column.

Or use curl (`-i` shows the status line):
```
curl -i http://localhost:3000/ok
curl -i http://localhost:3000/bad-gateway
curl -i -X POST http://localhost:3000/items
```

### Shutdown server

```
CTRL + C
```

# Exercise
Visit `/ok` in the browser. Then visit a route that does not exist. What status code do you see? Which log line appears in the terminal?

Visit `/old-page`. What URL are you on afterwards? Why did the browser change it?

Visit `/bad-gateway`. What extra line is logged in the terminal? Why is this a 502 and not a 500?

Visit `/items` in the browser. What do you see? Why? (Hint: browsers send GET, but the route expects POST.)

Add a new route that returns `418 I'm a teapot`.
