const { Pool } = require('pg');

// Konfigurasi koneksi database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_ecommerce',
  password: 'ornen123',
  port: 5432, // Port default PostgreSQL
});

module.exports = pool;