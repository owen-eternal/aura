// entry point into the app.
const create_app = require('./src/index.js')
const config = require('./src/config')

app = create_app()

app.listen(config.app.port, ()=>{
    console.log(`running a '${process.env.NODE_ENV}' enviromnent`)
    console.log(`running server on http://${config.app.address}:${config.app.port}/`)
})