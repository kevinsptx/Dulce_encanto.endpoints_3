const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productos.controller');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.get('/', ctrl.getAll);         // GET    /api/productos
router.get('/:id', ctrl.getById);    // GET    /api/productos/1
router.post('/', ctrl.create);       // POST   /api/productos
router.put('/:id', ctrl.update);     // PUT    /api/productos/1
router.delete('/:id', ctrl.remove);  // DELETE /api/productos/1

module.exports = router;