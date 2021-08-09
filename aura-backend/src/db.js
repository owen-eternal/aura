const Pool = require('pg').Pool;

// establish a database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'aura',
    password: 'postgres',
    port: 5432,
  })
    
module.exports = pool