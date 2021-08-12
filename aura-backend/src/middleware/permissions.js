// checks if user has been logged in.
function loginRequired(request, response, next ){

    if(request.user == null){

        return response.status(403).send("You need to sign in first")
    }

    next()
}

//check which role the user play
function userRole(role){

    return (request, response, next) => {
    
        userRole = request.user.user_role

        if (userRole !== role){

            return response.status(401).send("You cannot access this page")
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

        return response.status(401).send("You do not have permission to access this page")
    }

    next()
}

module.exports = { 
    loginRequired, 
    userRole,
    allowedToDelete
}