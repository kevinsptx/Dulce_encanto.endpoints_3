import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { onImgError } from "../utils";

function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/auth/login", {
        correo,
        contrasena: password,
      });

      // ðŸ” Guardar sesiÃ³n
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      // âœ… Redirigir al dashboard protegido
      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert(error.response?.data?.msg || "Error en el login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth">
      <div className="auth-visual">
        <img src="https://i.pinimg.com/736x/54/eb/02/54eb02aef7767c9d190e0ca9edbe95df.jpg" alt="" onError={onImgError} />
        <div className="auth-quote">
          Tu piel ya es hermosa, nosotros solo la hacemos brillar un poco mÃ¡s.
          <small>Dulce Encanto Â· Maquillaje que cuida de ti</small>
        </div>
      </div>

      <div className="auth-form-wrap">
        <div className="auth-card">
          <h1>Bienvenida</h1>
          <p>Inicia sesión para pagar tus productos y ver tu carrito en cualquier dispositivo.</p>
          <form onSubmit={handleLogin}>
            <div className="field">
              <label htmlFor="correo">Correo electronico</label>
              <input id="correo" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="pass">Contraseña</label>
              <input id="pass" type="password" autoComplete="current-password" placeholder="Escribe tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-block" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
          <p className="auth-note">
  Aun no tienes cuenta?{" "}
  <Link
    to="/registro"
    style={{ color: "var(--rose-dark)", fontWeight: 600 }}
  >
    Registrate aqui
  </Link>
</p>

<p className="auth-note">
  Solo quieres mirar?{" "}
  <Link
    to="/productos"
    style={{ color: "var(--rose-dark)", fontWeight: 600 }}
  >
    Explora la tienda
  </Link>
</p>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;

