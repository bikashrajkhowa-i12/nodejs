const orderEmitter = require("../events/orderEmitter");

orderEmitter.on("orderPlaced", (order) => {
  console.log(`📦 Inventory updated for ${order.product}`);
});
