const express = require('express');
const app = express();
const PORT = 3000;

// A string that contains HTML is sent as text/html by res.send()
app.get('/', (req, res) => {
    console.log('we are at: GET /')
    res.send('<h1>Hello from an HTML string</h1><p>This HTML is written inside server.js</p>');
});

// A template literal (backticks) lets us put JavaScript values inside the HTML
app.get('/time', (req, res) => {
    console.log('we are at: GET /time')
    const now = new Date().toLocaleTimeString();
    res.send(`<h1>Server time</h1><p>The time is <b>${now}</b>. Refresh to see it change.</p>`);
});

// Build HTML from data: one <li> for every item in the array
app.get('/users', (req, res) => {
    console.log('we are at: GET /users')
    const users = [
        { id: 1, name: 'Alice', age: 20 },
        { id: 2, name: 'Bob', age: 25 }
    ];
    const items = users.map((u) => `<li>${u.name} (${u.age})</li>`).join('');
    res.send(`<h1>Users</h1><ul>${items}</ul>`);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
