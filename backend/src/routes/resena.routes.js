const router = require('express').Router();
const resenaController = require('../controllers/resena.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// GET /api/resenas/:id_producto — ver reseñas de un producto (público)
router.get('/:id_producto', resenaController.getByProducto);

// POST /api/resenas — crear reseña (protegido)
router.post('/', verificarToken, resenaController.create);

// DELETE /api/resenas/:id_resena — eliminar reseña (protegido)
router.delete('/:id_resena', verificarToken, resenaController.remove);

module.exports = router;