import express from 'express'
import * as doctenv from 'dotenv'
import path from 'path'
import userRoute from './src/routes/user.routes.js'
import blogRoute from './src/routes/blog.routes.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { checkForAuthenticationCookie } from './src/middlewares/authenticaton.middlewares.js'
import Blog from './src/models/blog.models.js'

doctenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI

//connect with MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected Successfully!!"))
    .catch(error => console.error(error.message))

//Setting view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"))

//Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))


//Routes
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.status(200).render("home.views.ejs", {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/api/users", userRoute);    //http routes - /api/user/signup or /api/user/signin etc

app.use("/api/blogs", blogRoute)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
