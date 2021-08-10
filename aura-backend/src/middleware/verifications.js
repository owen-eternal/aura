const { check, validationResult } = require("express-validator");

//validate inputs
const validateInputs = [
    check('email', 'Invalid email address format')
        .isEmail(), 
    check('password', 'Password must be greater than 6 characters')
        .isLength({min:6}),
];

//if there are errors after 
//validation, raise an error
function raiseValidatonError(req, res, next){
    const err = validationResult(req)
    if(!err.isEmpty()){
        return res.status(400).json({errors : err.array()})
    }
    next()
};

module.exports = {
    validateInputs, 
    raiseValidatonError, 
};