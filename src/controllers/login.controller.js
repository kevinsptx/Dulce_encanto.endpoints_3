const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginModel = require('../models/login.model');

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ ok: false, msg: 'Correo y contraseña son requeridos' });
    }

    const cliente = await loginModel.findByCorreo(correo);

    if (!cliente) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    const valid = await bcrypt.compare(contrasena, cliente.contrasena);

    if (!valid) {
      return res.status(401).json({ ok: false, msg: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id_cliente: cliente.id_cliente, correo: cliente.correo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
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