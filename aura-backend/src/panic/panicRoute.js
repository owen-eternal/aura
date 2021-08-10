const { request, response } = require('express');

const alert = require('express').Router();

alert.post('/create', (request, response) =>{
    // must be authenticated and authorised  
    // to created an alert.
    response.status(200).json({payload: request.body})
})

alert.delete('/cancel/:id', (request, response) =>{
    // must be authenticated and authorised  
    // to created an alert.
    response.status(201).send(`Alert ${request.params.id} canceled`)
})

module.exports = alert