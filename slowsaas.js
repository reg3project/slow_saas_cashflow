console.log("hello world")
const fsLib = require("fs")
const fileContent = fs.readFileSync("./Data/Recurring_Expense_test.csv")
console.log(fileContent.toString());
