const db = require('../config/db');

const getAll = async () => {
  const [rows] = await db.query('SELECT * FROM categoria');
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id]);
  return rows[0] || null;
};

const create = async ({ nombre, descripcion }) => {
  await db.query('INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
};

const remove = async (id) => {
  const [result] = await db.query('DELETE FROM categoria WHERE id_categoria = ?', [id]);
  return result.affectedRows;
};

module.exports = { getAll, getById, create, remove };