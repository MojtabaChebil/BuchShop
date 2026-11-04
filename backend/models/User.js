const { readDB, writeDB } = require('../utils/db');

function findAll() {
  return readDB().users;
}

function findById(id) {
  return readDB().users.find((u) => u.id === id);
}

function findByEmail(email) {
  return readDB().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function create(user) {
  const db = readDB();
  db.users.push(user);
  writeDB(db);
  return user;
}

module.exports = { findAll, findById, findByEmail, create };
