const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// GET /api/productos
router.get('/', productoController.getAll);

// GET /api/productos/nuevos
router.get('/nuevos', productoController.getNuevos);

// GET /api/productos/mas-vendidos
router.get('/mas-vendidos', productoController.getMasVendidos);

// GET /api/productos/filtrar?tipoPiel=grasa
router.get('/filtrar', productoController.filtrarPorPiel);

// GET /api/productos/:id
router.get('/:id', productoController.getById);

// POST /api/productos
router.post('/', productoController.create);

module.exports = router;