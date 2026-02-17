/**
 * The delay between when a task is scheduled and when the event loop actually executes it.
 */

const start = Date.now();

console.log("Start time: ", Date.now() - start);

setTimeout(() => {
  console.log("Timer executed after:", Date.now() - start, "ms");
}, 100);

for (let i = 0; i < 200000000; i++) {
  if (i == 199999999) {
    console.log("CPU-heavy work completed!");
  }
}
