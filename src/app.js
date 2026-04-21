const express = require('express');
const app = express();

app.use(express.json());

// Las rutas NO cambian — solo cambió el modelo
const clienteRouter = require('./routes/cliente.routes');
app.use('/api/cliente', clienteRouter);

const productoRoutes = require('./routes/producto.routes');
app.use('/api/productos', productoRoutes);

const carritoRoutes = require('./routes/carrito.routes');
app.use('/api/carrito', carritoRoutes);

module.exports = app;