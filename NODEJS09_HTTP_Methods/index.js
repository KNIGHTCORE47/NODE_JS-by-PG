const http = require("http")
const fs = require("fs")

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end()
    const logData = `${Date.now()} method used ${req.method} From: ${req.url} New server Request!!\n`
    fs.appendFile("./logFile.txt", logData, () => {
        switch (req.url) {
            case "/":
                res.end("From server /")
                break;
            case "/about":
                res.end("From server /about")
                break;
            case "/contact":
                res.end("From server /contact")
                break;
            case "/signUp":
                if (req.method === "GET") {
                    return res.end("Render the singup form")
                } else if (req.method === "POST") {
                    //DB query...
                    return res.end("Success")
                }
                break;

            default:
                res.end("404 Not Found!!")
                break;
        }
    })

})

myServer.listen(8000, () => console.log("http://localhost:8000/"))