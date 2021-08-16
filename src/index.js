require('dotenv').config()
const cors = require('cors')
const Express = require('express')
const auth = require('./auth/authRoute')
const user = require('./user/userRoute')
const admin = require('./admin/adminRoute')
const YAML = require('yamljs')
const swaggerJsDocs = YAML.load('src/swagger.yaml')
const swaggerUi = require('swagger-ui-express')

//creating an instance of our application
//application factory pattern
function create_app(){
   
    const app = Express()

    //inititiate application level middleware.
    app.use(cors());
    app.use(Express.json());
    app.use('/api-docs', 
            swaggerUi.serve, 
            swaggerUi.setup(swaggerJsDocs))
   
    //register routes
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/user', user)
    app.use('/api/v1/admin', admin)

    return app
}

module.exports = create_app;