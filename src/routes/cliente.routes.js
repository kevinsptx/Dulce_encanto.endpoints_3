const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cliente.controller');

// Obtener todos los clientes
router.get('/', ctrl.getAll);

// Obtener un cliente por id
router.get('/:id', ctrl.getById);

// Crear cliente
router.post('/', ctrl.create);

module.exports = router;