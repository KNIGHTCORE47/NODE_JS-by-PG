import { validateToken } from '../services/auth.services.js'

function checkForAuthenticationCookie(cookieName) {
    return function (req, res, next) {
        const tokenCookieValue = req.cookies[cookieName]
        if (!tokenCookieValue) return next();

        try {
            const userPayload = validateToken(tokenCookieValue)

            req.user = userPayload;

        } catch (error) { }

        return next()
    }
}

export {
    checkForAuthenticationCookie
}