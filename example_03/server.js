const express = require('express');
const app = express();
const PORT = 3000;

// Define a basic route
app.get('/', (req, res) => {
    console.log('we are at: get')
    res.send('Hello, Express server is running!');
});

app.get('/hello', (req, res) => {
    console.log('we are at: hello')
    res.send('Hello, Express server is running!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});