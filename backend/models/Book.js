const { readDB } = require('../utils/db');

function findAll({ search, category } = {}) {
  let books = readDB().books;

  if (search) {
    const term = search.toLowerCase();
    books = books.filter(
      (b) => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
    );
  }

  if (category) {
    books = books.filter((b) => b.category.toLowerCase() === category.toLowerCase());
  }

  return books;
}

function findById(id) {
  return readDB().books.find((b) => b.id === id);
}

function getCategories() {
  const books = readDB().books;
  return [...new Set(books.map((b) => b.category))].sort();
}

module.exports = { findAll, findById, getCategories };
