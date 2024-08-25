import mongoose from 'mongoose'

const authSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "NORMAL"
        }
    }, { timestamps: true }
)

const Auth = mongoose.model("auth", authSchema)

export default Auth;