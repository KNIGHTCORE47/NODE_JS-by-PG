import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverImageUrl: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }, { timestamps: true }
)

const Blog = mongoose.model("blog", blogSchema)

export default Blog;