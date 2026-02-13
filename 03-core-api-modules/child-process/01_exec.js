const { exec } = require("child_process");

console.log("*****************exec********************");

// ls command
// exec("ls", (error, stdout, stderr) => {
//   console.log(stdout);
// });

// runs the 00_test.js file
// exec("node 00_test.js", (error, stdout, stderr) => {
//   if (error) {
//     console.error("Execution failed:", error.message);
//     return;
//   }

//   if (stderr) {
//     console.error("stderr output:", stderr);
//   }

//   console.log(stdout);
// });

// real world example
const child = exec("ls");

child.stdout.on("data", (data) => {
  console.log("Output:\n", data);
});

child.on("exit", (code) => {
  console.log("Finished with code:", code);
});

child.on("error", (err) => {
  console.log("Failed:", err);
});
