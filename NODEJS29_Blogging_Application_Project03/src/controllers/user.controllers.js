import User from '../models/user.models.js'

async function handleUserSignup(req, res) {
    try {
        const { fullName, email, password } = req.body;

        // Input validation
        if (!(fullName & email & password)) return res.status(400).json({ error: "Please fill in all fields" })

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
        const isMatched = await User.matchedPassword(email, password)

        return res.status(200).redirect("/")

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error matching user email or password" })
        // return res.status(500).redirect("/api/users/signin")
    }
}

export {
    handleUserSignup,
    handleUserSignin
}




