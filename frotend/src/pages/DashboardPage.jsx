import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const tarjetas = [
    { emoji: "💄", titulo: "Productos", sub: "Ver catálogo", ruta: "/productos" },
    { emoji: "👥", titulo: "Clientes", sub: "Añadir · Eliminar", ruta: "/clientes" },
    { emoji: "🛍️", titulo: "Carrito", sub: "Ver tu carrito", ruta: "/carrito" },
    { emoji: "🔐", titulo: "Admin productos", sub: "Gestión exclusiva", ruta: "/admin-productos", destacada: true },
  ];

  return (
    <main className="admin-page">
      <div className="container">
        <div className="welcome">
          <h1>¡Hola, {usuario?.nombre || "Usuaria"}!</h1>
          <p>Desde aquí gestionas tu tienda y tus compras.</p>
          <button className="btn btn-light btn-sm" style={{ marginTop: 18 }} onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <div className="dash-grid">
          {tarjetas.map((t) => (
            <button key={t.titulo} className={`dash-card ${t.destacada ? "featured" : ""}`} onClick={() => navigate(t.ruta)}>
              <div className="ico">{t.emoji}</div>
              <b>{t.titulo}</b>
              <span>{t.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
