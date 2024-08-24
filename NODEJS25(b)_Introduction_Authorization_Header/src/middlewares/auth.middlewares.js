import { getUser } from '../services/auth.services.js'

async function restrictToLoggedInUsersOnly(req, res, next) {
    // const userUid = req.cookies?.uid //Cookie method
    const userUid = req.headers["authorization"]
    console.log(userUid);


    if (!userUid) return res.redirect("/login")

    // const token = userUid // "Bearer 12s3dgfrsg152"
    // const token = userUid.split("Bearer ") // ["", "12s3dgfrsg152"]
    const token = userUid.split("Bearer ")[1] // ["12s3dgfrsg152"]

    const user = getUser(token)

    if (!user) return res.redirect("/login")

    // req.user = user;
    next();
}


async function checkAuth(req, res, next) {
    console.log(req.headers);

    const userUid = req.headers["authorization"]
    console.log(userUid);

    const token = userUid.split("Bearer ")[1]

    const user = getUser(token)

    req.user = user;
    next();
}

export {
    restrictToLoggedInUsersOnly,
    checkAuth
} 