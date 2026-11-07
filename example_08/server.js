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

// GET - read rows from the Users table
// Optional query string filters: /users?name=al   /users?minAge=21   /users?name=a&minAge=21
app.get('/users', async (req, res) => {
    console.log('we are at: GET /users, query =', req.query)
    try {
        const { name, minAge } = req.query;
        const request = (await poolPromise).request();
        let query = 'SELECT id, name, age FROM Users WHERE 1 = 1';

        if (name) {
            // Values always go in with .input(), never concatenated into the SQL
            request.input('name', sql.NVarChar(50), `%${name}%`);
            query += ' AND name LIKE @name';
        }
        if (minAge) {
            if (isNaN(minAge)) {
                return res.status(400).json({ error: 'minAge must be a number' });
            }
            request.input('minAge', sql.Int, Number(minAge));
            query += ' AND age >= @minAge';
        }

        const result = await request.query(query);
        res.json(result.recordset);
    } catch (err) {
        console.log('Query failed:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET - read one user, the id comes from the path: /users/2
app.get('/users/:id', async (req, res) => {
    console.log('we are at: GET /users/:id, params =', req.params)
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'id must be a whole number' });
    }
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT id, name, age FROM Users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        console.log('Query failed:', err.message);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
