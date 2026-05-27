import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const API = "http://localhost:3000/api/carrito";
 
function CarritoPage() {
  const navigate   = useNavigate();
  const usuario    = JSON.parse(localStorage.getItem("usuario") || "{}");
  const id_cliente = usuario?.id;
 
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagando, setPagando] = useState(false);
 
  useEffect(() => {
    cargarCarrito();
  }, []);
 
  const cargarCarrito = async () => {
    try {
      setLoading(true);
 
      if (id_cliente) {
        // Usuario logueado → cargar desde API
        const res = await axios.get(`${API}/${id_cliente}`);
        setItems(res.data.data || []);
      } else {
        // Sin login → cargar desde localStorage
        const local = JSON.parse(localStorage.getItem("carrito_temp") || "[]");
        setItems(local);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  const eliminar = async (id_producto) => {
    try {
      if (id_cliente) {
        await axios.delete(`${API}/${id_cliente}/${id_producto}`);
      } else {
        const local = JSON.parse(localStorage.getItem("carrito_temp") || "[]");
        localStorage.setItem("carrito_temp", JSON.stringify(local.filter((i) => i.id_producto !== id_producto)));
      }
      setItems((prev) => prev.filter((i) => i.id_producto !== id_producto));
    } catch (err) {
      alert("Error al eliminar");
    }
  };
 
  const cambiarCantidad = async (id_producto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) { eliminar(id_producto); return; }
    try {
      if (id_cliente) {
        await axios.put(`${API}/${id_cliente}/${id_producto}`, { cantidad: nuevaCantidad });
      } else {
        const local = JSON.parse(localStorage.getItem("carrito_temp") || "[]");
        local.find((i) => i.id_producto === id_producto).cantidad = nuevaCantidad;
        localStorage.setItem("carrito_temp", JSON.stringify(local));
      }
      setItems((prev) =>
        prev.map((i) => i.id_producto === id_producto ? { ...i, cantidad: nuevaCantidad } : i)
      );
    } catch (err) {
      alert("Error al actualizar cantidad");
    }
  };
 
  const handlePagar = () => {
    if (!id_cliente) {
      // 🔐 Solo aquí pedimos login
      const confirmar = window.confirm("Para pagar necesitas iniciar sesión 💕\n¿Quieres ir al login?");
      if (confirmar) navigate("/login");
      return;
    }
    setPagando(true);
    setTimeout(() => {
      alert("¡Pedido realizado con éxito! 💖");
      setPagando(false);
    }, 1200);
  };
 
  const total       = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const formatPrecio = (n) => "$" + Number(n).toLocaleString("es-CO");
 
  return (
    <div className="carrito-page">
      <div className="carrito-contenedor">
 
        <h1 className="carrito-titulo">Mi carrito 🛍️</h1>
        <p className="carrito-sub">
          {items.length === 0 && !loading
            ? "Tu carrito está vacío 🌸"
            : `${items.length} producto${items.length !== 1 ? "s" : ""}`}
        </p>
 
        {loading ? (
          <p className="carrito-cargando">Cargando... 💕</p>
        ) : (
          <>
            <div className="carrito-lista">
              {items.map((item) => (
                <div key={item.id_producto} className="carrito-card">
 
                  <div className="carrito-card-info">
                    <div className="carrito-card-nombre">{item.nombre}</div>
                    <div className="carrito-card-precio">{formatPrecio(item.precio)}</div>
                  </div>
 
                  <div className="carrito-controles">
                    <button className="btn-cantidad" onClick={() => cambiarCantidad(item.id_producto, item.cantidad - 1)}>−</button>
                    <span className="carrito-cantidad">{item.cantidad}</span>
                    <button className="btn-cantidad" onClick={() => cambiarCantidad(item.id_producto, item.cantidad + 1)}>+</button>
                  </div>
 
                  <div className="carrito-subtotal">{formatPrecio(item.precio * item.cantidad)}</div>
 
                  <button className="btn-eliminar" onClick={() => eliminar(item.id_producto)} title="Eliminar">✕</button>
 
                </div>
              ))}
            </div>
 
            {items.length > 0 && (
              <div className="carrito-resumen">
                <div className="carrito-total-fila">
                  <span className="carrito-total-label">Total</span>
                  <span className="carrito-total-valor">{formatPrecio(total)}</span>
                </div>
                <button className="btn-pagar" disabled={pagando} onClick={handlePagar}>
                  {pagando ? "Procesando..." : "Ir a pagar 💳"}
                </button>
              </div>
            )}
          </>
        )}
 
      </div>
    </div>
  );
}
 
export default CarritoPage;
 