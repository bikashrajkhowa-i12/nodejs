// server
const net = require("net");

net
  .createServer((socket) => {
    socket.write("Hello TCP!");
    socket.end(); // close connection cleanly
  })
  .listen(4000, () => {
    console.log("Running at port 4000");
  });
