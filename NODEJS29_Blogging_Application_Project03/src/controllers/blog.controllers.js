import multer from 'multer'
import path from 'path'
import Blog from '../models/blog.models.js'
import Comment from '../models/comment.models.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const UPLOAD = multer({ storage })

async function handleAddBlog(req, res) {
    try {
        const { title, body } = req.body

        if (!title || !body) return res.status(400).json({ error: "Invalid tittle or body" })

        const blog = await Blog.create(
            {
                title,
                body,
                coverImageUrl: `/uploads/${req.file.filename}`,
                createdBy: req.user._id
            }
        )
        return res.redirect(`/api/blogs/${blog._id}`)

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleAndShowEachBlog(req, res) {
    try {
        const eachBlog = await Blog.findById(req.params.id).populate("createdBy")

        const comments = await Comment.find({ blogId: req.params.id }).populate("author")

        if (!eachBlog) return res.status(404).json({ error: "Blog not found" })

        if (!comments) return res.status(404).json({ error: "Comments not found" })

        console.log("comments", comments);


        return res.status(200).render("blog.views.ejs", {
            user: req.user,
            blog: eachBlog,
            comments
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUserComments(req, res) {
    try {
        const { content } = req.body;
        const { blogId } = req.params;

        if (!content) {
            return res.status(400).json({ error: 'Comment content is required' });
        }

        const comment = await Comment.create(
            {
                content,
                author: req.user._id,
                blogId
            }
        );

        if (!comment) return res.status(500).json({ error: 'Internal Server Error' })

        return res.status(201).redirect(`/api/blogs/${req.params.blogId}`)


    } catch (error) {
        console.error('Error in handleUserComments:', error);
        return res.status(500).json({ error: 'Failed to create comment' });
    }
}

export {
    handleAddBlog,
    handleAndShowEachBlog,
    handleUserComments,
    UPLOAD
}