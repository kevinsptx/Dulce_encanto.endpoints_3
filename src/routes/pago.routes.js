const router = require('express').Router();
const pagoController = require('../controllers/pago.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// GET /api/pagos/:id_pedido — ver pago de un pedido (protegido)
router.get('/:id_pedido', verificarToken, pagoController.getByPedido);

// PUT /api/pagos/:id_pedido/estado — actualizar estado del pago (protegido)
router.put('/:id_pedido/estado', verificarToken, pagoController.updateEstado);

module.exports = router;