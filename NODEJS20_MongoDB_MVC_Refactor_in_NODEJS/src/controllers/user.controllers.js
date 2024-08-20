import User from '../models/user.models.js'

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.status(200).json(allDbUsers)
}

async function handleCreateNewUser(req, res) {
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

    return res.status(201).json({ message: "New user created", id: result._id })
}

async function handleGetUserById(req, res) {
    const userParams = await User.findById(req.params.id)

    if (!userParams) return res.status(404).json({ error: "Invalid user" })

    return res.status(200).json(userParams)
}

async function handleUpdateUserById(req, res) {
    const updatedValue = req.body
    const updatedUserInfo = await User.findByIdAndUpdate(req.params.id, updatedValue)

    if (updatedUserInfo === -1) return res.status(404).json({ error: "Invalid user" })

    return res.status(202).json({ message: "User info updated successfully" })
}

async function handleDeleteUserById(req, res) {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) return res.status(404).json({ error: "Invalid user" })

    return res.status(200).json({ message: "User removed successfully" })

}

export {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
}