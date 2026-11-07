const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve every file inside the "public" folder as-is (html, css, images ...)
// A request for / is answered with public/index.html automatically
app.use(express.static(path.join(__dirname, 'public')));

// GET - send one specific html file from a route
app.get('/about-us', (req, res) => {
    console.log('we are at: GET /about-us')
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
