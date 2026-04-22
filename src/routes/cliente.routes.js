const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cliente.controller');

router.get('/',      ctrl.getAll);    // GET    /api/cliente
router.get('/:id',   ctrl.getById);   // GET    /api/cliente/:id
router.post('/',     ctrl.create);    // POST   /api/cliente
router.put('/:id',   ctrl.update);    // PUT  /api/cliente/:id
router.delete('/:id', ctrl.remove);  // DELETE /api/cliente/:id

module.exports = router;