import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrecio, onImgError, imagenProducto, respaldoProducto } from "../utils";

const API_PRODUCTOS = "/api/productos";

function AdminProductos() {
  const [productos, setProductos]     = useState([]);
  const [guardando, setGuardando]     = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", img: "" });

  useEffect(() => { obtenerProductos(); }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get(API_PRODUCTOS);
      if (Array.isArray(res.data))                setProductos(res.data);
      else if (Array.isArray(res.data.productos)) setProductos(res.data.productos);
      else if (Array.isArray(res.data.data))      setProductos(res.data.data);
      else setProductos([]);
    } catch (err) {
      console.error("Error cargando productos:", err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const agregarProducto = async () => {
    if (!form.nombre || !form.precio) return alert("Nombre y precio son obligatorios");
    try {
      setGuardando(true);
      await axios.post(API_PRODUCTOS, { ...form, precio: Number(form.precio) });
      setForm({ nombre: "", descripcion: "", precio: "", img: "" });
      setMostrarForm(false);
      obtenerProductos();
    } catch (err) {
      alert("Error al agregar producto");
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("Eliminar este producto?")) return;
    try {
      await axios.delete(`${API_PRODUCTOS}/${id}`);
      obtenerProductos();
    } catch (err) {
      alert("Error al eliminar");
      console.error(err);
    }
  };

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-head">
          <div>
            <h1>Admin de productos</h1>
            <p>Añade o elimina un productos del catalogo ({productos.length} en total)</p>
          </div>
          <button className="btn" onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? "Cancelar" : "+ Añadir producto"}
          </button>
        </div>

        {mostrarForm && (
          <div className="panel">
            <h3>Nuevo producto</h3>
            <div className="form-grid">
              <div className="field">
                <label>Nombre *</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Labial Rojo Intenso" />
              </div>
              <div className="field">
                <label>Precio COP *</label>
                <input name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 25000" type="number" min="0" />
              </div>
              <div className="field">
                <label>URL de imagen</label>
                <input name="img" value={form.img} onChange={handleChange} placeholder="https://..." />
              </div>
              <div className="field">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción breve" />
              </div>
            </div>
            <button className="btn" onClick={agregarProducto} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar producto"}
            </button>
          </div>
        )}

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>{["ID", "Imagen", "Nombre", "Precio", "Acción"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr><td colSpan={5} className="empty-row">No hay productos Añadidos</td></tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id_producto}>
                    <td>{p.id_producto}</td>
                    <td><img className="thumb" src={imagenProducto(p)} data-fallback={respaldoProducto(p)} alt={p.nombre} onError={onImgError} /></td>
                    <td><b>{p.nombre}</b></td>
                    <td>{formatPrecio(p.precio)}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p.id_producto)}>Eliminar</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AdminProductos;

