import Auth from '../models/auth.models.js'

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


    const token = setUser(loggedInUser)

    // res.cookie("uid", token) //Cookie method
    // return res.status(200).redirect("/")

    res.header('Authorization', `Bearer ${token}`);    //Authorization header method - Bearer token
    return res.status(200).json({ token })


}

export {
    handleUserSignup,
    handleUserLogin
}
