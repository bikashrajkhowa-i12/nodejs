// eventLoopMonitor.js
const { monitorEventLoopDelay } = require("perf_hooks");

const histogram = monitorEventLoopDelay({
  resolution: 20, // check every 20ms (production standard: 10–50ms)
});

histogram.enable();

// reporting interval (every 10s typical in prod)
setInterval(() => {
  const p95 = histogram.percentile(95) / 1e6;
  const p99 = histogram.percentile(99) / 1e6;
  const mean = histogram.mean / 1e6;
  const max = histogram.max / 1e6;

  const metrics = {
    mean: mean.toFixed(2),
    p95: p95.toFixed(2),
    p99: p99.toFixed(2),
    max: max.toFixed(2),
  };

  console.log("Event Loop Lag (ms):", metrics);

  // 🚨 Production alert thresholds
  if (p99 > 200) {
    console.error("CRITICAL: Event loop blocked!");
  } else if (p95 > 100) {
    console.warn("WARNING: High event loop lag");
  }

  histogram.reset();
}, 10000);
