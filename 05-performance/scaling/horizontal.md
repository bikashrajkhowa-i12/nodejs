# Horizontal Scaling

> A production-grade architectural strategy to increase system capacity
> by adding more machines (nodes) instead of increasing the power of a
> single machine.

---

## 1. What is Horizontal Scaling?

Horizontal scaling (also called **scale-out**) means increasing system
capacity by **adding more servers or instances** that share the
workload.

Instead of:

    1 powerful server

You use:

    Multiple smaller servers working together

This approach is foundational in modern distributed systems and
cloud-native architectures.

---

## 2. Horizontal vs Vertical Scaling

---

Aspect Vertical Scaling (Scale-Up) Horizontal Scaling (Scale-Out)

---

Approach Add CPU/RAM to one machine Add more machines

Downtime Often required Usually zero-downtime

Cost Model Expensive hardware Commodity infrastructure

Fault Low High
Tolerance

Scalability Hardware ceiling Theoretically unlimited
Limit

---

---

## 3. Core Architectural Principles

### 3.1 Load Balancing

When multiple servers exist, traffic must be distributed efficiently.

Architecture:

        Users
           ↓
     Load Balancer
      ↙     ↓     ↘

Server1 Server2 Server3

Responsibilities: - Distribute incoming traffic - Perform health
checks - Route around failed instances - Enable zero-downtime
deployments

Example (NGINX configuration):

```nginx
http {
  upstream backend {
    server 10.0.0.1;
    server 10.0.0.2;
    server 10.0.0.3;
  }

  server {
    location / {
      proxy_pass http://backend;
    }
  }
}
```

---

### 3.2 Stateless Architecture

Horizontal scaling works best when services are stateless.

❌ Problem (Stateful):

```js
app.post("/login", (req, res) => {
  req.session.user = user;
});
```

If the next request goes to a different server, the session is lost.

✅ Solution (Stateless):

- Store session in shared storage (Redis / Database)
- Use JWT-based authentication

```js
const token = jwt.sign({ userId }, SECRET);
```

Now any server can validate the request.

---

### 3.3 Distributed System Implications

Horizontal scaling turns your system into a distributed system.

This introduces: - Network latency - Partial failures - Race
conditions - Data consistency trade-offs

#### CAP Theorem

You cannot simultaneously guarantee: - Consistency - Availability -
Partition tolerance

Production systems typically favor Availability and Partition tolerance.

---

### 3.4 Shared Data Layer

Multiple servers require shared persistence.

Options: - Primary database with read replicas - Distributed cache
(Redis) - Object storage - Database sharding

Example:

    App Servers (N instances)
            ↓
        Primary DB
          ↓
     Read Replicas

---

### 3.5 Auto Scaling

Modern cloud platforms allow automatic scaling based on:

- CPU usage
- Request rate
- Queue depth
- Memory usage

Example (Kubernetes Deployment):

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 5
```

Increasing replicas horizontally scales the service.

---

## 4. Node.js-Specific Horizontal Scaling

Node.js runs single-threaded per process.

### Option 1: Cluster (Single Machine Scaling)

```js
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
} else {
  require("./server");
}
```

This utilizes multiple CPU cores but remains on one machine.

### Option 2: True Horizontal Scaling

Deploy the same Node.js app across multiple machines:

    Machine1 → Node App
    Machine2 → Node App
    Machine3 → Node App
              ↓
         Load Balancer

---

## 5. Bottlenecks in Horizontal Scaling

### 5.1 Database Bottleneck

Solution: - Read replicas - Sharding - Caching layer

### 5.2 Shared Resource Locks

Solution: - Distributed locks - Idempotent operations

### 5.3 Sticky Sessions

Solution: - Stateless authentication

### 5.4 Network Overhead

Solution: - Co-locate services - Use async messaging (Kafka, RabbitMQ)

---

## 6. Sharding (Advanced Concept)

Sharding splits data across multiple databases.

Example:

    userId % 3
    → DB1
    → DB2
    → DB3

Benefits: - Parallel read/write operations - Reduced contention -
Independent scaling

Trade-offs: - Increased operational complexity - Cross-shard query
challenges

---

## 7. Observability in Horizontally Scaled Systems

Monitoring becomes critical.

Track: - CPU per instance - Memory usage - Request latency - Error
rate - Event loop lag (Node.js) - Distributed tracing

Centralized logging and metrics aggregation are mandatory in production
systems.

---

## 8. Advantages

- High availability
- Fault tolerance
- Rolling deployments
- Elastic growth
- Zero-downtime scaling

---

## 9. Trade-Offs

- Operational complexity
- Distributed debugging challenges
- Network latency overhead
- Data consistency management
- Higher infrastructure coordination cost

---

## 10. Production Architecture Example

            CDN
             ↓
      Load Balancer
      ↓      ↓      ↓

App1 App2 App3 ... AppN ↓ Redis Cache ↓ Primary DB ↓ ↓ Replica1 Replica2

When traffic increases: - Auto-scaler adds more app instances - Load
balancer redistributes traffic - System maintains availability

---

## Final Summary

Horizontal scaling is not just about adding more servers.

It requires: - Stateless service design - Load balancing - Distributed
data strategy - Observability - Fault tolerance engineering

It transforms a simple application into a distributed system that must
be designed deliberately and thoughtfully.

Mastering horizontal scaling is essential for building resilient,
production-grade, cloud-native systems.
