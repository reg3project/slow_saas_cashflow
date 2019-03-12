const repeatUntil = new Date("2021-01-10");

const moment = require("moment");

const fsLib = require("fs");
// external lib so I can generate output excel file..
const excelLib = require("excel4node");
// Create Work Book...
const workbook = new excelLib.Workbook();
// Create Work Sheet..
var workSheet = workbook.addWorksheet("Sheet 1");

const repeatedStyle = workbook.createStyle({
  font: {
    color: "#c0392b",
    size: 12
  }
});
const normalStyle = workbook.createStyle({
  font: {
    color: "#000000",
    size: 12
  }
});
var fileContent = fsLib.readFileSync("./Data/Recurring_Expense_test.csv");
fileContent = fileContent.toString();
// Divid the file into Rows
var array1 = fileContent.split("\n");
for (var i = 1, k = 1, l = 2; i < array1.length; i++, k += 2, l += 2) {
  let cols = array1[i].split(",");
  cols[18] = cols[14] * cols[20];
  // add row items into the output file..
  cols.forEach((itemValue, j) => {
    workSheet
      .cell(k, j + 1)
      .string(itemValue + "")
      .style(normalStyle);
  });

  if (cols[14] && cols[20]) {
    let amount = cols[14] * cols[20];
    let date = new Date(cols[3]);
    if (cols[1] == "Months") {
      date.setUTCMonth(date.getUTCMonth() + parseInt(cols[2]));
      while (date <= repeatUntil) {
        repeatRow(cols, amount, date, l);
        l++;
        k++;
        date.setUTCMonth(date.getUTCMonth() + parseInt(cols[2]));
      }
    } else if (cols[1] == "Years") {
      date.setFullYear(date.getFullYear() + parseInt(cols[2]));
      while (date <= repeatUntil) {
        repeatRow(cols, amount, date, l);
        l++;
        k++;
        date.setFullYear(date.getFullYear() + parseInt(cols[2]));
      }
    }
  }
}

function repeatRow(cols, amount, date, index) {
  cols[3] = moment(date).format("YYYY-MM-DD");
  cols[18] = amount;
  cols.forEach((itemValue, j) => {
    workSheet
      .cell(index, j + 1)
      .string(itemValue + "")
      .style(repeatedStyle);
  });
}

workbook.write("./Output/output.xlsx");
