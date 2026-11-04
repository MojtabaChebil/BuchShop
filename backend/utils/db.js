// Sehr einfache "Datenbank": speichert alle Daten in einer JSON-Datei.
// So braucht das Mini-Projekt keinen externen Datenbankserver (kein MongoDB/MySQL noetig) -
// nach "npm install" laeuft alles sofort.

const fs = require('fs');
const path = require('path');
const { seedBooks } = require('../data/seed');

const DB_PATH = path.join(__dirname, '../data/db.json');

function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      users: [],
      books: seedBooks,
      carts: {},
      favorites: {},
      orders: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
    console.log('[DB] Neue Datenbank-Datei mit Beispielbüchern wurde erstellt.');
  }
}

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { initDB, readDB, writeDB };
