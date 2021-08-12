const Pool = require('pg').Pool;

// establish a database connection

const pool = new Pool({connectionString: process.env.DATABASE_URL})
    
module.exports = pool