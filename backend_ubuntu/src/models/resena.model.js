const db = require('../config/db');

const getByProducto = async (id_producto) => {
  const [rows] = await db.query(
    `SELECT r.id_resena, r.calificacion, r.comentario, r.creado_en,
            c.nombre AS cliente
     FROM resena r
     JOIN cliente c ON r.id_cliente = c.id
     WHERE r.id_producto = ?
     ORDER BY r.creado_en DESC`,
    [id_producto]
  );
  return rows;
};

const create = async ({ id_cliente, id_producto, calificacion, comentario }) => {
  await db.query(
    'INSERT INTO resena (id_cliente, id_producto, calificacion, comentario) VALUES (?, ?, ?, ?)',
    [id_cliente, id_producto, calificacion, comentario]
  );
};

const remove = async (id_resena) => {
  const [result] = await db.query('DELETE FROM resena WHERE id_resena = ?', [id_resena]);
  return result.affectedRows;
};

module.exports = { getByProducto, create, remove };