import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'

const app = express()
const PORT = process.env.PORT || 8000;
const server = http.createServer(app)
const io = new Server(server)

// Socket.io
io.on('connection', socket => {     //NOTE - socket = client
    console.log('A new user has connected', socket.id);

    //NOTE- from frontend - message received
    socket.on("user-message", (message) => {

        //NOTE - Displaying message on terminal
        console.log('A new user message', message);

        //NOTE - Send messgae to clients
        io.emit("message", message)
    })
});



app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    return res.sendFile("./public/index.html")
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))