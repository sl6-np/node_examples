// Load the values in the .env file into process.env
require('dotenv').config();

const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = 3000;

// Database settings come from the .env file, never hard-code credentials
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,                // needed for Azure SQL
        trustServerCertificate: true  // fine for local development only
    }
};

// A connection pool is created once and shared by all requests
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to MS SQL');
        return pool;
    })
    .catch((err) => {
        console.log('Database connection failed:', err.message);
    });

// GET - check that the database answers
app.get('/', async (req, res) => {
    console.log('we are at: GET /')
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT GETDATE() AS now');
        res.json(result.recordset[0]);
    } catch (err) {
        console.log('Query failed:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET - read all rows from the Users table
app.get('/users', async (req, res) => {
    console.log('we are at: GET /users')
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT id, name, age FROM Users');
        res.json(result.recordset);
    } catch (err) {
        console.log('Query failed:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
