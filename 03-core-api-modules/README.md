# Node.js APIs and Modules – Complete Notes

> These notes are written to give you **clear conceptual understanding + interview readiness (SDE-1 → SDE-2)**. Focus is on **how things work internally**, not just surface-level usage.

---

## 1. What are Node.js APIs?

Node.js APIs are **built-in interfaces** provided by Node that allow JavaScript to interact with:

* The operating system
* File system
* Network
* Processes & memory
* Event loop & async system

They are **not part of JavaScript itself**.

JavaScript gives you:

* Language syntax
* Call stack
* Heap

Node.js gives you:

* I/O
* Networking
* OS-level access

---

## 2. Node.js Architecture Recap (Why APIs Exist)

Node.js is built on:

* **V8 Engine** → Executes JavaScript
* **Libuv** → Event loop, async I/O, thread pool
* **C++ bindings** → Bridge JS ↔ OS

Node APIs are basically:

```
JavaScript API
   ↓
C++ Bindings
   ↓
Libuv / OS syscalls
```

---

## 3. Core Node.js Modules

Node.js core modules are **pre-installed** and **require no npm install**.

### Categories:

* File System
* Networking
* Process & OS
* Streams & Buffers
* Events
* Timers
* Module system
* Crypto

---

## 4. fs (File System Module)

### Purpose

Interact with files & directories.

### Two APIs

1. **Callback-based** (legacy)
2. **Promise-based (`fs/promises`)**

### Sync vs Async

| Type            | Blocking | Use Case        |
| --------------- | -------- | --------------- |
| fs.readFileSync | Yes      | Startup scripts |
| fs.readFile     | No       | Production      |

### Internal Working

* Async fs → delegated to **libuv thread pool**
* Sync fs → blocks event loop

### Common APIs

```js
fs.readFile(path, cb)
fs.writeFile(path, data)
fs.appendFile()
fs.unlink()
fs.mkdir()
```

### Interview Insight

> fs async methods are **not truly non-blocking** — they use the **thread pool**.

---

## 5. path Module

### Purpose

Handle file paths **OS-independently**.

### Why needed?

Windows: `\`
Linux/macOS: `/`

### Key APIs

```js
path.join()
path.resolve()
path.basename()
path.extname()
path.dirname()
```

### join vs resolve

* `join` → concatenates
* `resolve` → absolute path resolution

---

## 6. http Module

### Purpose

Create HTTP servers & clients.

### Basic Server Flow

```js
http.createServer((req, res) => {
  res.end('Hello');
})
```

### Request Lifecycle

1. TCP connection
2. HTTP parsing
3. Request object created
4. Response streamed back

### Important Concepts

* Node HTTP is **stream-based**
* No request buffering by default

---

## 7. Streams (Very Important)

### What is a Stream?

A **continuous flow of data in chunks**.

### Types

| Type      | Description |
| --------- | ----------- |
| Readable  | Read data   |
| Writable  | Write data  |
| Duplex    | Both        |
| Transform | Modify data |

### Why Streams Matter

* Low memory usage
* Backpressure handling

### Backpressure

> Happens when writable stream cannot handle incoming speed.

Node automatically handles it via `pipe()`.

---

## 8. Buffer Module

### What is Buffer?

Raw binary data representation.

### Why Needed?

* JS strings are UTF-16
* Network & file data are binary

### Key Points

* Fixed size
* Stored outside V8 heap

### Common APIs

```js
Buffer.from()
Buffer.alloc()
Buffer.concat()
```

---

## 9. EventEmitter (events module)

### Core Concept

Node is **event-driven**.

### Example

```js
emitter.on('event', handler)
emitter.emit('event')
```

### Internals

* Synchronous execution
* Listener order matters

### Used In

* Streams
* HTTP
* Process

---

## 10. Timers Module

### APIs

```js
setTimeout
setInterval
setImmediate
process.nextTick
```

### Priority Order

1. `process.nextTick`
2. Microtasks (Promises)
3. Timers
4. I/O
5. setImmediate

### Interview Trap

> `nextTick` is **not part of event loop phases** — it runs **before** the loop continues.

---

## 11. Process Module

### Purpose

Interact with current Node process.

### Key Properties

```js
process.pid
process.env
process.argv
process.exit()
```

### Events

```js
process.on('exit')
process.on('uncaughtException')
```

### Best Practice

Never rely on `uncaughtException` for recovery.

---

## 12. OS Module

### Purpose

Get system-level info.

### APIs

```js
os.cpus()
os.freemem()
os.totalmem()
os.platform()
```

---

## 13. Crypto Module

### Purpose

Cryptography utilities.

### Use Cases

* Password hashing
* Tokens
* Encryption

### Important APIs

```js
crypto.randomBytes()
crypto.createHash()
crypto.createHmac()
```

### Interview Note

Password hashing should use:

* bcrypt
* scrypt
* argon2

---

## 14. Child Process Module

### Purpose

Spawn subprocesses.

### Methods

| Method | Behavior       |
| ------ | -------------- |
| exec   | Buffers output |
| spawn  | Streams output |
| fork   | Node process   |

### fork()

* Used for IPC
* Used in clustering

---

## 15. Cluster Module

### Purpose

Utilize multiple CPU cores.

### Key Idea

* Master process
* Worker processes
* Same port sharing

### Important

Node is single-threaded **per process**, not per machine.

---

## 16. Module System (CommonJS)

### How require Works

1. Resolve path
2. Load file
3. Wrap in function
4. Execute once
5. Cache result

### Module Wrapper

```js
(function(exports, require, module, __filename, __dirname) {})
```

### require Cache

Modules are cached after first load.

---

## 17. ES Modules vs CommonJS

| Feature | CommonJS | ES Module |
| ------- | -------- | --------- |
| Syntax  | require  | import    |
| Sync    | Yes      | Async     |
| File    | .js      | .mjs      |

---

## 18. Global Objects

### Not Truly Global

Each file has its own scope.

### Globals

```js
__dirname
__filename
setTimeout
Buffer
process
```

---

## 19. Error Handling in Node

### Sync Errors

```js
try/catch
```

### Async Errors

* Callbacks → error-first
* Promises → `.catch()`
* async/await → try/catch

### Process-level Errors

```js
unhandledRejection
uncaughtException
```

---

## 20. Final Interview Mindset

If interviewer asks:

> "Is Node single-threaded?"

Correct answer:

> JavaScript execution is single-threaded, but Node uses a **multi-threaded architecture internally**.



