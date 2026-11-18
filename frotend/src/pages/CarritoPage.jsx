import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { formatPrecio, imagenDe, onImgError, ilustracionDe, avisarCarrito } from "../utils";

const API = "/api/carrito";

function CarritoPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const id_cliente = usuario?.id_cliente ?? usuario?.id;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagando, setPagando] = useState(false);

  useEffect(() => { cargarCarrito(); }, []);

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      if (id_cliente) {
        const res = await axios.get(`${API}/${id_cliente}`);
        setItems(res.data.data || []);
      } else {
        setItems(JSON.parse(localStorage.getItem("carrito_temp") || "[]"));
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
      avisarCarrito();
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
      setItems((prev) => prev.map((i) => (i.id_producto === id_producto ? { ...i, cantidad: nuevaCantidad } : i)));
      avisarCarrito();
    } catch (err) {
      alert("Error al actualizar cantidad");
    }
  };

  const handlePagar = () => {
    if (!id_cliente) {
      const confirmar = window.confirm("Para pagar necesitas iniciar sesión 💗\n¿Quieres ir al login?");
      if (confirmar) navigate("/login");
      return;
    }
    setPagando(true);
    setTimeout(() => {
      alert("¡Pedido realizado con éxito! 💖");
      setPagando(false);
    }, 1200);
  };

  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const unidades = items.reduce((s, i) => s + Number(i.cantidad), 0);
  const envio = total >= 150000 || total === 0;

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <div className="crumbs"><Link to="/">Inicio</Link> / Carrito</div>
          <h1>Mi carrito</h1>
          <p>{loading ? "Cargando…" : items.length === 0 ? "Aún no has agregado productos." : `${unidades} art\u00EDculo${unidades !== 1 ? "s" : ""} en tu carrito`}</p>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div className="cart-layout"><div className="skeleton" style={{ aspectRatio: "3/1" }} /></div>
        ) : items.length === 0 ? (
          <div style={{ padding: "40px 0 80px" }}>
            <div className="cart-empty">
              <div className="big">🛍️</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "10px 0 6px" }}>Tu carrito est{"\u00E1"} vac{"\u00ED"}o</h3>
              <p style={{ color: "var(--muted)", marginBottom: 22 }}>Explora el catálogo y encuentra tu próximo favorito.</p>
              <Link to="/productos" className="btn">Ir a la tienda</Link>
            </div>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <div key={item.id_producto} className="cart-item">
                  <img className="cart-thumb" src={item.img || imagenDe(item.id_producto) || ilustracionDe(item.nombre)} data-fallback={ilustracionDe(item.nombre)} alt={item.nombre} onError={onImgError} />
                  <div>
                    <div className="cart-name">{item.nombre}</div>
                    <div className="cart-unit">{formatPrecio(item.precio)} </div>
                  </div>
                  <div className="qty">
                    <button onClick={() => cambiarCantidad(item.id_producto, item.cantidad - 1)} aria-label="Quitar uno">{"\u2212"}</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id_producto, item.cantidad + 1)} aria-label="Agregar uno">+</button>
                  </div>
                  <div className="cart-sub">{formatPrecio(item.precio * item.cantidad)}</div>
                  <button className="cart-remove" onClick={() => eliminar(item.id_producto)} title="Eliminar" aria-label="Eliminar">{"\u2715"}</button>
                </div>
              ))}
              <Link to="/productos" className="link-more" style={{ justifySelf: "start", marginTop: 6 }}>
  {"\u2190"} Seguir comprando
</Link>
            </div>

            <aside className="summary">
              <h3>Resumen del pedido</h3>
              <div className="sum-row"><span>Subtotal</span><span>{formatPrecio(total)}</span></div>
              <div className="sum-row"><span>Envios</span><span>{envio ? "Gratis" : "Se calcula al pagar"}</span></div>
              <div className="sum-row total"><span>Total</span><b>{formatPrecio(total)}</b></div>
              <button className="btn btn-block" style={{ marginTop: 18 }} disabled={pagando} onClick={handlePagar}>
                {pagando ? "Procesando..." : "Ir a pagar"}
              </button>
              <p className="secure">
  {"\u{1F512}"} Pago seguro {"\u00B7"} Env{"\u00ED"}os a todo el pa{"\u00ED"}s
</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CarritoPage;


