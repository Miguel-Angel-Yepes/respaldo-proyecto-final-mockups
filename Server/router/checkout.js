import express from 'express';
import * as checkoutController from '../controllers/checkout.js';

const router = express.Router();

router.post('/checkout', checkoutController.addClientData);

router.get('/checkout/:userId', checkoutController.getClientData);

export default router;
