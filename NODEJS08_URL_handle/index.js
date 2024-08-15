const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res) => {

    if (req.url === "/favicon.ico") return res.end()

    const myURL = url.parse(req.url, true)

    console.log(myURL);

    const logData = `${Date.now()} From ${req.url} New request Recived!!\n`

    fs.appendFile("./logFile.txt", logData, () => {
        switch (myURL.pathname) {
            case "/":
                res.end("From Server on /home")
                break;
            case "/about":
                res.end("From Server on /about")
                break;
            case "/user":
                const userName = myURL.query.myName
                res.end(`From Server!! Hay ${userName}`)
                break;
            case "/contact":
                res.end("From Server on /contact-us")
                break;
            case "/search":
                const search = myURL.query.search_query
                res.end(`Here are the result for ${search}`)
                break;

            default:
                res.end("404 not found")
                break;
        }
    })
})

myServer.listen(8000, () => console.log("http://localhost:8000/"))