const db = require('../config/db');

const getByPedido = async (id_pedido) => {
  const [rows] = await db.query(
    'SELECT * FROM pagos WHERE id_pedido = ?',
    [id_pedido]
  );
  return rows[0] || null;
};

const create = async ({ id_pedido, metodo }) => {
  await db.query(
    'INSERT INTO pagos (id_pedido, metodo) VALUES (?, ?)',
    [id_pedido, metodo]
  );
};

const updateEstado = async (id_pedido, estado) => {
  const [result] = await db.query(
    'UPDATE pagos SET estado = ? WHERE id_pedido = ?',
    [estado, id_pedido]
  );
  return result.affectedRows;
};

module.exports = { getByPedido, create, updateEstado };