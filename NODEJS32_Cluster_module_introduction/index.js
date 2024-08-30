import express from 'express'
import process from 'process'

const app = express();
const PORT = process.env.PORT || 8000;

//Normal method
app.get("/", (req, res) => {
    try {
        return res.status(200).json({ message: `Hellow World!! ${process.pid}` })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Something went wrong" })
    }
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))