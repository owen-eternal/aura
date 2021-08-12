// entry point into the app.
const create_app = require('./src/init.js')
const config = require('./src/config')

// console.log(process.env.NODE_ENV)

app = create_app()

app.listen(config.app)