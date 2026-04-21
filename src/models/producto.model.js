const pool = require('../config/db');

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM producto'  // sin ORDER BY hasta confirmar el nombre de la columna
  );
  return rows;
};

const getNuevos = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM producto LIMIT 4'
  );
  return rows;
};

const getMasVendidos = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM producto WHERE mas_vendido = 1'
  );
  return rows;
};

const filtrarPorPiel = async (tipoPiel) => {
  const [rows] = await pool.query(
    'SELECT * FROM producto WHERE tipo_piel = ?', [tipoPiel]
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM producto WHERE id = ?', [id]
  );
  return rows[0];
};

const create = async ({ nombre, descripcion, precio, tipo_piel, mas_vendido }) => {
  const [result] = await pool.query(
    'INSERT INTO producto (nombre, descripcion, precio, tipo_piel, mas_vendido) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, tipo_piel, mas_vendido]
  );
  return { id: result.insertId, nombre, descripcion, precio, tipo_piel, mas_vendido };
};

module.exports = { getAll, getNuevos, getMasVendidos, filtrarPorPiel, getById, create };