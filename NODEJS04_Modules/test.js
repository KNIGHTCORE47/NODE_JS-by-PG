//CommonJs Modules -
// const func = require("./math.js")


// console.log(func.addSum(58, 1));
// console.log(func.subFunc(58, 1));



//NOTE - use object destructuring
const { addSum, subFunc } = require("./math.js")
const builtIn = require("./builtIn.js")

console.log(addSum(58, 1));
console.log(subFunc(58, 75));
console.log(builtIn);
