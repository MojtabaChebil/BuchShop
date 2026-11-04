const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.post('/checkout', cartController.checkout);
router.put('/:bookId', cartController.updateCartItem);
router.delete('/:bookId', cartController.removeCartItem);

module.exports = router;
