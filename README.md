# Node.js & Express Learning Repository 🚀

This repository documents my **deep dive into Node.js and Express**, focusing on **runtime internals, backend architecture, scalability, security, and testing**.

The goal is not just to use Node.js, but to **understand how it works internally and how production-grade backend systems are built**.

---

## 🎯 Core Focus: Node.js & Express (The 6 Pillars)

### 1️⃣ Node.js Runtime Internals

Deep understanding of how Node works under the hood:

- Event Loop internals
  - Timers phase
  - Poll phase
  - Check phase
- Libuv architecture
- Thread Pool & offloading
- Non-blocking I/O model
- How async tasks are scheduled & executed

---

### 2️⃣ Streams & Buffers

Efficient handling of large data:

- Buffers & binary data
- Streams:
  - Readable
  - Writable
  - Duplex
  - Transform
- `pipe()` mechanics
- Backpressure & flow control
- Real-world stream use cases (files, APIs)

---

### 3️⃣ Express Middleware Architecture

Mastering the request–response lifecycle:

- Express internals
- Request & response objects
- Middleware execution order
- Writing custom middleware
- Error-handling middleware
- `next()` mechanics and control flow
- Designing scalable Express apps

---

### 4️⃣ Authentication & Security

Building secure backend systems:

- JWT authentication
- OAuth2 fundamentals
- Session-based authentication
- Refresh tokens
- Securing APIs against OWASP Top 10
- Security tools:
  - Helmet
  - CORS
  - Rate limiting
- Preventing common attacks (XSS, CSRF, Injection)

---

### 5️⃣ Process Management & Scaling

Scaling Node.js applications:

- Cluster module
- PM2 process management
- Load balancing concepts
- Worker Threads for CPU-intensive tasks
- Handling crashes & restarts
- Horizontal vs vertical scaling

---

### 6️⃣ Testing & Debugging

Ensuring reliability and performance:

- Unit testing (Jest / Mocha)
- Integration testing for REST APIs
- Mocking & test isolation
- Debugging Node.js applications
- Using Node inspector & profiler
- Identifying memory leaks
- CPU bottleneck analysis

---

## 📂 Repository Structure

```text
nodejs-learning/
├── runtime-internals/
├── streams-buffers/
├── express-middleware/
├── auth-security/
├── scaling-process-management/
├── testing-debugging/
├── mini-projects/
└── README.md
```
