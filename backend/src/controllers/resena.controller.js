const resenaModel = require('../models/resena.model');

const getByProducto = async (req, res) => {
  try {
    const data = await resenaModel.getByProducto(req.params.id_producto);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { id_producto, calificacion, comentario } = req.body;
    const id_cliente = req.usuario.id_cliente;

    if (!id_producto || !calificacion) {
      return res.status(400).json({ ok: false, msg: 'id_producto y calificacion son requeridos' });
    }

    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ ok: false, msg: 'La calificacion debe ser entre 1 y 5' });
    }

    await resenaModel.create({ id_cliente, id_producto, calificacion, comentario });

    res.status(201).json({ ok: true, msg: 'Reseña creada exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const affectedRows = await resenaModel.remove(req.params.id_resena);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Reseña no encontrada' });
    }

    res.json({ ok: true, msg: 'Reseña eliminada exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getByProducto, create, remove };