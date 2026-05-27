const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM cliente ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM cliente WHERE id = ?', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ nombre, contrasena, correo,tipo_piel }) => {
  const [result] = await pool.query(
    'INSERT INTO cliente (nombre, contrasena, correo,tipo_piel) VALUES (?, ?, ?,?)',
    [nombre, contrasena, correo,tipo_piel]
  );
  return { id: result.insertId, nombre, contrasena, correo,tipo_piel };
};


const update = async (id, { nombre, contrasena, correo, tipo_piel }) => {
  const [result] = await pool.query(
    'UPDATE cliente SET nombre = ?, contrasena = ?, correo = ?, tipo_piel = ? WHERE id = ?',
    [nombre, contrasena, correo, tipo_piel, id]
  );
  return result.affectedRows; // 1 si actualizó, 0 si no encontró el id
};


const remove = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM cliente WHERE id = ?', [id]
  );
  return result.affectedRows; // 1 si eliminó, 0 si no encontró el id
};

module.exports = { getAll, getById, create, update, remove };
