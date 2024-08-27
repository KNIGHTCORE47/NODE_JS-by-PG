import express from 'express'
import * as doctenv from 'dotenv'
import path from 'path'
import userRoute from './src/routes/user.routes.js'
import mongoose from 'mongoose'


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

//Routes
app.get("/", (req, res) => {
    return res.status(200).render("home.views.ejs")
})

app.use("/api/users", userRoute);    //http routes - /api/user/signup or /api/user/signin etc


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
