require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}