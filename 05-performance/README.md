# 🟩 Pillar: Performance, Scalability & Reliability in Node.js

**(Production-grade Node.js systems)**

Node.js is fast, lightweight, and scalable — but only when used correctly.
This guide explains **how Node behaves under load**, **why performance issues happen**, and **how to design reliable production systems**.

---

# 📌 Core Concepts

---

## 1️⃣ Event Loop Latency

### ✅ What it is

Event loop latency (or lag) is the **delay between when a task should run and when it actually runs**.

It happens when the event loop is **blocked by heavy synchronous work**.

### ✅ Why it matters

Node is single-threaded (main thread).
If one task blocks it → everything waits:

- HTTP requests
- timers
- database responses
- user interactions

---

### ❌ Blocking example (bad)

```js
const start = Date.now();

while (Date.now() - start < 5000) {
  // blocks event loop for 5 seconds
}

console.log("Done");
```

During these 5 seconds:

- no requests processed
- timers delayed
- server appears frozen

---

### ✅ Measuring event loop lag

```js
setInterval(() => {
  const start = Date.now();

  setImmediate(() => {
    const delay = Date.now() - start;
    console.log("Event loop lag:", delay, "ms");
  });
}, 1000);
```

If lag keeps increasing → your server is overloaded or blocked.

---

## 2️⃣ CPU-Bound vs I/O-Bound Tasks

Understanding this is critical for scaling Node apps.

---

### 🔵 I/O-Bound Tasks (Node is excellent here)

Waiting for external operations:

- database
- network
- file system
- API calls

Node uses **non-blocking async operations** → highly efficient.

```js
fs.readFile("file.txt", () => {
  console.log("Finished");
});
```

CPU is free while waiting.

---

### 🔴 CPU-Bound Tasks (Node struggles here)

Heavy computation:

- image processing
- encryption loops
- large data transformations
- ML inference
- big sorting operations

These block the event loop.

```js
function heavy() {
  for (let i = 0; i < 1e9; i++) {}
}
heavy(); // blocks everything
```

---

### ✅ Solution for CPU tasks

- worker threads
- child processes
- external services

---

## 3️⃣ Clustering

### ✅ Problem

Node runs on **one CPU core by default**.

Modern servers have many cores → wasted power.

---

### ✅ Solution: Cluster module

Run multiple Node processes sharing same port.

```
1 server process per CPU core
```

---

### ✅ Example

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  require("./server"); // your app
}
```

Now traffic is distributed across processes.

---

## 4️⃣ Horizontal Scaling

### ✅ Vertical scaling

Increase power of single machine:

- more RAM
- faster CPU

Limited and expensive.

---

### ✅ Horizontal scaling (recommended)

Run **multiple servers** behind a load balancer.

```
Client → Load Balancer → Server 1
                          Server 2
                          Server 3
```

Benefits:

- fault tolerance
- high availability
- unlimited scaling

---

## 5️⃣ Memory Management

Node uses heap memory to store objects.

Memory lifecycle:

```
allocate → use → release → garbage collection
```

If memory isn’t released → leaks happen.

---

### Common memory consumers

- objects
- closures
- buffers
- caches
- event listeners

---

## 6️⃣ Garbage Collection Basics

Node uses automatic garbage collection (V8 engine).

It removes objects that are:

```
no longer referenced
```

---

### Example

```js
let obj = { name: "test" };
obj = null; // eligible for GC
```

GC runs automatically, but:

- frequent allocations = more GC work
- too much memory = pauses

---

## 7️⃣ Memory Leaks

### ✅ What is a memory leak?

Memory that is **no longer needed but still referenced**, so GC cannot remove it.

Memory keeps growing → crash.

---

### 🔴 Common causes

#### 1. Global variables

```js
const cache = [];
setInterval(() => {
  cache.push(new Array(1000000));
}, 1000);
```

---

#### 2. Unremoved event listeners

```js
emitter.on("data", handler); // never removed
```

---

#### 3. Growing caches without limits

---

### ✅ Detecting leaks

Monitor heap usage over time.

If memory steadily increases → leak.

---

## 8️⃣ Load Testing

Simulate heavy traffic before real users arrive.

Purpose:

- find bottlenecks
- measure response time
- detect crashes
- capacity planning

---

### Example tool usage (conceptual)

```
1000 users sending requests per second
measure:
- latency
- throughput
- error rate
```

---

## 9️⃣ Graceful Shutdown

### ✅ Problem

Server killed abruptly:

- requests lost
- DB connections broken
- corrupted state

---

### ✅ Solution

Finish current work before exit.

---

### Example

```js
const server = app.listen(3000);

process.on("SIGTERM", () => {
  console.log("Shutting down...");

  server.close(() => {
    console.log("Closed all connections");
    process.exit(0);
  });
});
```

---

## 🔟 Monitoring

You cannot fix what you cannot see.

Monitor continuously:

---

### 📊 Event loop lag

Detect blocking operations.

---

### 📊 Heap usage

Detect memory leaks.

```js
console.log(process.memoryUsage());
```

---

### 📊 CPU usage

Detect heavy computation.

---

### 📊 Request metrics

- latency
- throughput
- error rate

---

# 🧠 Why This Pillar Matters

Node.js performs extremely well under normal conditions.

But production introduces:

- millions of users
- unpredictable traffic
- long runtimes
- memory pressure
- hardware limits

Without understanding:

✔ event loop behavior
✔ scaling strategies
✔ memory lifecycle
✔ failure handling

Your system will:

- slow down
- leak memory
- crash under load
- lose requests

---

# 🎯 Final Mental Model

```
Performance = event loop health + non-blocking design
Scalability = multiple processes + multiple machines
Reliability = safe shutdown + monitoring + memory control
```

---

# ✅ Summary Checklist

✔ Avoid blocking event loop
✔ Separate CPU-heavy work
✔ Use clustering for multi-core usage
✔ Scale horizontally
✔ Monitor memory constantly
✔ Detect leaks early
✔ Load test before production
✔ Implement graceful shutdown
✔ Monitor event loop + heap continuously

---
