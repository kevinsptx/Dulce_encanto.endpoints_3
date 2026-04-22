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
        status: 400,
        msg: 'nombre, contrasena y correo son requeridos',
        missing: {
          nombre: !nombre,
          contrasena: !contrasena,
          correo: !correo
        }
      });
    }

    const data = await clientemodel.create({
      nombre,
      contrasena,
      correo,
      tipo_piel
    });

    res.status(201).json({
      ok: true,
      status: 201,
      msg: 'Cliente creado exitosamente',
      data: {
        id: data.id,
        nombre: data.nombre,
        correo: data.correo,
        tipo_piel: data.tipo_piel,
        createdAt: data.createdAt
      }
    });

  } catch (err) {
    res.status(500).json({
      ok: false,
      status: 500,
      msg: 'Error interno del servidor',
      error: err.message
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contrasena, correo, tipo_piel } = req.body;

    // Verificar que el cliente existe
    const existe = await clientemodel.getById(id);
    if (!existe) {
      return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' });
    }

    // Al menos un campo debe venir en el body
    if (!nombre && !contrasena && !correo && !tipo_piel) {
      return res.status(400).json({
        ok: false,
        msg: 'Debes enviar al menos un campo para actualizar'
      });
    }

    const actualizado = {
      nombre:     nombre     ?? existe.nombre,
      contrasena: contrasena ?? existe.contrasena,
      correo:     correo     ?? existe.correo,
      tipo_piel:  tipo_piel  ?? existe.tipo_piel
    };

    await clientemodel.update(id, actualizado);

    res.json({
      ok: true,
      msg: 'Cliente actualizado exitosamente',
      data: { id: Number(id), ...actualizado }
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno del servidor', error: err.message });
  }
};


const remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que el cliente existe
    const existe = await clientemodel.getById(id);
    if (!existe) {
      return res.status(404).json({ ok: false, msg: 'Cliente no encontrado' });
    }

    await clientemodel.remove(id);

    res.json({
      ok: true,
      msg: 'Cliente eliminado exitosamente',
      data: { id: Number(id) }
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: 'Error interno del servidor', error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };