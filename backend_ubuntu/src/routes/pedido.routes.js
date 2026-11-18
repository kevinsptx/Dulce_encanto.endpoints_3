const router = require('express').Router();
const pedidoController = require('../controllers/pedido.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// GET /api/pedidos — todos los pedidos (protegido)
router.get('/', verificarToken, pedidoController.getAll);

// GET /api/pedidos/mis-pedidos — pedidos del cliente logueado (protegido)
router.get('/mis-pedidos', verificarToken, pedidoController.getMisPedidos);

// GET /api/pedidos/:id — un pedido con detalle y pago (protegido)
router.get('/:id', verificarToken, pedidoController.getById);

// POST /api/pedidos — crear pedido (protegido)
router.post('/', verificarToken, pedidoController.create);

// PUT /api/pedidos/:id/estado — actualizar estado (protegido)
router.put('/:id/estado', verificarToken, pedidoController.updateEstado);

module.exports = router;