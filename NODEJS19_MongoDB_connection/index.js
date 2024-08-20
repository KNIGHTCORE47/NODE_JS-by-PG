import express from 'express'
import mongoose from 'mongoose'

const app = express();
const PORT = 8000;


//Middleweres
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

//Connection
mongoose.connect("mongodb://127.0.0.1:27017/test-app-01")
    .then(() => console.log("MongoDB Connected successfully!!"))
    .catch((error) => {
        throw error
    })

//Schema
const userSchema = new mongoose.Schema(
    {
        firsName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
    }, { timestamps: true }
)

//Model
const User = mongoose.model("user", userSchema)

//Routes
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})  //NOTE - .find({}) denotes all users
    return res.send(
        `
    <ul>
    ${allDbUsers.map(items => `<li>${items.firsName} - ${items.email}</li >`).join("")}
    </ul>
    `
    );
})




app.route("/api/users")
    .get(async (req, res) => {
        const allDbUsers = await User.find({})
        if (!allDbUsers) return res.status(404).json({ message: "Invalid users" })
        return res.status(200).json(allDbUsers)
    })
    .post(async (req, res) => {
        const newUser = req.body
        console.log(newUser);

        if (!(newUser && newUser.first_name && newUser.last_name && newUser.email && newUser.gender && newUser.job_department)) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const result = await User.create({
            firsName: newUser.first_name,
            lastName: newUser.last_name,
            email: newUser.email,
            gender: newUser.gender,
            jobTitle: newUser.job_department,
        })

        console.log("The result: ", result);

        return res.status(201).json({ message: "New user created" })
    })




app.route("/api/users/:id")
    .get(async (req, res) => {
        const userParams = await User.findById(req.params.id)

        if (!userParams) return res.status(404).json({ error: "Invalid user" })

        return res.status(200).json(userParams)

    })
    .patch(async (req, res) => {
        const updatedValue = req.body
        const updatedUserInfo = await User.findByIdAndUpdate(req.params.id, updatedValue)

        if (updatedUserInfo === -1) return res.status(404).json({ error: "Invalid user" })

        return res.status(202).json({ message: "User info updated successfully" })

    })
    .delete(async (req, res) => {
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if (!deletedUser) return res.status(404).json({ error: "Invalid user" })

        return res.status(200).json({ message: "User removed successfully" })

    })


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))