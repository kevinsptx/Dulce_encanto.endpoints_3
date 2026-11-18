
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegistroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmar: "",
    tipo_piel: "",
  });
  const [cargando, setCargando] = useState(false);

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registrar = async (e) => {
    e.preventDefault();

    if (
      !form.nombre.trim() ||
      !form.correo.trim() ||
      !form.contrasena
    ) {
      alert("Completa el nombre, el correo y la contraseña.");
      return;
    }

    if (form.contrasena.length < 8) {
      alert("La contraseÃ±a debe tener al menos 8 caracteres.");
      return;
    }

    if (form.contrasena !== form.confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      setCargando(true);

      await axios.post("/api/cliente", {
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        contrasena: form.contrasena,
        tipo_piel: form.tipo_piel || null,
      });

      alert("La Cuenta se creo con exito! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      const mensaje = error.response?.data?.msg;

      if (error.response?.status === 409 ||
          error.response?.status === 400) {
        alert(mensaje || "Revisa los datos. Es posible que el correo ya este registrado.");
      } else {
        alert(mensaje || "No se pudo crear la cuenta. Intentalo nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="container">
        <div className="panel" style={{ maxWidth: 520, margin: "40px auto" }}>
          <h1>Crear cuenta</h1>
          <p>Registrate en Dulce Encanto para disfrutar de nuestros productos.</p>

          <form onSubmit={registrar}>
            <div className="field">
              <label>Nombre completo</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={cambiar}
                placeholder="Tu nombre"
                autoComplete="name"
                required
              />
            </div>

            <div className="field">
              <label>Correo electronico</label>
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={cambiar}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label>Contraseña</label>
              <input
                name="contrasena"
                type="password"
                value={form.contrasena}
                onChange={cambiar}
                placeholder="MÃ­nimo 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="field">
              <label>Confirmar contraseña</label>
              <input
                name="confirmar"
                type="password"
                value={form.confirmar}
                onChange={cambiar}
                placeholder="Repite tu contraseÃ±a"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="field">
              <label>Tipo de piel (opcional)</label>
              <select
                name="tipo_piel"
                value={form.tipo_piel}
                onChange={cambiar}
              >
                <option value="">Seleccionar</option>
                <option value="seca">Seca</option>
                <option value="grasa">Grasa</option>
                <option value="mixta">Mixta</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <button className="btn" type="submit" disabled={cargando}>
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p style={{ marginTop: 20 }}>
            Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

