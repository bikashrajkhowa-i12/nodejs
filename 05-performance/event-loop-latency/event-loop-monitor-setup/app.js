require("./eventLoopMonitor");

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello!! \n- from server.");
});

for (let i = 0; i < 2000000000; i++) {
  if (i === 1999999999) console.log("Ended CPU heavy task!");
}

const port = 4000;
server.listen(port, () => {
  console.log(`Server listening at port ${port}!`);
});
