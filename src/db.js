const Pool = require('pg').Pool;
const config = require('./config')

// establish a database connection
const pool = new Pool(config.db)

module.exports = pool