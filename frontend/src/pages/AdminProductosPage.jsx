import axios from "axios";
import { useEffect, useState } from "react";

const API_PRODUCTOS = "http://localhost:3000/api/productos";

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
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await axios.delete(`${API_PRODUCTOS}/${id}`);
      obtenerProductos();
    } catch (err) {
      alert("Error al eliminar");
      console.error(err);
    }
  };

  return (
    <div style={s.page}>

      {/* ENCABEZADO */}
      <div style={s.header}>
        <div>
          <h1 style={s.titulo}>Admin Productos 📦</h1>
          <p style={s.sub}>Añade o elimina productos del catálogo</p>
        </div>
        <button style={s.btnPrimario} onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "✕ Cancelar" : "+ Añadir producto"}
        </button>
      </div>

      {/* FORMULARIO */}
      {mostrarForm && (
        <div style={s.formCard}>
          <h3 style={s.formTitulo}>Nuevo producto 💄</h3>
          <div style={s.formGrid}>
            <div style={s.campo}>
              <label style={s.label}>Nombre *</label>
              <input style={s.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Labial Rojo Intenso" />
            </div>
            <div style={s.campo}>
              <label style={s.label}>Precio COP *</label>
              <input style={s.input} name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 25000" type="number" min="0" />
            </div>
            <div style={s.campo}>
              <label style={s.label}>URL de imagen</label>
              <input style={s.input} name="img" value={form.img} onChange={handleChange} placeholder="https://..." />
            </div>
            <div style={s.campo}>
              <label style={s.label}>Descripción</label>
              <input style={s.input} name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción breve" />
            </div>
          </div>
          <button style={s.btnGuardar} onClick={agregarProducto} disabled={guardando}>
            {guardando ? "Guardando..." : "💾 Guardar producto"}
          </button>
        </div>
      )}

      {/* TABLA */}
      <div style={s.tablaWrap}>
        <table style={s.tabla}>
          <thead>
            <tr>
              {["ID", "Imagen", "Nombre", "Precio", "Eliminar"].map((h) => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "24px", color: "#bbb" }}>No hay productos aún 😢</td></tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id_producto} style={s.fila}>
                  <td style={s.td}>{p.id_producto}</td>
                  <td style={s.td}>
                    <img
                      src={p.img || "https://via.placeholder.com/50"}
                      alt={p.nombre}
                      style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "10px" }}
                    />
                  </td>
                  <td style={s.td}>{p.nombre}</td>
                  <td style={s.td}>${Number(p.precio).toLocaleString("es-CO")}</td>
                  <td style={s.td}>
                    <button style={s.btnEliminar} onClick={() => eliminarProducto(p.id_producto)}>
                      🗑 Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff0f6",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "24px",
  },
  titulo: {
    margin: "0 0 4px",
    color: "#f5478f",
    fontSize: "24px",
  },
  sub: {
    margin: 0,
    color: "#bbb",
    fontSize: "13px",
  },
  btnPrimario: {
    padding: "10px 20px",
    background: "#f5478f",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },
  formCard: {
    background: "#fff",
    borderRadius: "18px",
    padding: "22px 24px",
    border: "1px solid #ffc2da",
    marginBottom: "24px",
  },
  formTitulo: {
    margin: "0 0 16px",
    color: "#f5478f",
    fontSize: "16px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "14px",
    marginBottom: "16px",
  },
  campo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    color: "#aaa",
    fontWeight: "600",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1px solid #ffc2da",
    fontSize: "14px",
    outline: "none",
    background: "#fff0f6",
  },
  btnGuardar: {
    padding: "10px 22px",
    background: "#f5478f",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "600",
  },
  tablaWrap: {
    background: "#fff",
    borderRadius: "18px",
    border: "1px solid #ffc2da",
    overflow: "hidden",
  },
  tabla: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "#ffeaf4",
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    color: "#f5478f",
    fontWeight: "700",
    borderBottom: "1px solid #ffc2da",
  },
  fila: {
    borderBottom: "1px solid #fff0f6",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#555",
  },
  btnEliminar: {
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid #ffc2da",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#f5478f",
    cursor: "pointer",
  },
};

export default AdminProductos;