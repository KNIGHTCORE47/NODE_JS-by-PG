import Auth from '../models/auth.models.js'
import { v4 as uuidV4 } from 'uuid'

import { setUser } from '../services/auth.services.js'

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    await Auth.create(
        {
            username,
            email,
            password
        }
    )

    return res.status(200).redirect("/")
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const loggedInUser = await Auth.findOne(
        {
            email,
            password
        }
    )

    if (!loggedInUser) return res.status(400).render("login.views.ejs", {
        error: "Invalid email or password"
    })

    const sessionId = uuidV4()
    setUser(sessionId, loggedInUser)
    res.cookie("uid", sessionId)

    return res.status(200).redirect("/")


}

export {
    handleUserSignup,
    handleUserLogin
}