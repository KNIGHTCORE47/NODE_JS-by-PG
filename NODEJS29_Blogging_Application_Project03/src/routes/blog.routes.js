import express from 'express'
import {
    handleAddBlog,
    handleAndShowEachBlog,
    handleUserComments,
    UPLOAD
} from '../controllers/blog.controllers.js'


const router = express.Router();

router.get("/add-new", (req, res) => {
    return res.status(200).render("addBlog.views.ejs", {
        user: req.user
    })
})

router.get("/:id", handleAndShowEachBlog)

router.post("/", UPLOAD.single("coverImage"), handleAddBlog)

router.post("/comments/:blogId", handleUserComments)

export default router;