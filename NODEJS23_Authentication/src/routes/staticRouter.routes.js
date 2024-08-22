import express from 'express'
import URL from '../models/url.models.js'

const router = express.Router();

//routes - render pages
router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login")
    const allURLs = await URL.find({ createdBy: req.user._id })
    return res.render("home.views.ejs", {
        urls: allURLs
    })
})

router.get("/signup", async (req, res) => {
    return res.status(201).render("signup.views.ejs")
})

router.get("/login", async (req, res) => {
    return res.status(200).render("login.views.ejs")
})


export default router
