const pool = require('../db');
const user = require('express').Router();
const { loadUser, checkAlertExists } = require('../middleware/verifications');
const { loginRequired, userRole , allowedToDelete } = require('../middleware/permissions');

user.use(loadUser, loginRequired)

//create an alert
user.post('/create-alert', userRole('basic'), async (request, response) =>{

    try{

        const userId = parseInt(request.user.id)

        const { geolocation, status } = request.body

        const query = 'INSERT INTO service_alert (geolocation, stat, user_id) VALUES ($1, $2, $3) RETURNING *'

        const alert = await pool.query(query, [geolocation, status, userId])

        return response.status(201).json(
            {
                message : "alert lodged on your behalf",
                alert_details: alert.rows[0]
        })

    }catch(error){console.log(error)}
})

//delete an alert
user.delete('/cancel-alert/:id', userRole('basic'), checkAlertExists, allowedToDelete, async (request, response) =>{
    try{

        alertId = parseInt(request.alert.id)

        console.log(alertId)

        await pool.query("DELETE FROM service_alert WHERE id = $1", [alertId]);

        return response.status(200).send('Your alert has been cancelled');

    }
    catch(err){
        
        console.error()
    }
})

module.exports = user