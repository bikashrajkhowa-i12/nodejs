const { fork } = require("child_process");

console.log("*****************fork(parent)********************");

const child = fork("child.js");
child.send("From parent: Hello child!! ");
child.on("message", (msg) => {
  console.log(msg);
  if (msg == "received") {
    child.kill();
  }
});
