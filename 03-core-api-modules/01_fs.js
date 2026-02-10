const fs = require("fs");

//synchronous (blocking)
const read = fs.readFileSync("test.txt", "utf8");
console.log(read);
console.log("Read File -> Blocking...\n");

fs.writeFileSync(
  "test.txt",
  "****Updated large data file with writeFileSync****",
);
console.log("Write File -> Blocking...\n");

//asynchronous (non-blocking)
fs.readFile("test.txt", "utf8", (error, data) => {
  console.log(data);
});
console.log("Non-blocking...\n");

//(async) streams (read-writable streams; two-ways) (refer: ./streams.js)
fs.createReadStream("test.txt").pipe(fs.createWriteStream("copy.txt"));
