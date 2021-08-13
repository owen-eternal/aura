const Pool = require('pg').Pool;
const config = require('./config')

const connectionString = process.env.DATABASE_URL

// establish a database connection
const pool = new Pool({
    user: process.env.USER, 
    host: process.env.HOST, 
    database: process.env.DATABASE, 
    password: process.env.PASSWORD, 
    port: process.env.PORT
})
    
module.exports = pool