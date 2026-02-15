# JavaScript Execution Model (Node-Specific)

## Deep Core Notes --- From Scratch to Interview Ready

---

# 1️⃣ Call Stack

The **Call Stack** is a data structure that keeps track of function
execution.

JavaScript is **single-threaded**, meaning: - Only ONE function runs at
a time. - Functions are pushed onto the stack when called. - Removed
(popped) when finished.

Example:

```js
function a() {
  b();
}

function b() {
  console.log("Inside b");
}

a();
```

Execution Flow: 1. Global context pushed 2. a() pushed 3. b() pushed 4.
b() popped 5. a() popped

If stack exceeds limit → Stack Overflow.

---

# 2️⃣ Execution Context

An execution context is the environment where code runs.

Types:

1.  Global Execution Context
2.  Function Execution Context
3.  Eval Execution Context (rarely used)

Each execution context has:

- Variable Environment
- Scope Chain
- this binding

When function runs: - New execution context is created. - Pushed to call
stack.

---

# 3️⃣ Scope & Closures

## Scope

Scope determines where variables are accessible.

Types:

- Global scope
- Function scope
- Block scope (let/const)

Example:

```js
let x = 10;

function test() {
  let y = 20;
  console.log(x);
}
```

x is accessible inside test due to lexical scope.

---

## Closures

A closure is when a function remembers its outer scope even after outer
function finishes.

Example:

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const fn = outer();
fn(); // 1
fn(); // 2
```

Why it works: - inner() retains reference to outer's variables.

---

# 4️⃣ Hoisting

Hoisting means declarations are moved to top during compilation phase.

### var

```js
console.log(a);
var a = 10;
```

Output: undefined

Because: var a is hoisted but initialized as undefined.

---

### let & const

They are hoisted but in **Temporal Dead Zone (TDZ)**.

```js
console.log(b);
let b = 20;
```

Throws ReferenceError.

---

### Function Declarations

Fully hoisted.

```js
test();

function test() {
  console.log("Hello");
}
```

Works fine.

---

# 5️⃣ this Behavior (Node vs Browser)

## In Browser

Global this → window

## In Node.js

Top-level this → module.exports (NOT global)

Example in Node:

```js
console.log(this);
```

Outputs: {}

Because each file in Node is wrapped inside a function.

---

Inside Function:

```js
function test() {
  console.log(this);
}

test();
```

Non-strict mode → global object Strict mode → undefined

---

# 6️⃣ Module Scope vs Global Scope

In Node:

Each file is its own module.

Node wraps code like:

```js
(function (exports, require, module, __filename, __dirname) {
  // your code
});
```

So variables declared in a file are NOT global.

Example:

file1.js

```js
var x = 10;
```

file2.js

```js
console.log(x); // Error
```

Because scope is module-specific.

---

# 7️⃣ Sync vs Async Execution

## Synchronous

Code executes line by line.

```js
console.log("A");
console.log("B");
```

Output: A B

---

## Asynchronous

Does not block execution.

Example:

```js
setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("After");
```

Output: After Timeout

Because async tasks go to event loop.

---

# 8️⃣ Microtasks vs Macrotasks

## Macrotasks

- setTimeout
- setInterval
- setImmediate
- I/O

## Microtasks

- process.nextTick()
- Promise.then()

Priority order:

1.  process.nextTick()
2.  Promise callbacks
3.  Macrotasks

Example:

```js
setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("nextTick"));
```

Output: nextTick Promise Timeout

---

# 9️⃣ Error Propagation in Async Code

## Synchronous Error

```js
try {
  throw new Error("Error");
} catch (e) {
  console.log("Caught");
}
```

Works normally.

---

## Async Callback Error

```js
try {
  setTimeout(() => {
    throw new Error("Error");
  }, 0);
} catch (e) {
  console.log("Won't catch");
}
```

This will NOT catch the error.

Because error happens in future tick.

---

## Proper Async Handling

Using Promises:

```js
Promise.reject("Error").catch((err) => console.log(err));
```

Using async/await:

```js
async function test() {
  try {
    await Promise.reject("Error");
  } catch (e) {
    console.log(e);
  }
}
```

---

# 🔥 Interview Ready Summary

Call Stack → Executes functions one at a time.

Execution Context → Environment created for each function call.

Scope → Determines variable accessibility.

Closures → Function remembers outer scope.

Hoisting → Declarations moved to top during compilation.

this → Different in Node vs browser.

Module scope → Each file has its own scope in Node.

Sync → Blocks execution.

Async → Uses event loop.

Microtasks → Higher priority than macrotasks.

Error handling → Async errors must be handled differently.

---

# 🧠 Final Mental Model

Think of Node execution like:

- Call Stack → Active worker
- Execution Context → Workspace created per task
- Scope → Variable visibility rules
- Closures → Memory retention mechanism
- Event Loop → Task scheduler
- Microtasks → VIP queue
- Macrotasks → Normal queue
