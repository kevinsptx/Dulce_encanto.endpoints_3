require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());

// 🔥 OBLIGATORIO para que req.body funcione
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== RUTAS ===== */

// Clientes
const clienteRouter = require("./routes/cliente.routes");
app.use("/api/cliente", clienteRouter);

// Productos
const productoRoutes = require("./routes/producto.routes");
app.use("/api/productos", productoRoutes);

// Carrito
const carritoRoutes = require("./routes/carrito.routes");
app.use("/api/carrito", carritoRoutes);

// 🔐 LOGIN / AUTH (DEJA SOLO UNO)
const loginRoutes = require("./routes/login.routes");
app.use("/api/auth", loginRoutes);

// ❌ ELIMINA O DESACTIVA ESTE SI EXISTE DUPLICADO
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// Reseñas
const resenaRoutes = require("./routes/resena.routes");
app.use("/api/resenas", resenaRoutes);

// Categorías
const categoriaRoutes = require("./routes/categoria.routes");
app.use("/api/categorias", categoriaRoutes);

/* ===== ERROR HANDLER ===== */
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    ok: false,
    msg: "Error interno del servidor",
  });
});

module.exports = app;