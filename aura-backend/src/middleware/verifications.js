const pool = require("../db");
const JWT = require('jsonwebtoken')
const { check, validationResult, query } = require("express-validator");


//validate inputs
const validateInputs = [
    check('email', 'Invalid email address format')
        .isEmail(), 
    check('password', 'Password must be greater than 6 characters')
        .isLength({min:6}),
];

//if there are errors after 
//validation, raise an error
function raiseValidatonError(request, response, next){
    const err = validationResult(request)
    if(!err.isEmpty()){
        return response.status(400).json({errors : err.array()})
    }
    next()
};

// upon registration check if the email 
// provided is already in the database
async function checkEmailExists(request, response, next){

    // retrieve email
    const email = request.body.email

    // create qyery string
    const query = {
        text : 'SELECT email FROM service_user WHERE email = $1',
        values: [email]
    }

    // fetch data
    const queryObject = await pool.query(query);

    // unpack the array
    const user = queryObject.rows[0]

    // if the user exists send a 403
    if (user) return response.status(403).send('email already registered')
    
    next()
};

//add user into the session.
async function loadUser(request, response, next){

    const autHeader = request.headers.authorization

    if (autHeader){

        const token = autHeader.split(' ')[1]

        try{
            const user = await JWT.verify(token, process.env.SECRET_KEY)

            const queryString = 'SELECT * FROM service_user WHERE id = $1';
        
            request.user = await pool.query(queryString, [parseInt(user.id)]);

        }catch(error){ console.error('invalid signature')}
    } 
    next()
}

module.exports = {
    validateInputs, 
    raiseValidatonError,
    checkEmailExists,
    loadUser
};