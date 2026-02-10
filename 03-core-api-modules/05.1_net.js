// client
// run server first(05.2 -> 05.1)

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
