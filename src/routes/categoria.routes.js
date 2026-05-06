const router = require('express').Router();
const categoriaController = require('../controllers/categoria.controller');
const { verificarToken } = require('../middlewares/authMiddleware');

// GET /api/categorias — ver todas (público)
router.get('/', categoriaController.getAll);

// GET /api/categorias/:id — ver una (público)
router.get('/:id', categoriaController.getById);

// POST /api/categorias — crear (protegido)
router.post('/', verificarToken, categoriaController.create);

// DELETE /api/categorias/:id — eliminar (protegido)
router.delete('/:id', verificarToken, categoriaController.remove);

module.exports = router;