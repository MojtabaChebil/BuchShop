const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Wichtig: /categories muss VOR /:id stehen, sonst wuerde "categories" als :id interpretiert.
router.get('/categories', bookController.getCategories);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
