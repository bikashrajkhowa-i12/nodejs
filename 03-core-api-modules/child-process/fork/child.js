console.log("*****************fork(child)********************");

process.on("message", (msg) => {
  console.log(msg);
  process.send(respondParent(msg));
});

function respondParent(message) {
  return "received";
}
