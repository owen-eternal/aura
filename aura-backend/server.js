// entry point into the app.
const create_app = require('./src/init.js')

app = create_app()

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`listening at port: http://localhost:${PORT}/`)
})