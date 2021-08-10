const { request, response } = require('express');

const panic = require('express').Router();

panic.post('/create-alert', (request, response) =>{
    // must be authenticated and authorised  
    // to created an alert.
    request.status(200).send('panic has been created')
})

panic.delete('/delete-alert/:id', (request, response)=>{
    // must be authenticated and authorised  
    // to created an alert.
    response.status(201).send(`deleting alert ${request.params.id}`)
})

module.exports = panic