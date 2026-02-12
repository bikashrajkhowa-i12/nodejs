// client
// run server first(05.2_net.js -> 05.1_net.js)

const net = require("net");

const client = net.createConnection({ port: 4000 }, () => {
  console.log("Connected to server");
});

client.on("data", (data) => {
  console.log("Received:", data.toString());
  client.end();
});

client.on("end", () => {
  console.log("Connection closed");
});
