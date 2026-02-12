const fs = require("fs");

const data = fs.readFileSync("test.txt");
console.log(data);

fs.readFile("test.txt", "utf-8", (error, data) => {
  console.log("Async...");
  console.log(data);
});
