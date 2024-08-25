import { getUser } from '../services/auth.services.js'

//Refractor the middleware here - core logic
function checkForAuthentication(req, res, next) {
    console.log(req.cookies);

    const tokenInCookie = req.cookies?.uid
    req.user = null;
    if (!tokenInCookie) return next()

    const user = getUser(tokenInCookie)
    req.user = user;
    return next();
}

function restrictTo(roles = []) {    //NOTE - typeof(role) => array
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login")

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}

export {
    checkForAuthentication,
    restrictTo
} 