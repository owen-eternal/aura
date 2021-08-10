require('dotenv').config()
const cors = require('cors')
const Express = require('express')
const auth = require('./auth/authRoute')
const alert = require('./panic/panicRoute')

//creating an instance of our application
//application factory pattern
function create_app(){
   
    const app = Express()

    //inititiate application level middleware.
    app.use(cors())
    app.use(Express.json())


    //register auth route
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/alert', alert)

    return app
}

module.exports = create_app;