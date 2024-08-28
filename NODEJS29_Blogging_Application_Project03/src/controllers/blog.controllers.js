import multer from 'multer'
import path from 'path'
import Blog from '../models/blog.models.js'

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
        const blog = await Blog.create(
            {
                title,
                body,
                coverImageUrl: `/uploads/${req.file.filename}`,
                createdBy: req.user._id
            }
        )
        return res.redirect(`/blog/${blog._id}`)

    } catch (error) {
        return console.log(error)
    }
}

export {
    handleAddBlog,
    UPLOAD
}