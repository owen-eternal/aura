const os = require('os')

const env = process.env.NODE_ENV
const address = os.networkInterfaces().lo[0].address

const development = {

    app:{
        address: address,
        port: 8000
    },

    db:{
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    },

    keys:{
        secret: process.env.SECRET_KEY
    }
}

const production = {

    app:{
        address: address,
        port: process.env.PORT
    },

    db: {
        connectionString: process.env.DATABASE_URL,
    },

    secrets:{
        secret_key: process.env.SECRET_KEY
    }
}

const config = {
    development,
    production
}

module.exports = config[env]