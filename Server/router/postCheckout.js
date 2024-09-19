import express from 'express';
import * as postCheckoutController from '../controllers/postCheckout.js';

const router = express.Router();

router.get('/post-checkout/:userId', postCheckoutController.postCheckout);
router.post('/send-admin-email', postCheckoutController.sendAdminEmail);
router.post('/send-user-email', postCheckoutController.sendUserEmail);


export default router;
