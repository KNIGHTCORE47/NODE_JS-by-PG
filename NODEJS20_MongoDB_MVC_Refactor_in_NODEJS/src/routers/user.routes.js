import express from 'express'
import {
    handleGetAllUsers,
    handleCreateNewUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById
} from '../controllers/user.controllers.js'

const router = express.Router()

//Routes
router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser)


router.route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

export default router;
