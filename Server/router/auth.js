import express from 'express';
import * as AuthController from '../controllers/auth.js'; // Si los controladores siguen utilizando `module.exports`

const api = express.Router();

api.post("/auth/register", AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken);

export default api;
