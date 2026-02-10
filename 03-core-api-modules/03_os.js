const os = require("os");

console.log("Machine: ", os.machine());
console.log("Platform: ", os.platform());
console.log("Architecture: ", os.arch());
console.log("Type: ", os.type());
console.log("Version: ", os.version());
console.log("Hostname: ", os.hostname());
console.log("Home directory", os.homedir());
console.log("Temporary directory: ", os.tmpdir());
console.log("User-Info: ", os.userInfo());
console.log("Free Memory: ", os.freemem());
console.log("Total Memory: ", os.totalmem());
console.log("CPUs: ", os.cpus());
console.log("Network Interfaces", os.networkInterfaces());
console.log("Endianness: ", os.endianness());
console.log("Load average", os.loadavg());
console.log("Release version: ", os.release());
console.log("Up-time: ", os.uptime());
