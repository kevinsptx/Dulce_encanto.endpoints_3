const pool = require('../config/db');

const agregar = async (id_cliente, id_producto) => {
  // Verificar si ya existe en el carrito
  const [existe] = await pool.query(
    'SELECT * FROM carrito WHERE id_cliente = ? AND id_producto = ?',
    [id_cliente, id_producto]
  );

  if (existe.length > 0) {
    // Si ya existe, aumentar cantidad
    await pool.query(
      'UPDATE carrito SET cantidad = cantidad + 1 WHERE id_cliente = ? AND id_producto = ?',
      [id_cliente, id_producto]
    );
  } else {
    // Si no existe, insertar con cantidad 1
    await pool.query(
      'INSERT INTO carrito (id_cliente, id_producto, cantidad) VALUES (?, ?, 1)',
      [id_cliente, id_producto]
    );
  }

  return await ver(id_cliente);
};

const ver = async (id_cliente) => {
  const [rows] = await pool.query(
    `SELECT c.id_carrito, c.cantidad, c.creado_en,
            p.id_producto, p.nombre, p.precio, p.tipo_piel
     FROM carrito c
     JOIN producto p ON c.id_producto = p.id_producto
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