const db = require('../config/db');

const getAll = async () => {
  const [rows] = await db.query(
    `SELECT p.id_pedido, p.total, p.estado, p.creado_en,
            c.nombre AS cliente, c.correo
     FROM pedidos p
     JOIN cliente c ON p.id_cliente = c.id
     ORDER BY p.creado_en DESC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query(
    `SELECT p.id_pedido, p.total, p.estado, p.creado_en,
            c.nombre AS cliente, c.correo
     FROM pedidos p
     JOIN cliente c ON p.id_cliente = c.id
     WHERE p.id_pedido = ?`,
    [id]
  );
  return rows[0] || null;
};

const getByCliente = async (id_cliente) => {
  const [rows] = await db.query(
    'SELECT * FROM pedidos WHERE id_cliente = ? ORDER BY creado_en DESC',
    [id_cliente]
  );
  return rows;
};

const create = async ({ id_cliente, total }) => {
  const [result] = await db.query(
    'INSERT INTO pedidos (id_cliente, total) VALUES (?, ?)',
    [id_cliente, total]
  );
  return result.insertId;
};

const updateEstado = async (id, estado) => {
  const [result] = await db.query(
    'UPDATE pedidos SET estado = ? WHERE id_pedido = ?',
    [estado, id]
  );
  return result.affectedRows;
};

module.exports = { getAll, getById, getByCliente, create, updateEstado };