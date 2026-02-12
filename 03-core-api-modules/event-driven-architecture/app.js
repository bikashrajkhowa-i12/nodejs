// Load all services (register listeners)
require("./services/emailService");
require("./services/inventoryService");
require("./services/analyticsService");
require("./services/shippingService");

// Load controller
const placeOrder = require("./controllers/orderController");

// Simulate order
placeOrder("Alex", "Laptop");
