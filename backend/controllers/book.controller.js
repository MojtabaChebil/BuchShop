const Book = require('../models/Book');

exports.getAllBooks = (req, res) => {
  const { search, category } = req.query;
  const books = Book.findAll({ search, category });
  res.json({ books });
};

exports.getCategories = (req, res) => {
  res.json({ categories: Book.getCategories() });
};

exports.getBookById = (req, res) => {
  const book = Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Buch nicht gefunden.' });
  }
  res.json({ book });
};
