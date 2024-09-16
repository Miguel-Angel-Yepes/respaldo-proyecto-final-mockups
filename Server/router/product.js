import express from 'express';
import multiparty from 'connect-multiparty';
import { asureAuth } from '../middlewares/authenticated.js'; // Importación nombrada
import * as ProductController from '../controllers/product.js'; // Si el controlador sigue usando `module.exports`

const md_upload = multiparty({ uploadDir: "./uploads/product" });

const api = express.Router();

api.post('/product', [asureAuth, md_upload], ProductController.createProduct);
api.get('/product/:id', ProductController.getProduct);
api.get('/product', ProductController.getProducts);
api.patch('/product/:id', [asureAuth, md_upload], ProductController.updateProduct);
api.delete('/product/:id', [asureAuth], ProductController.deleteProduct);

export default api;
