const http = require("http")
const fs = require("fs");


//NOTE - Basic http server
// const myServer = http.createServer((req, res) => {
//     console.log("New Req Received");

//     res.end("From Server!!")
// })

// myServer.listen(8000, () => console.log("http://localhost:8000"))



//NOTE - create and log user data
// const myServer = http.createServer((req, res) => {
//     console.log("New Req Received");
//     // console.log(req);
//     // console.log(req.headers);

//     const logData = `${Date.now()}: ${req.url} New Req Received\n`
//     fs.appendFile("./logData.txt", logData, (error, result) => {
//         if (error) throw error
//         console.log(result);

//     })

//     res.end("From Server!!")
// })

// myServer.listen(8000, () => console.log("http://localhost:8000"))



//NOTE - create and log user data in multi routes (method 02)
const myServer = http.createServer((req, res) => {
    const logData = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile("./logData.txt", logData, (error, result) => {
        switch (req.url) {
            case "/":
                res.end("From Server!! - /Home")
                break;
            case "/about":
                res.end("From Server!! - /About")
                break;
            case "/contact":
                res.end("From Server!! - /Contact-Us")
                break;

            default:
                res.end("404 Not Found")
                break;
        }
    })
})

myServer.listen(8000, () => console.log("http://localhost:8000/"))


