const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

// "message" events
worker.on("message", (msg) => {
  if (msg.type === "terminate") {
    worker.terminate();
    return;
  }

  if (msg.type === "result") {
    console.log("Result from worker:", msg.data);
  }
});

worker.postMessage(1000000000);

console.log("Main app running...");

// "error" events
worker.on("error", (error) => {
  console.log("Error: ", error);
});

// "exit" events
worker.on("exit", (code) => {
  console.log("Worker exited with code:", code);
});
