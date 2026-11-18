import axios from "axios";
import { useEffect, useState } from "react";

const API = "/api/cliente";

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
    if (!window.confirm("Â¿Eliminar este cliente?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      obtener();
    } catch (err) {
      alert("Error al eliminar cliente");
      console.error(err);
    }
  };

  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-head">
          <div>
            <h1>Clientes</h1>
            <p>Gestiona tu lista de clientes ({clientes.length} registrados)</p>
          </div>
          <button className="btn" onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? "Cancelar" : "+ Añadir cliente"}
          </button>
        </div>

        {mostrarForm && (
          <div className="panel">
            <h3>Nueva clienta</h3>
            <div className="form-grid">
              <div className="field">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Laura GarcÃ­a" />
              </div>
              <div className="field">
                <label>Correo</label>
                <input name="correo" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com" type="email" />
              </div>
              <div className="field">
                <label>Tipo de piel</label>
                <select name="tipo_piel" value={form.tipo_piel} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  <option value="seca">Seca</option>
                  <option value="grasa">Grasa</option>
                  <option value="mixta">Mixta</option>
                  <option value="normal">Normal</option>
                  <option value="sensible">Sensible</option>
                </select>
              </div>
            </div>
            <button className="btn" onClick={agregar} disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar cliente"}
            </button>
          </div>
        )}

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>{["ID", "Nombre", "Correo", "Tipo de piel", "Acción"].map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr><td colSpan={5} className="empty-row">No hay clientes Añadidos</td></tr>
              ) : (
                clientes.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td><b>{c.nombre}</b></td>
                    <td>{c.correo}</td>
                    <td>{c.tipo_piel ? <span className="pill">{c.tipo_piel}</span> : "â€”"}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => eliminar(c.id)}>Eliminar</button></td>
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

export default Clientes;

