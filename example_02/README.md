# Simple backend server - part 3
Develper efficiency

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
  "name": "example_02",
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

Go to

```
http://localhost:3000/
```

### Shutdown server

```
CTRL + C
```

# Exercise
Make a small change in get request to send a different response. Refresh your browser. Did the response change? Why?

Make another change, what happens?