const { readDB, writeDB } = require('../utils/db');

function getFavorites(userId) {
  const db = readDB();
  return db.favorites[userId] || [];
}

function saveFavorites(userId, bookIds) {
  const db = readDB();
  db.favorites[userId] = bookIds;
  writeDB(db);
  return bookIds;
}

module.exports = { getFavorites, saveFavorites };
