// const { parentPort } = require("worker_threads");

// parentPort.on("message", (limit) => {
//   let sum = 0;
//   for (let i = 0; i < limit; i++) {
//     sum += i;
//   }
//   parentPort.postMessage(sum);
//   parentPort.postMessage("terminate");
// });

const { parentPort } = require("worker_threads");

parentPort.on("message", (limit) => {
  let sum = 0;
  for (let i = 0; i < limit; i++) {
    sum += i;
  }

  parentPort.postMessage({ type: "result", data: sum });
  parentPort.postMessage({ type: "terminate" });
});
