const orderEmitter = require("../events/orderEmitter");

function placeOrder(customer, product) {
  const order = {
    id: Date.now(),
    customer,
    product,
  };

  console.log("\n🛒 Order placed successfully!");

  orderEmitter.emit("orderPlaced", order);
}

module.exports = placeOrder;
