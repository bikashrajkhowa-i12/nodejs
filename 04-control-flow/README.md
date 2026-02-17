# Node.js Core APIs & Modules

**Deep Concept Guide + Practical Examples**

This document explains the **core built-in modules** provided by Node.js and the **fundamental runtime concepts** behind them.

These are the low-level primitives used to build servers, handle files, process data efficiently, and run tasks concurrently.

---

# 🧭 How to Read This Guide

For each module you will see:

✔ What it is
✔ Why it exists
✔ When to use it
✔ Code example
✔ Mental model

Then we cover key architectural ideas.

---

# 📦 Core Modules

---

# 📁 1. `fs` — File System

## What it does

Allows Node to interact with files and directories.

You can:

- read files
- write files
- delete files
- stream files

---

## Why it exists

Servers constantly interact with storage:

- logs
- uploads
- configs
- databases (files underneath)

Node needs fast I/O access.

---

## Modes of operation

### 🔴 Synchronous (blocking)

Stops event loop until done.

```
Program waits → then continues
```

```js
const fs = require("fs");

const data = fs.readFileSync("file.txt", "utf8");
console.log(data);
```

Use when:

- startup tasks
- scripts
- not performance sensitive

---

### 🟢 Asynchronous (non-blocking)

Registers callback → continues execution.

```
start read → continue program → callback later
```

```js
fs.readFile("file.txt", "utf8", (err, data) => {
  console.log(data);
});
```

Use in servers.

---

### 🌊 Streams (large data)

Reads file piece-by-piece.

```
Disk → chunk → process → chunk → process
```

```js
const stream = fs.createReadStream("large.txt");

stream.on("data", (chunk) => {
  console.log("Received chunk");
});
```

Use for:

- video
- logs
- uploads
- big datasets

---

## Mental Model

```
Sync  = load everything → then work
Async = start work → notify later
Stream = process while loading
```

---

# 📂 2. `path` — File Path Utilities

## Problem it solves

Different OS use different separators.

```
Windows → \
Linux   → /
```

Manual string building breaks portability.

---

## Example

```js
const path = require("path");

path.join("users", "docs", "file.txt");
path.extname("index.js");
path.basename("/home/app/file.txt");
```

---

## Mental Model

```
path = safe string builder for file locations
```

---

# 🖥 3. `os` — System Information

Gives environment details.

Useful for scaling decisions.

```js
const os = require("os");

console.log(os.cpus().length);
console.log(os.totalmem());
console.log(os.platform());
```

---

## Real use case

```
If CPU cores = 8
spawn 8 workers
```

---

# 🌐 4. `http` / `https` — Web Servers

Core of backend development.

Creates raw web server without frameworks.

---

## Server Flow

```
Client request → handler → response
```

---

## Example

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.write("Hello");
  res.end();
});

server.listen(3000);
```

---

## Mental Model

```
http = request listener + response writer
```

---

# 🔌 5. `net` — TCP Networking

Low-level socket communication.

Used when HTTP is too high-level.

---

## Example chat-style server

```js
const net = require("net");

const server = net.createServer((socket) => {
  socket.write("Connected");
});
server.listen(5000);
```

---

## When used

- game servers
- proxies
- messaging protocols
- custom network systems

---

# 🌊 6. `stream` — Data Flow System

Streams are continuous data pipelines.

They allow incremental processing.

---

## Stream types

| Type      | Direction |
| --------- | --------- |
| Readable  | input     |
| Writable  | output    |
| Duplex    | both      |
| Transform | modify    |

---

## Example pipeline

```js
readStream.pipe(writeStream);
```

---

## Visual Flow

```
Source → Processing → Destination
```

---

# 🧠 7. `buffer` — Raw Memory Storage

Represents binary data.

Needed because network & files are bytes.

---

## Example

```js
const buf = Buffer.from("Hi");
console.log(buf);
```

---

## Mental Model

```
Buffer = fixed chunk of memory
```

---

# 📣 8. `events` — EventEmitter

Core async communication system.

Everything in Node reacts to events.

---

## Pattern

```
register listener
emit event
listener executes
```

---

## Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("start", () => console.log("Started"));
emitter.emit("start");
```

---

## Mental Model

```
publish → subscribe system
```

---

# 🔐 9. `crypto` — Security Operations

Provides cryptographic primitives.

---

## Example hashing

```js
const crypto = require("crypto");

const hash = crypto.createHash("sha256").update("secret").digest("hex");
```

---

## Uses

- password storage
- tokens
- encryption
- signatures

---

# ⏱ 10. `timers` — Scheduling Tasks

Controls execution timing.

---

## Types

| Function     | Behavior  |
| ------------ | --------- |
| setTimeout   | once      |
| setInterval  | repeated  |
| setImmediate | after I/O |

---

## Execution Order (simplified)

```
I/O → setImmediate
Timer expires → setTimeout
```

---

# 🧩 11. `child_process` — Separate Programs

Runs independent OS processes.

---

## Architecture

```
Parent process
    ↕ IPC
Child process
```

---

## Example

```js
const { fork } = require("child_process");
fork("worker.js");
```

---

## Use when

- running external programs
- isolation needed
- system tools

---

# 🧵 12. `worker_threads` — Parallel JS Execution

Runs JS in multiple threads.

---

## Architecture

```
Main thread
   ↕ message passing
Worker thread
```

---

## Example

```js
const { Worker } = require("worker_threads");

new Worker("./worker.js");
```

---

## Use when

CPU heavy tasks:

- image processing
- data analysis
- simulations

---

# 🧠 Key Runtime Concepts

---

# 🌊 Streams vs Buffers

## Buffer approach

```
Load entire file → process
```

Memory heavy.

---

## Stream approach

```
Load small piece → process → repeat
```

Memory efficient.

---

## Illustration

```
BUFFER
[====================]

STREAM
[==][==][==][==]
```

---

# 🚦 Backpressure

When producer is faster than consumer.

---

## Problem

```
fast read → slow write → memory builds up
```

---

## Solution

Pause producer.

---

## Manual control

```js
if (!writeStream.write(chunk)) readStream.pause();

writeStream.on("drain", () => readStream.resume());
```

---

## Automatic control

```
readStream.pipe(writeStream)
```

Pipe manages flow.

---

# 📣 EventEmitter Pattern

Foundation of async architecture.

---

## Why needed

Loose coupling.

```
Module A emits
Module B reacts
```

No direct dependency.

---

## Example flow

```
file uploaded → event emitted → database updated
```

---

# ⚙ Child Process vs Worker Thread

Both allow parallel work.

But architecture differs.

---

## Child Process

```
separate memory
separate runtime
OS level isolation
```

Heavy but safe.

---

## Worker Thread

```
same process
shared memory optional
lightweight
```

Fast but less isolated.

---

## Performance analogy

```
Child process = new computer
Worker thread = new CPU core
```

---

# 🧠 Core Architecture Summary

```
Event Loop
   ↓
Non-blocking I/O
   ↓
Streams + Events
   ↓
Concurrency tools
```

Everything in Node is built around:

✔ events
✔ async execution
✔ data streaming
✔ minimal blocking

---

# 🎯 What Mastery Looks Like

✔ when to stream vs buffer
✔ how backpressure prevents overload
✔ how events coordinate modules
✔ when to use threads vs processes
✔ how core modules interact

---
