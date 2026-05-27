const pedidoModel       = require('../models/pedido.model');
const detallePedidoModel = require('../models/detalle_pedido.model');
const pagoModel         = require('../models/pago.model');

const getAll = async (req, res) => {
  try {
    const data = await pedidoModel.getAll();
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const pedido = await pedidoModel.getById(req.params.id);
    if (!pedido) return res.status(404).json({ ok: false, msg: 'Pedido no encontrado' });

    const detalle = await detallePedidoModel.getByPedido(req.params.id);
    const pago    = await pagoModel.getByPedido(req.params.id);

    res.json({ ok: true, data: { ...pedido, detalle, pago } });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const getMisPedidos = async (req, res) => {
  try {
    const id_cliente = req.usuario.id_cliente;
    const data = await pedidoModel.getByCliente(id_cliente);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const id_cliente = req.usuario.id_cliente;
    const { items, metodo_pago } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ ok: false, msg: 'El pedido debe tener al menos un producto' });
    }

    if (!metodo_pago) {
      return res.status(400).json({ ok: false, msg: 'El metodo de pago es requerido' });
    }

    // Calcular total
    const total = items.reduce((acc, item) => acc + item.precio_unit * item.cantidad, 0);

    // Crear pedido
    const id_pedido = await pedidoModel.create({ id_cliente, total });

    // Insertar detalle
    for (const item of items) {
      await detallePedidoModel.create({
        id_pedido,
        id_producto: item.id_producto,
        cantidad:    item.cantidad,
        precio_unit: item.precio_unit
      });
    }

    // Registrar pago
    await pagoModel.create({ id_pedido, metodo: metodo_pago });

    res.status(201).json({ ok: true, msg: 'Pedido creado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

const updateEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const estadosValidos = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];

    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({ ok: false, msg: 'Estado inválido' });
    }

    const affectedRows = await pedidoModel.updateEstado(req.params.id, estado);

    if (affectedRows === 0) {
      return res.status(404).json({ ok: false, msg: 'Pedido no encontrado' });
    }

    res.json({ ok: true, msg: 'Estado actualizado exitosamente' });

  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getAll, getById, getMisPedidos, create, updateEstado };