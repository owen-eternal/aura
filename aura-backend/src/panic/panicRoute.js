const alert = require('express').Router();
const { loadUser } = require('../middleware/verifications');
const { loginRequired, userRole } = require('../middleware/permissions');
const pool = require('../db');


alert.use(loadUser, loginRequired)

//user role
alert.post('/create-alert', userRole('basic'), async (request, response) =>{

    try{

        const userId = parseInt(request.user.rows[0].id)

        const { geolocation, status } = request.body

        const query = 'INSERT INTO service_alert (geolocation, stat, user_id) VALUES ($1, $2, $3) RETURNING id, user_id'

        const alert = await pool.query(query, [geolocation, status, userId])

        return response.status(201).json(
            {
                message : "alert lodged on your behalf",
                alert_details: alert.rows[0]
        })

    }catch(error){console.log(error)}
})

alert.delete('/cancel-alert/:id', userRole('basic'), (request, response) =>{
    // must be authenticated and authorised  
    // to created an alert.
})

alert.get('/fetch-all-alerts', userRole('admin'), (request, response) =>{
    // must be authenticated and authorised  
    // to created an alert.
})

module.exports = alert