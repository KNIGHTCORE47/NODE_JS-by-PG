import express from 'express'

const app = express()
const port = 3000

app.get("/", (req, res) => res.send("From server: /home"))
app.get("/about", (req, res) => res.send("From server: /about"))
app.get("/contact", (req, res) => res.send("From server: /contact"))
app.get("/username", (req, res) => res.send(`Hello ${req.query.myname}`))

app.listen(port, () => console.log("http://localhost:3000"))