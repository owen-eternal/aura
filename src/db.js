const Pool = require('pg').Pool;
const config = require('./config')

const connectionString = process.env.DATABASE_URL

// establish a database connection
const pool = new Pool({
    connectionString,
})
console.log(connectionString)    
module.exports = pool