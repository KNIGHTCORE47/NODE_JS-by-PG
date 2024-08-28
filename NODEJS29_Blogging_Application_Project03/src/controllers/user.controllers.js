import User from '../models/user.models.js'
import dotenv from 'dotenv'

dotenv.config();

const maxAge = process.env.JWT_TOKEN_EXPIRY_TIME

async function handleUserSignup(req, res) {
    try {
        const { fullName, email, password } = req.body;

        // Input validation
        if (!fullName || !email || !password) return res.status(400).json({ error: "Please fill in all fields" })

        //Create user - MONGODB
        await User.create(
            {
                fullName,
                email,
                password
            }
        )
        return res.status(200).redirect("/")

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error creating user" })
    }
}

async function handleUserSignin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ error: "Invalid email or password" })

        //Matching user - email and password
        const token = await User.matchPasswordAndGenerateToken(email, password)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge
        })

        return res.status(200).redirect("/")

    } catch (error) {
        console.error(error);
        return res.status(500).render("signin.views.ejs", {
            error: "Incorrect user email or password"
        })
    }
}

function handleUserLogout(req, res) {
    try {
        res.clearCookie("token")
        return res.status(200).redirect("/")
    } catch (error) {
        console.log(error);

    }
}

export {
    handleUserSignup,
    handleUserSignin,
    handleUserLogout
}




