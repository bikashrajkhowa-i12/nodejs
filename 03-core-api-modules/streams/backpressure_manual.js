const fs = require("fs");

const readable = fs.createReadStream("streams_input.txt");
const writable = fs.createWriteStream("streams_output.txt", {
  highWaterMark: 16 * 1024, // buffer size; pause reading if it exceeds this size(means writing is slower than reading)
});

console.log("Starting read and write streams...");

readable.on("data", (chunk) => {
  const canWrite = writable.write(chunk);

  if (!canWrite) {
    console.log("Buffer reached highWaterMark -> pausing readable!");
    readable.pause(); // pause read
  }
});

// drain events to check if buffer is freed to read new chunks
writable.on("drain", () => {
  console.log("Buffer drained -> resuming readable...");
  readable.resume(); // resume read
});

readable.on("error", console.error);
writable.on("error", console.error);

readable.on("end", () => {
  console.log("Ending streams...");
  writable.end();
});
