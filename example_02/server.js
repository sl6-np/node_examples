const express = require('express');
const app = express();
const PORT = 3000;

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, Express server is running!');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});