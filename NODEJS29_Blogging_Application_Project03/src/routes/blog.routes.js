import express from 'express'
import {
    handleAddBlog,
    UPLOAD
} from '../controllers/blog.controllers.js'


const router = express.Router();

router.get("/add-new", (req, res) => {
    return res.status(200).render("addBlog.views.ejs", {
        user: req.user
    })
})

router.post("/", UPLOAD.single("coverImage"), handleAddBlog)

export default router;