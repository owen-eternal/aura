const pool = require('../db');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const auth = require('express').Router();
const { raiseValidatonError, validateInputs, checkEmailExists } = require('../middleware/verifications');


auth.post('/register',  
        validateInputs, 
        raiseValidatonError, 
        checkEmailExists, 
        async (request, response) => {
            // retrieve data from request body
            const { username, email, password, user_role } = request.body;

            try{

                // Hash password.
                const passwordHash = await bcrypt.hash(password, 10);
                
                // reegistering as basic user
                if (!user_role){

                    const query = {
                    
                        text : 'INSERT INTO service_user (username, email, passwrd) VALUES ($1, $2, $3) RETURNING id, username',
                        values : [username, email, passwordHash]
                    } 
                
                    // save the data and return only id and username.
                    await pool.query(query);

                    return response.status(201).send(`You have been registered as basic user, you can now login.`);

                }

                // else register as admin user

                const query = {
                    
                    text : 'INSERT INTO service_user (username, email, passwrd, user_role) VALUES ($1, $2, $3, $4) RETURNING id, username',
                    values : [username, email, passwordHash, user_role]
                }

                await pool.query(query);

                return response.status(201).send(`You have been registered as ${user_role}, you can now login.`);
            
            }
            catch(error){ 

                console.error(error)
            }

        })


auth.post('/login', async (req, res) => {

    // retrieve data from request body
    const { email, password } = req.body;

    try{

        // define the sql query.
        const queryString = 'SELECT id, username, email, passwrd FROM service_user WHERE email = $1';
        
        // receive Object from backend
        const queryObject = await pool.query(queryString, [email]);
        
        // define a user object
        const user = queryObject.rows[0];

        // compare client password vs database password
        const isMatch = await bcrypt.compare(password, user.passwrd);

        // check if theres a match or not
        if (!isMatch) return res.status(403).send('incorrect credentials');

        // define payload object
        const payload = {
            id : user.id,
            username : user.username
        };
        
        // create untimed token
        const token = await JWT.sign(payload, process.env.SECRET_KEY);

        // send token to frontend
        return res.status(200).json({access_token : token});

    // throw error
    }
    catch(error){

        // res.status(403).send('incorrect credentials')
        
        console.error(error);
    }
});

module.exports = auth
