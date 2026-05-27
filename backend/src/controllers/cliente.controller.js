const clientemodel = require('../models/cliente.model');
const bcrypt = require('bcrypt');

// GET /api/cliente
const getAll = async (req, res) => {
  try {
    const data = await clientemodel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/cliente/:id
const getById = async (req, res) => {
  try {
    const data = await clientemodel.getById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' });
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
      return res.status(400).json({ ok: false, msg: 'nombre, contrasena y correo son requeridos' });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    await clientemodel.create({ nombre, contrasena: hash, correo, tipo_piel });

    res.status(201).json({ ok: true, msg: 'Cliente creado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// PUT /api/cliente/:id
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contrasena, correo, tipo_piel } = req.body;

    const existe = await clientemodel.getById(id);
    if (!existe) return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' });

    if (!nombre && !contrasena && !correo && !tipo_piel) {
      return res.status(400).json({ ok: false, msg: 'Debes enviar al menos un campo para actualizar' });
    }

    const hash = contrasena ? await bcrypt.hash(contrasena, 10) : existe.contrasena;

    const actualizado = {
      nombre:     nombre    ?? existe.nombre,
      contrasena: hash,
      correo:     correo    ?? existe.correo,
      tipo_piel:  tipo_piel ?? existe.tipo_piel
    };

    await clientemodel.update(id, actualizado);

    res.json({ ok: true, msg: 'Cliente actualizado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// DELETE /api/cliente/:id
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const existe = await clientemodel.getById(id);
    if (!existe) return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' });

    await clientemodel.remove(id);

    res.json({ ok: true, msg: 'Cliente eliminado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
