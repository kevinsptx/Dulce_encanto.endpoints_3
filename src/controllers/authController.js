const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ ok: false, msg: 'Correo y contraseña son requeridos' });
    }

    const [rows] = await db.query('SELECT * FROM cliente WHERE correo = ?', [correo]);
    const cliente = rows[0];

    if (!cliente) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(contrasena, cliente.contrasena);

    if (!valid) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id_cliente: cliente.id, correo: cliente.correo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ ok: true, msg: 'Login exitoso', token });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const logout = async (req, res) => {
  res.json({ ok: true, msg: 'Logout exitoso' });
};

module.exports = { login, logout };