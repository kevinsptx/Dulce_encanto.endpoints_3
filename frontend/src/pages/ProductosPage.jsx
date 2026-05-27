
import { useEffect, useState } from "react";
import axios from "axios";
 
const API_PRODUCTOS = "http://localhost:3000/api/productos";
const API_CARRITO   = "http://localhost:3000/api/carrito";
 
function Productos() {
  const [productos, setProductos]                       = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [agregando, setAgregando]                       = useState(false);
  const [agregado, setAgregado]                         = useState(false);
 
  useEffect(() => { obtenerProductos(); }, []);
 
  useEffect(() => { setAgregado(false); }, [productoSeleccionado]);
 
  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_PRODUCTOS);
      if (Array.isArray(response.data))                  setProductos(response.data);
      else if (Array.isArray(response.data.productos))   setProductos(response.data.productos);
      else if (Array.isArray(response.data.data))        setProductos(response.data.data);
      else { setProductos([]); console.error("La API no devolvió un array"); }
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };
 
  const agregarAlCarrito = async () => {
    // Intentar obtener el usuario pero NO bloquear si no hay sesión
    const usuario    = JSON.parse(localStorage.getItem("usuario") || "{}");
    const id_cliente = usuario?.id;
 
    if (!id_cliente) {
      // Sin login: guardar en localStorage como carrito temporal
      const carritoLocal = JSON.parse(localStorage.getItem("carrito_temp") || "[]");
      const existe = carritoLocal.find((i) => i.id_producto === productoSeleccionado.id_producto);
      if (existe) {
        existe.cantidad += 1;
      } else {
        carritoLocal.push({
          id_producto: productoSeleccionado.id_producto,
          nombre:      productoSeleccionado.nombre,
          precio:      productoSeleccionado.precio,
          cantidad:    1,
        });
      }
      localStorage.setItem("carrito_temp", JSON.stringify(carritoLocal));
      setAgregado(true);
      return;
    }
 
    // Con login: guardar en la API
    try {
      setAgregando(true);
      await axios.post(`${API_CARRITO}/${id_cliente}/${productoSeleccionado.id_producto}`);
      setAgregado(true);
    } catch (err) {
      alert("Error al agregar al carrito");
      console.error(err);
    } finally {
      setAgregando(false);
    }
  };
 
  return (
    <div className="productos_page">
      <h1 className="productos_titulo">Nuestros Productos</h1>
      <p className="productos_subtitulo">
        Descubre maquillaje diseñado para resaltar tu belleza
      </p>
 
      <div className="productos_grid">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div
              className="producto_card"
              key={producto.id_producto}
              onClick={() => setProductoSeleccionado(producto)}
            >
              <img
                src={producto.img || "https://via.placeholder.com/300"}
                alt={producto.nombre}
                className="producto_img"
              />
              <div className="producto_info">
                <h3>{producto.nombre}</h3>
                <p className="producto_precio">
                  ${Number(producto.precio).toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles 😢</p>
        )}
      </div>
 
      {/* MODAL */}
      {productoSeleccionado && (
        <div className="modal_overlay" onClick={() => setProductoSeleccionado(null)}>
          <div className="modal_producto" onClick={(e) => e.stopPropagation()}>
 
            <img
              src={productoSeleccionado.img}
              alt={productoSeleccionado.nombre}
              className="modal_img"
            />
            <h2>{productoSeleccionado.nombre}</h2>
            <p className="modal_descripcion">{productoSeleccionado.descripcion}</p>
            <h3 className="modal_precio">
              ${Number(productoSeleccionado.precio).toLocaleString("es-CO")}
            </h3>
 
            <div className="modal_botones">
              <button
                className="btn_carrito"
                onClick={agregarAlCarrito}
                disabled={agregando || agregado}
              >
                {agregado ? "¡Agregado! 💖" : agregando ? "Agregando..." : "🛒 Añadir al carrito"}
              </button>
 
              <button
                className="btn_cerrar"
                onClick={() => setProductoSeleccionado(null)}
              >
                Cerrar
              </button>
            </div>
 
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Productos;