const orderEmitter = require("../events/orderEmitter");

orderEmitter.on("orderPlaced", (order) => {
  console.log(`📧 Email sent to ${order.customer}`);
});
