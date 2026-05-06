const pagoModel   = require('../models/pago.model');
const pedidoModel = require('../models/pedido.model');

const getByPedido = async (req, res) => {
  try {
    const data = await pagoModel.getByPedido(req.params.id_pedido);
    if (!data) return res.status(404).json({ ok: false, msg: 'Pago no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const updateEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const estadosValidos = ['pendiente', 'aprobado', 'rechazado'];

    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({ ok: false, msg: 'Estado inválido' });
    }

    const affectedRows = await pagoModel.updateEstado(req.params.id_pedido, estado);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Pago no encontrado' });
    }

    res.json({ ok: true, msg: 'Estado del pago actualizado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getByPedido, updateEstado };