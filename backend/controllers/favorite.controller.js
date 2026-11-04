const Favorite = require('../models/Favorite');
const Book = require('../models/Book');

function booksFromIds(ids) {
  return ids.map((id) => Book.findById(id)).filter(Boolean);
}

exports.getFavorites = (req, res) => {
  const bookIds = Favorite.getFavorites(req.userId);
  res.json({ books: booksFromIds(bookIds) });
};

exports.addFavorite = (req, res) => {
  const { bookId } = req.params;
  const book = Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: 'Buch nicht gefunden.' });
  }

  const bookIds = Favorite.getFavorites(req.userId);
  if (!bookIds.includes(bookId)) {
    bookIds.push(bookId);
    Favorite.saveFavorites(req.userId, bookIds);
  }
  res.status(201).json({ books: booksFromIds(bookIds) });
};

exports.removeFavorite = (req, res) => {
  const { bookId } = req.params;
  let bookIds = Favorite.getFavorites(req.userId);
  bookIds = bookIds.filter((id) => id !== bookId);
  Favorite.saveFavorites(req.userId, bookIds);
  res.json({ books: booksFromIds(bookIds) });
};
