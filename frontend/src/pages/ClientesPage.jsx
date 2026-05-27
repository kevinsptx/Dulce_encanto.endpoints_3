import axios from "axios";
import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/cliente";

function Clientes() {
  const [clientes, setClientes]   = useState([]);
  const [form, setForm]           = useState({ nombre: "", correo: "", tipo_piel: "" });
  const [guardando, setGuardando] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  useEffect(() => { obtener(); }, []);

  const obtener = () => {
    axios.get(API)
      .then((res) => setClientes(res.data.data || res.data || []))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const agregar = async () => {
    if (!form.nombre || !form.correo) return alert("Nombre y correo son obligatorios");
    try {
      setGuardando(true);
      await axios.post(API, form);
      setForm({ nombre: "", correo: "", tipo_piel: "" });
      setMostrarForm(false);
      obtener();
    } catch (err) {
      alert("Error al agregar cliente");
      console.error(err);
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este cliente?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      obtener();
    } catch (err) {
      alert("Error al eliminar cliente");
      console.error(err);
    }
  };

  return (
    <div style={s.page}>

      {/* ENCABEZADO */}
      <div style={s.header}>
        <div>
          <h1 style={s.titulo}>Clientes 👥</h1>
          <p style={s.sub}>Gestiona tu lista de clientes</p>
        </div>
        <button style={s.btnPrimario} onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "✕ Cancelar" : "+ Añadir cliente"}
        </button>
      </div>

      {/* FORMULARIO AÑADIR */}
      {mostrarForm && (
        <div style={s.formCard}>
          <h3 style={s.formTitulo}>Nueva clienta 🌸</h3>
          <div style={s.formGrid}>
            <div style={s.campo}>
              <label style={s.label}>Nombre</label>
              <input style={s.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Laura García" />
            </div>
            <div style={s.campo}>
              <label style={s.label}>Correo</label>
              <input style={s.input} name="correo" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com" type="email" />
            </div>
            <div style={s.campo}>
              <label style={s.label}>Tipo de piel</label>
              <select style={s.input} name="tipo_piel" value={form.tipo_piel} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option value="seca">Seca</option>
                <option value="grasa">Grasa</option>
                <option value="mixta">Mixta</option>
                <option value="normal">Normal</option>
                <option value="sensible">Sensible</option>
              </select>
            </div>
          </div>
          <button style={s.btnGuardar} onClick={agregar} disabled={guardando}>
            {guardando ? "Guardando..." : "💾 Guardar cliente"}
          </button>
        </div>
      )}

      {/* TABLA */}
      <div style={s.tablaWrap}>
        <table style={s.tabla}>
          <thead>
            <tr>
              {["ID", "Nombre", "Correo", "Tipo de piel", "Acción"].map((h) => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "24px", color: "#bbb" }}>No hay clientes aún 😢</td></tr>
            ) : (
              clientes.map((c) => (
                <tr key={c.id} style={s.fila}>
                  <td style={s.td}>{c.id}</td>
                  <td style={s.td}>{c.nombre}</td>
                  <td style={s.td}>{c.correo}</td>
                  <td style={s.td}>{c.tipo_piel || "—"}</td>
                  <td style={s.td}>
                    <button style={s.btnEliminar} onClick={() => eliminar(c.id)}>
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
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "12px",
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

export default Clientes;