const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require('../middlewares/authenticated');
 
const api = express.Router();

api.get('/user/me', [md_auth.asureAuth], UserController.getMe);
api.patch('/user/update', [md_auth.asureAuth], UserController.updateUser);
api.delete('/user/delete', [md_auth.asureAuth], UserController.deleteUser);


module.exports = api;