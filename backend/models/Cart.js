const { readDB, writeDB } = require('../utils/db');

function getCart(userId) {
  const db = readDB();
  return db.carts[userId] || [];
}

function saveCart(userId, items) {
  const db = readDB();
  db.carts[userId] = items;
  writeDB(db);
  return items;
}

function clearCart(userId) {
  const db = readDB();
  db.carts[userId] = [];
  writeDB(db);
}

module.exports = { getCart, saveCart, clearCart };
