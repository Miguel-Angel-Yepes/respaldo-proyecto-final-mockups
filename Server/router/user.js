import express from 'express';
import * as UserController from '../controllers/user.js'; // Si el controlador sigue usando `module.exports`
import * as md_auth from '../middlewares/authenticated.js'; // Si el middleware sigue usando `module.exports`

const api = express.Router();

api.get('/user/me', [md_auth.asureAuth], UserController.getMe);
api.patch('/user/update', [md_auth.asureAuth], UserController.updateUser);
api.delete('/user/delete', [md_auth.asureAuth], UserController.deleteUser);

export default api;
