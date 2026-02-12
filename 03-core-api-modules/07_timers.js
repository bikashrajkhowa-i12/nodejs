/*
Timers
- setTimeout (run once after delay)
- setInterval (run repeatedly)
- setImmediate (run after I/O cycle)
- clearing timers
*/

console.log("🚀 Program started");

/*
========================================
1️⃣ setTimeout → runs once after delay
========================================
*/
const timeoutId = setTimeout(() => {
  console.log("⏰ setTimeout executed after 2 seconds");
}, 2000);

/*
========================================
2️⃣ setInterval → runs repeatedly
========================================
*/
let count = 0;

const intervalId = setInterval(() => {
  count++;
  console.log(`🔁 setInterval run #${count}`);

  // stop after 3 executions
  if (count === 3) {
    clearInterval(intervalId);
    console.log("🛑 Interval stopped");
  }
}, 1000);

/*
========================================
3️⃣ setImmediate → runs after current cycle
========================================
*/
setImmediate(() => {
  console.log("⚡ setImmediate executed");
});

/*
========================================
4️⃣ Cancel timeout before it runs (optional demo)
Uncomment to test cancellation
========================================
*/
// clearTimeout(timeoutId)
// console.log("❌ Timeout cancelled")

/*
========================================
5️⃣ Synchronous blocking demo
Shows timers are async
========================================
*/
for (let i = 0; i < 1e7; i++) {} // simulate heavy work

console.log("✅ Synchronous work finished");
