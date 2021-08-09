require('dotenv').config()
const Express = require('express')

//creating an instance of our application
//application factory pattern
function create_app(){
   
    const app = Express()

    //inititiate application level middleware.
    app.use(Express.json())


    //register auth route

    return app
}

module.exports = create_app;