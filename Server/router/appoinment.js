const express = require('express');
const md_auth = require('../middlewares/authenticated');
const AppoinmentController = require('../controllers/appoinments');

const api = express.Router();

api.post('/appoinment', [md_auth.asureAuth], AppoinmentController.createAppoinment);
api.get('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.getAppoinment);
api.get('/appoinments', [md_auth.asureAuth], AppoinmentController.getAppoinments);
api.patch('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.updateAppoinment);
api.delete('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.deleteAppoinment);

module.exports = api;