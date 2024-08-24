import express from 'express'
import { connectMongoDB } from './connection.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { restrictToLoggedInUsersOnly, checkAuth } from './src/middlewares/auth.middlewares.js'


import urlRoutes from './src/routes/url.routes.js'
import staticRoutes from './src/routes/staticRouter.routes.js'
import authRoutes from './src/routes/auth.routes.js'


const app = express();
const PORT = 8001;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/nodejs21_custom_url_shortener_project02")
    .then(() => console.log("MongoDB connected successfully!!"))
    .catch(error => {
        throw error;
    })

//Set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views"))

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//Routes
// app.use("/api/url", urlRoutes)
app.use("/api/url", restrictToLoggedInUsersOnly, urlRoutes)

// app.get("/api/url", async (req, res) => {
//     const allURLs = await URL.find({})
//     return res.render("shortIds.views.ejs", {
//         urls: allURLs
//     })
// })


// app.use("/", staticRoutes)
app.use("/", checkAuth, staticRoutes)
app.use("/", authRoutes)





app.listen(PORT, () => console.log(`http://localhost:${PORT}`))