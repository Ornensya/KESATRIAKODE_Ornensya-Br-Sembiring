const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_ecommerce',
    password: 'ornen123',
    port: 5432, // Port default PostgreSQL
});

module.exports = client;