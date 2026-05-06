require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

const clienteRouter = require('./routes/cliente.routes');
app.use('/api/cliente', clienteRouter);

const productoRoutes = require('./routes/producto.routes');
app.use('/api/productos', productoRoutes);

const carritoRoutes = require('./routes/carrito.routes');
app.use('/api/carrito', carritoRoutes);

const loginRoutes = require('./routes/login.routes');
app.use('/api/auth', loginRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const resenaRoutes = require('./routes/resena.routes');
app.use('/api/resenas', resenaRoutes);

const categoriaRoutes = require('./routes/categoria.routes');
app.use('/api/categorias', categoriaRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
});

module.exports = app;