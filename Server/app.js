const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {API_VERSION} = require('./constants');


const app = express();

//Rutas
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const productRoutes = require('./router/product');
const appoinmentRoutes = require('./router/appoinment');

//Configuración body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configuración carpeta de estáticos
app.use(express.static("uploads"));

//Configure Header HTTP - CORS
app.use(cors());

//Configurar rutas
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, productRoutes);
app.use(`/api/${API_VERSION}`, appoinmentRoutes);

module.exports = app;