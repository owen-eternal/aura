const admin = require('express').Router()
const { loadUser } = require('../middleware/verifications')
const { loginRequired, userRole } = require('../middleware/permissions')
const pool = require('../db')

admin.use(loadUser)

// fetch the list of alerts
admin.get('/fetch-all-alerts', loginRequired, userRole('admin'), async (request, response) =>{
    try{
        const query = 'SELECT * FROM service_alert'

        alerts =  await pool.query(query)
        
        return response.status(200).send(alerts.rows)
    } 
    catch(error){

        console.error(error)
    }
    finally{

        await pool.end()
    }
})

module.exports = admin

