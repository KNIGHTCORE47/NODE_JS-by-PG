import express from 'express'
import fs from 'fs'
import status from 'express-status-monitor'
import zlib from 'zlib'

const app = express();
const PORT = process.env.PORT || 8000;

app.use(status());

//NOTE - Memory Consuming Process (NOT RECOMMENDED) ❌
// app.get("/", (req, res) => {
//     //NOTE - Here test.txt(info) -> fs.readFile -> read the file -> create variable 'data' -> store 'data' in memory(RAM) -> from memory -> send 'data' info -> response(data info) 
//     fs.readFile("./test.txt", "utf-8", (err, data) => {
//         return res.status(200).send(data)
//     })
// })

//NOTE - Create Zip files with Stream Chunks
//Stream Read (Sample.txt) --> Zipper --> fs Write Stream
fs.createReadStream("./test.txt").pipe(
    zlib.createGzip().pipe(
        fs.createWriteStream("./text.txt.gz")
    )
)


//NOTE - NodeJs Streams
app.get("/", (req, res) => {
    const stream = fs.createReadStream("./test.txt", "utf-8")

    stream.on("data", chunk => {
        res.status(200).write(chunk)
    })

    stream.on("end", () => res.send())
})



app.listen(PORT, () => console.log(`http://localhost:${PORT}`))