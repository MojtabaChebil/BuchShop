const { randomUUID } = require('crypto');
const Cart = require('../models/Cart');
const Book = require('../models/Book');
const Order = require('../models/Order');

function enrichCart(items) {
  return items
    .map((item) => {
      const book = Book.findById(item.bookId);
      if (!book) return null;
      return {
        book,
        quantity: item.quantity,
        subtotal: +(book.price * item.quantity).toFixed(2)
      };
    })
    .filter(Boolean);
}

function cartResponse(items) {
  const enriched = enrichCart(items);
  const total = +enriched.reduce((sum, i) => sum + i.subtotal, 0).toFixed(2);
  return { items: enriched, total };
}

exports.getCart = (req, res) => {
  const items = Cart.getCart(req.userId);
  res.json(cartResponse(items));
};

exports.addToCart = (req, res) => {
  const { bookId, quantity } = req.body;
  if (!bookId) {
    return res.status(400).json({ message: 'bookId ist erforderlich.' });
  }
  const book = Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: 'Buch nicht gefunden.' });
  }

  const items = Cart.getCart(req.userId);
  const existing = items.find((i) => i.bookId === bookId);
  if (existing) {
    existing.quantity += quantity && quantity > 0 ? quantity : 1;
  } else {
    items.push({ bookId, quantity: quantity && quantity > 0 ? quantity : 1 });
  }
  Cart.saveCart(req.userId, items);

  res.json(cartResponse(items));
};

exports.updateCartItem = (req, res) => {
  const { bookId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Menge muss mindestens 1 sein.' });
  }

  const items = Cart.getCart(req.userId);
  const existing = items.find((i) => i.bookId === bookId);
  if (!existing) {
    return res.status(404).json({ message: 'Artikel nicht im Warenkorb gefunden.' });
  }
  existing.quantity = quantity;
  Cart.saveCart(req.userId, items);

  res.json(cartResponse(items));
};

exports.removeCartItem = (req, res) => {
  const { bookId } = req.params;
  let items = Cart.getCart(req.userId);
  items = items.filter((i) => i.bookId !== bookId);
  Cart.saveCart(req.userId, items);

  res.json(cartResponse(items));
};

exports.checkout = (req, res) => {
  const items = Cart.getCart(req.userId);
  if (items.length === 0) {
    return res.status(400).json({ message: 'Warenkorb ist leer.' });
  }

  const { items: enriched, total } = cartResponse(items);

  const order = {
    id: randomUUID(),
    userId: req.userId,
    items: enriched.map((i) => ({
      bookId: i.book.id,
      title: i.book.title,
      author: i.book.author,
      price: i.book.price,
      quantity: i.quantity,
      subtotal: i.subtotal
    })),
    total,
    status: 'bestaetigt',
    createdAt: new Date().toISOString()
  };

  Order.create(order);
  Cart.clearCart(req.userId);

  res.status(201).json({ order });
};
