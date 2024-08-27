import express from 'express'
import { handleUserSignup, handleUserSignin } from '../controllers/user.controllers.js'

const router = express.Router();

router.get("/signup", (req, res) => {
    return res.status(200).render("signup.views.ejs")
})

router.get("/signin", (req, res) => {
    return res.status(200).render("signin.views.ejs")
})

router.post("/signup", handleUserSignup)

router.post("/signin", handleUserSignin)

export default router
