const express = require('express');
const app = express();

app.use(express.json());

// Las rutas NO cambian — solo cambió el modelo
const clienteRouter = require('./routes/cliente.routes');
app.use('/api/cliente', clienteRouter);

module.exports = app;