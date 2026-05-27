const categoriaModel = require('../models/categoria.model');

const getAll = async (req, res) => {
  try {
    const data = await categoriaModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await categoriaModel.getById(req.params.id);
    if (!data) return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ ok: false, msg: 'El nombre es requerido' });
    }

    await categoriaModel.create({ nombre, descripcion });

    res.status(201).json({ ok: true, msg: 'Categoría creada exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await categoriaModel.remove(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Categoría no encontrada' });
    }

    res.json({ ok: true, msg: 'Categoría eliminada exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, create, remove };