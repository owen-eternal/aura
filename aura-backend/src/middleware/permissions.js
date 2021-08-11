// checks if user has been logged in.
function loginRequired(request, response, next ){

    if(request.user == null){

        return request.status(403).send("You need to sign in first")
    }

    next()
}

//check which role the user play
function userRole(role){

    return (request, response, next) => {

        if (request.user.role !== role){

            return response.status(401).send("You cannot access this page")
        }

        next()
    }
}

module.exports = { 
    loginRequired, 
    userRole 
}