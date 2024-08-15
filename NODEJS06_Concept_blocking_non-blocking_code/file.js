const fs = require("fs")
const os = require("os")

// console.log("1");

// //NOTE - Blocking Code => Synchronous Code
// console.log(fs.readFileSync("./text.txt", "utf-8"));

// console.log("2");
// console.log("3");


// console.log("1");

//NOTE - Non-Blocking Code => Asynchronous Code
fs.readFile("./text.txt", "utf-8", (error, result) => {
    if (error) throw error
    // return console.log(result);
})

// console.log("2");
// console.log("3");

// fs.mkdir("node-architecture", { recursive: false }, (error) => {
//     if (error) throw error
// })

console.log(os.cpus().length);
