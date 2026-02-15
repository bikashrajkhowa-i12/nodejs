# Node.js Runtime Internals --- Complete Core Notes

---

# 1️⃣ Event Loop Phases

The **Event Loop** is the mechanism that allows Node.js to perform
non‑blocking I/O operations despite JavaScript being single‑threaded.

It has multiple phases. Each phase has a FIFO queue of callbacks to
execute.

## Phases Overview

1.  Timers
2.  Pending Callbacks
3.  Poll
4.  Check
5.  Close Callbacks

---

## 🔹 1. Timers Phase

Executes callbacks scheduled by: - setTimeout() - setInterval()

Example:

```js
setTimeout(() => {
  console.log("Timer executed");
}, 1000);
```

Important: - Timer does NOT guarantee exact timing. - It guarantees
execution after at least the given delay.

---

## 🔹 2. Pending Callbacks

Executes I/O callbacks deferred from previous cycle.

Example: - TCP errors - Some system-level operations

This phase handles lower-level system callbacks.

---

## 🔹 3. Poll Phase (Most Important)

This is the heart of the event loop.

It: - Retrieves new I/O events - Executes I/O related callbacks -
Decides how long to block

Example:

```js
const fs = require("fs");

fs.readFile("file.txt", () => {
  console.log("File read");
});
```

The callback runs in the Poll phase.

---

## 🔹 4. Check Phase

Executes: - setImmediate() callbacks

Example:

```js
setImmediate(() => {
  console.log("Executed in check phase");
});
```

Difference: - setTimeout(fn, 0) → Timers phase - setImmediate(fn) →
Check phase

---

## 🔹 5. Close Callbacks Phase

Handles close events like:

```js
socket.on("close", () => {
  console.log("Connection closed");
});
```

---

# 2️⃣ Microtasks

Microtasks execute **between each phase** of the event loop.

They have higher priority than normal callbacks.

Two types:

## 🔹 process.nextTick()

Highest priority queue in Node.

```js
process.nextTick(() => {
  console.log("nextTick");
});
```

Runs before: - Promises - Timers - I/O

Danger: Can cause starvation.

---

## 🔹 Promise Microtask Queue

```js
Promise.resolve().then(() => {
  console.log("Promise resolved");
});
```

Runs: - After current operation - Before moving to next event loop phase

Priority order:

1.  process.nextTick()
2.  Promise callbacks
3.  Event loop phases

---

# 3️⃣ libuv Architecture

libuv is the C library that powers Node's event loop.

It provides: - Event loop - Thread pool - Asynchronous I/O -
Cross-platform support

Architecture layers:

JavaScript → Node C++ bindings → libuv → OS

Responsibilities: - Handles I/O polling - Manages thread pool - Executes
callbacks

Without libuv, Node.js would not have async behavior.

---

# 4️⃣ Thread Pool

Node.js uses a thread pool for CPU-heavy tasks.

Default size: 4 threads

Used by:

- fs (file system)
- crypto (hashing, encryption)
- zlib (compression)
- DNS lookup

Example:

```js
const crypto = require("crypto");

crypto.pbkdf2("pass", "salt", 100000, 64, "sha512", () => {
  console.log("Done");
});
```

Why thread pool?

Because these operations are blocking at OS level.

Instead of blocking main thread: - Task goes to thread pool - Worker
executes - Callback returns to event loop

You can increase size:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

---

# 5️⃣ Non‑Blocking I/O Model

Node.js does not wait for I/O.

Instead: 1. Sends task to OS or thread pool 2. Continues executing other
code 3. Gets notified when done

Example:

```js
console.log("Start");

fs.readFile("file.txt", () => {
  console.log("File done");
});

console.log("End");
```

Output:

Start End File done

This is non‑blocking behavior.

---

# 6️⃣ Event Loop Starvation & Blocking

## 🔹 Blocking

If you run heavy CPU code:

```js
while (true) {}
```

Event loop freezes. No timers. No I/O.

This is blocking.

---

## 🔹 Starvation

If you abuse nextTick:

```js
function loop() {
  process.nextTick(loop);
}

loop();
```

Event loop never reaches other phases. Timers and I/O never execute.

This is starvation.

---

# 🔥 Interview Ready Summary

Event loop = executes asynchronous callbacks in phases.

Microtasks = higher priority queues that run between phases.

libuv = C engine that provides event loop & thread pool.

Thread pool = handles blocking system tasks.

Non-blocking I/O = Node delegates heavy work instead of waiting.

Blocking = CPU-heavy code freezes loop.

Starvation = high-priority queue prevents loop progression.

---

# 🧠 Final Mental Model

Think of Node.js as:

- One manager (main thread)
- 4 workers (thread pool)
- A queue system (event loop)
- A supervisor (libuv)
- Priority tasks (microtasks)
