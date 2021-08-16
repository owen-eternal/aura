// checks if user has been logged in.
function loginRequired(request, response, next ){

    if(request.user == null){

        return response.status(401).send("Unauthorized user. You need to sign in.")
    }

    next()
}

//check which role the user play
function userRole(role){

    return (request, response, next) => {
    
        userRole = request.user.user_role

        if (userRole !== role){

            return response.status(403).send("Access denied.")
        }

        next()
    }
}

function allowedToDelete(request, response, next) {
    //person currently loggedin
    const userId = parseInt(request.user.id)

    //person who created the alert
    const userAlertId = parseInt(request.alert.user_id)

    //check to see of they are the same person
    if (userId !== userAlertId){

        return response.status(403).send("Access denied.")
    }

    next()
}

module.exports = { 
    loginRequired, 
    userRole,
    allowedToDelete
}