const fs = require("fs")

//NOTE - fs module is an inbuilt module of node js.



//NOTE - create file

//NOTE - Synchronus Method
// fs.writeFileSync("./test.txt", "Test for the file system module");

//Note - Asynchronous Method
// fs.writeFile("./test02.txt", "Test two for the file system module", error => {
//     if (error) throw error
// });

//NOTE - Replace
// fs.writeFileSync("./test.txt", "I have replace the text here");



//NOTE - create folder

//NOTE - single folder
// fs.mkdirSync("my-docs")

//NOTE - nested folders
// fs.mkdirSync("my-docs2/folder01/folder02", { recursive: true })



//NOTE - read file

//NOTE - Synchronus Method
// const result = fs.readFileSync("./content.txt", "utf-8")
// console.log(result);

//Note - Asynchronous Method
// fs.readFile("./content.txt", "utf-8", (error, result) => {
//     if (error) {
//         console.log(error);
//     }
//     return console.log(result);
// })



//NOTE - write file

//NOTE - Synchronus Method
// fs.appendFileSync("./content.txt", "\ncontent.txt read text from line 03 here...")
// fs.appendFileSync("./content.txt", `\n${new Date().getDate().toLocaleString()}`)
// fs.appendFileSync("./content.txt", `\n${Date.now()}`)

//Note - Asynchronous Method
// fs.appendFile("./content.txt", "\ncontent.txt read text from line 04 here...", (error) => {
//     if (error) throw error
// })



//NOTE - copy file
// fs.cpSync("./content.txt", "./copy.txt")

//NOTE - delete file
// fs.unlinkSync("./copy.txt")

//NOTE - check stats
// const fileState = fs.statSync("./content.txt");
// console.log(fileState);
