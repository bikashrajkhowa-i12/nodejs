const fs = require("fs");

// REQUIRED
const readable = fs.createReadStream("streams_input.txt", {
  highWaterMark: 16 * 1024,
});
const writable = fs.createWriteStream("streams_output.txt", {
  highWaterMark: 16 * 1024,
});

// REQUIRED
readable.pipe(writable);

// OPTIONAL: for understanding
writable.on("drain", () => {
  console.log("Writable buffer drained (pipe auto-resumed reading)");
});

// OPTIONAL
readable.on("end", () => {
  console.log("Finished reading file");
});

// OPTIONAL
writable.on("finish", () => {
  console.log("Finished writing file");
});

readable.on("error", console.error);
writable.on("error", console.error);
