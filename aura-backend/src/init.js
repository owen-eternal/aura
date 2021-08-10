require('dotenv').config()
const Express = require('express')
const auth = require('./auth/authRoute')
const cors = require('cors')

//creating an instance of our application
//application factory pattern
function create_app(){
   
    const app = Express()

    //inititiate application level middleware.
    app.use(cors())
    app.use(Express.json())


    //register auth route
    app.use('/api/v1/auth', auth)

    return app
}

module.exports = create_app;