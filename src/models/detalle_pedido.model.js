const db = require('../config/db');

const getByPedido = async (id_pedido) => {
  const [rows] = await db.query(
    `SELECT dp.id_detalle, dp.cantidad, dp.precio_unit,
            p.nombre AS producto, p.marca
     FROM detalle_pedido dp
     JOIN producto p ON dp.id_producto = p.id_producto
     WHERE dp.id_pedido = ?`,
    [id_pedido]
  );
  return rows;
};

const create = async ({ id_pedido, id_producto, cantidad, precio_unit }) => {
  await db.query(
    'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unit) VALUES (?, ?, ?, ?)',
    [id_pedido, id_producto, cantidad, precio_unit]
  );
};

module.exports = { getByPedido, create };