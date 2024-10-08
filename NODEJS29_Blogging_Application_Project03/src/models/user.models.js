import mongoose, { model } from 'mongoose'
import { createHmac, randomBytes } from 'crypto'
import { createTokenForUser } from '../services/auth.services.js'

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String
        },
        password: {
            type: String,
            required: true,
        },
        profileImageURL: {
            type: String,
            default: "/images/avatar.jpg"
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        }
    }, { timestamps: true }
)

//Middleware - Password Hashing
userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex")

    this.salt = salt;
    this.password = hashedPassword

    next();
})


//Mongoose - Virtual function
userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email })

    if (!user) throw new Error("User not found");

    //Already defined using signup form
    const salt = user.salt;
    const hashedPassword = user.password

    //Password matching process
    const userProvidedSigninHashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex")

    if (hashedPassword !== userProvidedSigninHashedPassword) throw new Error("Incorrect password");

    const token = createTokenForUser(user)
    return token;
})

const User = mongoose.model("user", userSchema)

export default User;