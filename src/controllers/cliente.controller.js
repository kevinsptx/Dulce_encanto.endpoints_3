const clientemodel = require('../models/cliente.model');

// GET /api/Cliente
const getAll = async (req, res) => {
  try {
    const data = await clientemodel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/Cliente/:id
const getById = async (req, res) => {
  try {
    const data = await clientemodel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Producto no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/cliente
const create = async (req, res) => {
  try {
    const { nombre, contrasena, correo, tipo_piel } = req.body;

    if (!nombre || !contrasena || !correo) {
      return res.status(400).json({
        ok: false,
        msg: 'nombre, contrasena y correo son requeridos'
      });
    }

    const data = await clientemodel.create({
      nombre,
      contrasena,
      correo,
      tipo_piel
    });

    res.status(201).json({ ok: true, data });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};
module.exports = { getAll, getById, create };