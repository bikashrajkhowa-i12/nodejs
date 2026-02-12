const orderEmitter = require("../events/orderEmitter");

orderEmitter.on("orderPlaced", (order) => {
  console.log(`🚚 Shipping started for order ${order.id}`);
});
