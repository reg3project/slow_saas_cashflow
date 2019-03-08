/* console.log("hello world") */
const fsLib = require("fs")
var fileContent = fsLib.readFileSync("./Data/Recurring_Expense_test.csv")
fileContent = fileContent.toString()
// Divid the file into Rows
var array1 = fileContent.split("\r\n");
var final_arr = [];
for (var i = 1; i < array1.length; i++) {
    let cols = array1[i].split(",");
    final_arr.push(cols);
    if(cols[14] && cols[20]){
        let total = cols[14] * cols[20];
        let date = new Date(cols[3]);
        if(cols[1] == "Months"){
            date.setUTCMonth(date.getUTCMonth()+ parseInt(cols[2]));
        }else if(cols[1]=="Years"){
            date.setFullYear(date.getFullYear()+ parseInt(cols[2]));
        }
    } 
} 

