import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        blogId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blog',
            required: true
        },
    }, { timestamps: true }
)

const Comment = mongoose.model("comment", commentSchema)

export default Comment;