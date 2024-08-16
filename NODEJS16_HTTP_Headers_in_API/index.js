import express from 'express'
import users from './MOCK_DATA.json' assert { type: 'json' }
import fs from 'fs'

const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({ extended: false }))    //NOTE - inbuilt native middleware
app.use(express.json({ extended: false }))    //NOTE - inbuilt native middleware


//Rotes
app.get("/api/users", (req, res) => {
    //Headers
    res.setHeader("X-myName", "AAM")    //set custom headers
    return res.json(users);
})


app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`))
