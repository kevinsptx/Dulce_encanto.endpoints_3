const pool = require('../config/db');

const agregar = async (id_cliente, id_producto) => {
  // Si ya existe el producto en el carrito, suma 1
  const [existe] = await pool.query(
    'SELECT * FROM carrito WHERE id_cliente = ? AND id_producto = ?',
    [id_cliente, id_producto]
  );

  if (existe.length > 0) {
    const [result] = await pool.query(
      'UPDATE carrito SET cantidad = cantidad + 1 WHERE id_cliente = ? AND id_producto = ?',
      [id_cliente, id_producto]
    );
    return result;
  }

  const [rows] = await pool.query(
    'INSERT INTO carrito (id_cliente, id_producto, cantidad) VALUES (?, ?, 1)',
    [id_cliente, id_producto]
  );
  return rows;
};

// Trae nombre y precio del producto junto al carrito
const ver = async (id_cliente) => {
  const [rows] = await pool.query(
    `SELECT c.id_producto, c.cantidad,
            p.nombre, p.precio
     FROM carrito c
     JOIN producto p ON c.id_producto = p.id
     WHERE c.id_cliente = ?`,
    [id_cliente]
  );
  return rows;
};

const eliminar = async (id_cliente, id_producto) => {
  const [result] = await pool.query(
    'DELETE FROM carrito WHERE id_cliente = ? AND id_producto = ?',
    [id_cliente, id_producto]
  );
  return result.affectedRows;
};

const actualizar = async (id_cliente, id_producto, cantidad) => {
  const [result] = await pool.query(
    'UPDATE carrito SET cantidad = ? WHERE id_cliente = ? AND id_producto = ?',
    [cantidad, id_cliente, id_producto]
  );
  return result.affectedRows;
};

module.exports = { agregar, ver, eliminar, actualizar };