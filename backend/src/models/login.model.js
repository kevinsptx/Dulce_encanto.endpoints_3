const db = require("../config/db");

const findByCorreo = async (correo) => {
  const [rows] = await db.query(
    "SELECT * FROM cliente WHERE correo = ?",
    [correo]
  );

  return rows[0] || null;
};

module.exports = { findByCorreo };