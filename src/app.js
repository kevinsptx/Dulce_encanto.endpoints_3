const express = require('express');
const app = express();
app.use(express.json());

// Las rutas NO cambian — solo cambió el modelo
const productosRouter = require('./routes/productos.routes');
app.use('/api/productos', productosRouter);

module.exports = app;

