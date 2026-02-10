const http = require("http");

// ## HTTP
//response on http://localhost:3000
const server = http.createServer((req, res) => {
  res.end("Hello world!");
});
const port = 3000;
server.listen(port, () => {
  console.log("Server running on port: ", port);
});

setTimeout(() => {
  server.close();
  console.log("Server closed in 10s!");
}, 10000);

//## HTTPS
//req ssl certificate and private-key
