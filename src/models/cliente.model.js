const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM clientes ORDER BY id DESC'
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

module.exports = { getAll, getById, create };