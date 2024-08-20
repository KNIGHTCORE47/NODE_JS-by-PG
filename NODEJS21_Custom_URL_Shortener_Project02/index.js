import express from 'express'
import urlRoutes from './src/routes/url.routes.js'
import { connectMongoDB } from './connection.js'


const app = express();
const PORT = 8001;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/nodejs21_custom_url_shortener_project02")
    .then(() => console.log("MongoDB connected successfully!!"))
    .catch(error => {
        throw error;
    })

//Middlewares
app.use(express.json())

//Routes
app.use("/api/url", urlRoutes)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))