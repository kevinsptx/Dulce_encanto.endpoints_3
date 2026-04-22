const carritoModel = require('../models/carrito.model');

// POST /api/carrito/:id_cliente/:id_producto
const agregar = async (req, res) => {
  try {
    const { id_cliente, id_producto } = req.params; // ← ambos por params ahora

    const data = await carritoModel.agregar(id_cliente, id_producto);
    res.status(201).json({ ok: true, msg: 'Producto agregado al carrito', data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/carrito/:id_cliente
const ver = async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const data = await carritoModel.ver(id_cliente);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// DELETE /api/carrito/:id_cliente/:id_producto
const eliminar = async (req, res) => {
  try {
    const { id_cliente, id_producto } = req.params;
    const affectedRows = await carritoModel.eliminar(id_cliente, id_producto);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Producto no estaba en el carrito' });
    }

    res.json({ ok: true, msg: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// PUT /api/carrito/:id_cliente/:id_producto
const actualizar = async (req, res) => {
  try {
    const { id_cliente, id_producto } = req.params;
    const cantidad = parseInt(req.body.cantidad); // ← parseInt para asegurar número entero

    if (isNaN(cantidad) || cantidad <= 0) { // ← isNaN cubre el caso undefined también
      return res.status(400).json({ ok: false, msg: 'Cantidad inválida' });
    }

    const affectedRows = await carritoModel.actualizar(id_cliente, id_producto, cantidad);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Producto no está en el carrito' });
    }

    res.json({ ok: true, msg: 'Cantidad actualizada' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { agregar, ver, eliminar, actualizar };