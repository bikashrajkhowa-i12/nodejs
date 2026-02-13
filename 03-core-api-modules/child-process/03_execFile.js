const { execFile } = require("child_process");

console.log("*****************execFile********************");

execFile("node", ["02_spawn.js"], (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  if (stderr) {
    console.error("STDERR:", stderr);
    return;
  }

  console.log("Output:\n", stdout);
});
