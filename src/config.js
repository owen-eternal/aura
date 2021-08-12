const env = process.env.NODE_ENV

const dev = {

    app:{
        port: 3000
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

const prod = {

    app:{
        port: process.env.PORT
    },

    db: {
        connectionString: process.env.DATABASE_URL
    },

    secrets:{
        secret_key: process.env.SECRET_KEY
    }
}

const config = {
    dev,
}

module.exports = config[env]