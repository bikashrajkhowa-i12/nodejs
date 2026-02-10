const fs = require("fs");
const path = require("path");

const pathName = __dirname + path.join();
console.log("Pathname: ", pathName); // absolute path
console.log("Path.join('test'): ", __dirname + path.join("/test")); // absolute + the new joined path
console.log("path.resolve(): ", path.resolve()); // absolute path
console.log("Path.parse(): ", path.parse("02_path.js")); //breaks into pieces
console.log(
  "Normalize: ",
  path.normalize("/nodejs///03-core-api-modules///02_path.js"),
); // clean messy parts

//Example
const filePath = path.join(__dirname, "../", "README.md"); // pulls the root README.md
const data = fs.readFileSync(filePath, "utf-8");
console.log("Read file: ", data);
