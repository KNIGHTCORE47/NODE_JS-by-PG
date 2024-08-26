import express from 'express'
import path from 'path'
import dotenv from 'dotenv';
import multer from 'multer'

dotenv.config();

const app = express()
const PORT = process.env.PORT

//Storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        return cb(null, uniqueSuffix)
    }
})

//Set view engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./src/views/"))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const upload = multer({ storage })


//Routes
app.get("/", async (req, res) => {
    return res.render("home.views.ejs")
})

app.post("/upload", upload.array("profilePicture", 1), (req, res) => {
    console.log(req.body)
    console.log(req.files)

    return res.status(200).redirect("/")

})

//Port
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))