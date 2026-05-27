import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
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

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          correo,
          contrasena: password,
        }
      );

      // guardar sesión
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data.usuario)
      );

      alert("Inicio de sesión exitoso 💖");

      navigate("/");

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.log("RESPUESTA:", error.response?.data);

      alert(
        error.response?.data?.msg ||
        "Error en el login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">Bienvenido 💖</h1>
        <p className="login-subtitle">
          Inicia sesión para continuar
        </p>

        <form onSubmit={handleLogin} className="login-form">

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;