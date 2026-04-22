const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// POST   /api/carrito/:id_cliente/:id_producto  → agregar producto
router.post('/:id_cliente/:id_producto', carritoController.agregar);

// GET    /api/carrito/:id_cliente               → ver carrito
router.get('/:id_cliente', carritoController.ver);

// DELETE /api/carrito/:id_cliente/:id_producto  → eliminar producto
router.delete('/:id_cliente/:id_producto', carritoController.eliminar);

// PUT    /api/carrito/:id_cliente/:id_producto  → actualizar cantidad
router.put('/:id_cliente/:id_producto', carritoController.actualizar);

module.exports = router;