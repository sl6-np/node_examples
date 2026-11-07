const express = require('express');
const app = express();
const PORT = 3000;

// 200 OK - the request succeeded
app.get('/ok', (req, res) => {
    console.log('we are at: /ok');
    res.status(200).send('200 OK - everything worked');
});

// 201 Created - a new resource was created (normally returned for POST requests)
app.post('/items', (req, res) => {
    console.log('we are at: POST /items');
    res.status(201).send('201 Created - new item created');
});

// 204 No Content - success, but there is nothing to send back
app.get('/no-content', (req, res) => {
    console.log('we are at: /no-content');
    res.sendStatus(204);
});

// 301 Moved Permanently - the browser is sent to a new location
app.get('/old-page', (req, res) => {
    console.log('we are at: /old-page (redirecting to /ok)');
    res.redirect(301, '/ok');
});

// 400 Bad Request - the client sent something invalid
app.get('/bad-request', (req, res) => {
    console.log('we are at: /bad-request');
    res.status(400).send('400 Bad Request - the request was invalid');
});

// 401 Unauthorized - the client has not logged in
app.get('/unauthorized', (req, res) => {
    console.log('we are at: /unauthorized');
    res.status(401).send('401 Unauthorized - please log in');
});

// 403 Forbidden - the client is known, but not allowed
app.get('/forbidden', (req, res) => {
    console.log('we are at: /forbidden');
    res.status(403).send('403 Forbidden - you are not allowed here');
});

// 500 Internal Server Error - something went wrong in our own code
app.get('/error', (req, res) => {
    console.log('we are at: /error');
    res.status(500).send('500 Internal Server Error - the server made a mistake');
});

// 502 Bad Gateway - our server called another server, and that call failed
app.get('/bad-gateway', async (req, res) => {
    console.log('we are at: /bad-gateway');
    try {
        // Nothing is listening on port 3999, so this request fails
        await fetch('http://localhost:3999/');
        res.send('Upstream replied');
    } catch (err) {
        console.log('upstream call failed:', err.cause ? err.cause.code : err.message);
        res.status(502).send('502 Bad Gateway - the upstream server did not respond');
    }
});

// 503 Service Unavailable - the server is temporarily unable to handle requests
app.get('/unavailable', (req, res) => {
    console.log('we are at: /unavailable');
    res.status(503).send('503 Service Unavailable - try again later');
});

// 404 Not Found - no route matched (must be placed after all other routes)
app.use((req, res) => {
    console.log(`we are at: 404 (no route for ${req.method} ${req.url})`);
    res.status(404).send('404 Not Found - this page does not exist');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
