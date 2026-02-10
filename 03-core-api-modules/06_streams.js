const fs = require("fs");

//readable
fs.createReadStream("test.txt").on("data", (chunk) => {
  console.log("Chunk data:", chunk.toString());
});
console.log("Reading stream chunks...");

//writable
// const writeStream = fs.createWriteStream("test.txt");
// writeStream.write("Appending new data...");
// writeStream.end();
// console.log("Writing stream");
