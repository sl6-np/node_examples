const express = require('express');
const app = express();
const PORT = 3000;

// Let Express read a JSON request body into req.body
app.use(express.json());

// Our "database": one JSON object kept in memory (it resets when the server restarts)
let user = { id: 1, name: 'Alice', age: 20 };

// GET - read the object
app.get('/user', (req, res) => {
    console.log('we are at: GET /user')
    if (!user) {
        return res.status(404).json({ error: 'No user exists' });
    }
    res.json(user);
});

// POST - create the object (only if it does not exist yet)
app.post('/user', (req, res) => {
    console.log('we are at: POST /user', req.body)
    if (user) {
        return res.status(409).json({ error: 'User already exists' });
    }
    user = req.body;
    res.status(201).json(user);
});

// PUT - replace the whole object
app.put('/user', (req, res) => {
    console.log('we are at: PUT /user', req.body)
    user = req.body;
    res.json(user);
});

// PATCH - change only the fields that were sent
app.patch('/user', (req, res) => {
    console.log('we are at: PATCH /user', req.body)
    if (!user) {
        return res.status(404).json({ error: 'No user exists' });
    }
    user = { ...user, ...req.body };
    res.json(user);
});

// DELETE - remove the object
app.delete('/user', (req, res) => {
    console.log('we are at: DELETE /user')
    user = null;
    res.sendStatus(204);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
