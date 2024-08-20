import express from 'express'
import { connectMongoDB } from './connection.js'
import userRouter from './src/routers/user.routes.js'
import { logRequestResponse } from './src/middlewares/user.middlewares.js'

const app = express();
const PORT = 8000;


//Middleweres
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.use(logRequestResponse("logFile.txt"))

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/test-app-01")
    .then(() => console.log("MongoDB Connected successfully!!"))
    .catch((error) => {
        throw error
    })


//Routes
app.use("/api/users", userRouter)



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))