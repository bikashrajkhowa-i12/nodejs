const { spawn } = require("child_process");

console.log("*****************spawn********************");

// run command with arguments
const child = spawn("ls", ["-l"]);

// stdout stream (real-time output)
child.stdout.on("data", (data) => {
  console.log("STDOUT:", data.toString());
});

// stderr stream (errors from command)
child.stderr.on("data", (data) => {
  console.error("STDERR:", data.toString());
});

// process finished
child.on("close", (code) => {
  console.log("Process exited with code:", code);
});
