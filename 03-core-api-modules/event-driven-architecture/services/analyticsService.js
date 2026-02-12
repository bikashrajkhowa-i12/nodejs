const orderEmitter = require("../events/orderEmitter");

orderEmitter.on("orderPlaced", (order) => {
  console.log(`📊 Analytics recorded for order ${order.id}`);
});
