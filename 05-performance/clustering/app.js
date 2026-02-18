const cluster = require("cluster");
const os = require("os");
const http = require("http");

// hit http://localhost:3000 to see the processid

if (cluster.isPrimary) {
  const maxCpus = os.cpus().length;

  for (let i = 0; i < maxCpus - 3; i++) {
    const worker = cluster.fork();

    // IPC
    worker.on("message", (msg) => {
      console.log(msg);
    });
  }
} else {
  http
    .createServer((req, res) => {
      res.end(`Handled by processID: ${process.pid}`);
    })
    .listen(3000, () => {
      console.log("Server running at port: ", 3000);
      console.log("Processid: ", process.pid);
    });

  // IPC
  process.send("Hello primary");
}
