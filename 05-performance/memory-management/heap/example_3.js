// Memory leak

const logs = [];

setInterval(() => {
  logs.push(`Logging at: ${Date.now()}`);
}, 1000);

setTimeout(() => {
  console.log(logs);
}, 1000);

// logs keeps on growing eventually crashing our app HEAP runs outta memory!
