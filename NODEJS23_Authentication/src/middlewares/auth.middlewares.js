import { getUser } from '../services/auth.services.js'

async function restrictToLoggedInUsersOnly(req, res, next) {
    const userUid = req.cookies?.uid
    // console.log(userUid);


    if (!userUid) return res.redirect("/login")

    const user = getUser(userUid)

    if (!user) return res.redirect("/login")

    req.user = user;
    next();
}


async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid
    // console.log(userUid);

    const user = getUser(userUid)

    req.user = user;
    next();
}

export {
    restrictToLoggedInUsersOnly,
    checkAuth
} 