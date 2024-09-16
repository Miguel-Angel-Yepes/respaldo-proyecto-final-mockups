import express from 'express';
import * as md_auth from '../middlewares/authenticated.js';
import * as AppoinmentController from '../controllers/appoinments.js'; // Si tus controladores usan `module.exports`

const api = express.Router();

api.post('/appoinment', [md_auth.asureAuth], AppoinmentController.createAppoinment);
api.get('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.getAppoinment);
api.get('/appoinment', [md_auth.asureAuth], AppoinmentController.getAppoinments);
api.patch('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.updateAppoinment);
api.delete('/appoinment/:id', [md_auth.asureAuth], AppoinmentController.deleteAppoinment);
api.patch('/appoinment-accept/:id', [md_auth.asureAuth], AppoinmentController.acceptAppoinment);
api.patch('/appoinment-reject/:id', [md_auth.asureAuth], AppoinmentController.rejectAppoinment);
api.post('/appoinment-by-admin', [md_auth.asureAuth], AppoinmentController.createAppoinmentByAdmin);


export default api; // Cambiar `module.exports` a `export default`
