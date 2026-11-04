require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { initDB } = require('./utils/db');

const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const cartRoutes = require('./routes/cart.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Erstellt data/db.json mit Beispielbuechern, falls sie noch nicht existiert.
initDB();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BuchShop API laeuft.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/orders', orderRoutes);

// 404 - unbekannte Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route nicht gefunden.' });
});

// Zentrale Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Interner Serverfehler.' });
});

app.listen(PORT, () => {
  console.log(`📚 BuchShop Backend laeuft auf http://localhost:${PORT}`);
});
