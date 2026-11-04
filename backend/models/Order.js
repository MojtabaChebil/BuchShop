const { readDB, writeDB } = require('../utils/db');

function findByUser(userId) {
  const db = readDB();
  return db.orders
    .filter((o) => o.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function create(order) {
  const db = readDB();
  db.orders.push(order);
  writeDB(db);
  return order;
}

module.exports = { findByUser, create };
