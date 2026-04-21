const productoModel = require('../models/producto.model');

// GET /api/productos
const getAll = async (req, res) => {
  try {
    const data = await productoModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/productos/nuevos
const getNuevos = async (req, res) => {
  try {
    const data = await productoModel.getNuevos();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/productos/mas-vendidos
const getMasVendidos = async (req, res) => {
  try {
    const data = await productoModel.getMasVendidos();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/productos/filtrar?tipoPiel=grasa
const filtrarPorPiel = async (req, res) => {
  try {
    const { tipoPiel } = req.query;

    if (!tipoPiel) {
      return res.status(400).json({
        ok: false,
        msg: 'El parámetro tipoPiel es requerido'
      });
    }

    const data = await productoModel.filtrarPorPiel(tipoPiel);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/productos/:id
const getById = async (req, res) => {
  try {
    const data = await productoModel.getById(req.params.id);
    if (!data) return res.status(404)
      .json({ ok: false, msg: 'Producto no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/productos
const create = async (req, res) => {
  try {
    const { nombre, descripcion, precio, tipo_piel, mas_vendido } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({
        ok: false,
        msg: 'nombre y precio son requeridos'
      });
    }

    const data = await productoModel.create({
      nombre,
      descripcion,
      precio,
      tipo_piel,
      mas_vendido: mas_vendido ?? 0
    });

    res.status(201).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getNuevos, getMasVendidos, filtrarPorPiel, getById, create };