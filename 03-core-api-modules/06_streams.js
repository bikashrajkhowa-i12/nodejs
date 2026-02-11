const fs = require("fs");
const { Transform } = require("stream");

// #1 Readable stream
const readable = fs.createReadStream("./sample/streams_input.txt");

readable.on("data", (chunk) => {
  console.log("Read-stream:", chunk.toString());
});

// #2 Writable stream

const writable = fs.createWriteStream("./sample/streams_output.txt");

// writable.write("Hello");
// writable.write(" World");
// writable.write(" - through writable streams!!");
// writable.end();

// #3 Duplex stream
// const duplexReadStream = fs.createReadStream("./sample/streams_input.txt");
// const duplexWriteStream = fs.createWriteStream("./sample/streams_output.txt");

// duplexReadStream.on("data", (chunk) => {
//   duplexWriteStream.write("Duplex - " + chunk);
// });

// // #4 Transform

const upperCase = new Transform({
  transform(chunk, enc, cb) {
    const modified = "Transformed data: " + chunk.toString().toUpperCase();
    cb(null, modified);
  },
});

const readStream = fs.createReadStream("./sample/streams_input.txt");
const writeStream = fs.createWriteStream("./sample/streams_output.txt");

readStream.pipe(upperCase).pipe(writeStream);
