const http = require("http"); // old space

const config = { port: 3000 }; // old space

// entire http object => old space
http
  .createServer((req, res) => {
    const requestData = { time: Date.now() }; // new space
    const responseData = { message: "ok" }; // new space

    res.end(responseData.message); // new space
  })
  .listen(config.port);
