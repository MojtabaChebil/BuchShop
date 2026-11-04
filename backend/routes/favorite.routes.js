const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', favoriteController.getFavorites);
router.post('/:bookId', favoriteController.addFavorite);
router.delete('/:bookId', favoriteController.removeFavorite);

module.exports = router;
