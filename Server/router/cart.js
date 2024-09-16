import express from 'express';
import * as cartController from '../controllers/cart.js';

const router = express.Router();

// Agregar un producto al carrito
router.post('/add', cartController.addToCart);

// Eliminar un producto del carrito
router.post('/remove', cartController.removeFromCart);

// Obtener el carrito del usuario
router.get('/cart/:userId', cartController.getCart);

// Actualizar la cantidad de productos en el carrito
router.put('/cart', cartController.updateCartQuantity);

export default router;
