const express = require('express');
const app = express();
const PORT = 3000;

// Send a JSON object with res.json()
app.get('/', (req, res) => {
    console.log('we are at: get')
    res.json({ message: 'Hello, Express server is running!' });
});

// Send a JSON object with a few different value types
app.get('/user', (req, res) => {
    console.log('we are at: user')
    res.json({
        id: 1,
        name: 'Alice',
        isStudent: true,
        courses: ['Math', 'Physics']
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
