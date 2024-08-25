import express from 'express'
import URL from '../models/url.models.js'
import { restrictTo } from '../middlewares/auth.middlewares.js'

const router = express.Router();

//routes - render pages

//USER - ADMIN
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allURLs = await URL.find({})
    return res.render("home.views.ejs", {
        urls: allURLs
    })
})

//USER - EVERYONE
router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
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
