const Order = require('../models/Order');

exports.getOrders = (req, res) => {
  const orders = Order.findByUser(req.userId);
  res.json({ orders });
};
