import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const inicial = usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const tarjetas = [
    { emoji: "📦", titulo: "Productos",       sub: "Ver catálogo",       ruta: "/productos"       },
    { emoji: "👥", titulo: "Clientes",        sub: "Añadir · Eliminar",  ruta: "/clientes"        },
    { emoji: "🛒", titulo: "Carrito",         sub: "Ver pedidos",        ruta: "/carrito"         },
    { emoji: "🔐", titulo: "Admin Productos", sub: "Gestión exclusiva",  ruta: "/admin-productos", destacada: true },
  ];

  return (
    <div style={s.page}>

      {/* NAVBAR */}
      <nav style={s.nav}>
        <span style={s.logo}>🌸 Dulce Encanto</span>
        <div style={s.navRight}>
          <span style={s.saludo}>
            Hola, <strong style={{ color: "#f5478f" }}>{usuario?.nombre || "Usuaria"}</strong> 💕
          </span>
          <div style={s.avatar}>{inicial}</div>
          <button style={s.btnSalir} onClick={handleLogout}>Salir</button>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div style={s.contenido}>

        <div style={s.bienvenida}>
          <h2 style={s.bienvenidaTitulo}>¡Bienvenida de vuelta! 🌸</h2>
          <p style={s.bienvenidaSub}>Desde aquí gestionas todo tu negocio con amor.</p>
        </div>

        <div style={s.grid}>
          {tarjetas.map((t) => (
            <div
              key={t.titulo}
              style={t.destacada ? { ...s.tarjeta, ...s.tarjetaDestacada } : s.tarjeta}
              onClick={() => t.ruta && navigate(t.ruta)}
            >
              <div style={s.emoji}>{t.emoji}</div>
              <div style={{ ...s.tarjetaTitulo, color: t.destacada ? "#f5478f" : "#444" }}>
                {t.titulo}
              </div>
              <div style={{ ...s.tarjetaSub, color: t.destacada ? "#f5478f" : "#ccc", opacity: t.destacada ? 0.7 : 1 }}>
                {t.sub}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#fff0f6",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    background: "#fff",
    padding: "14px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ffc2da",
  },
  logo: {
    color: "#f5478f",
    fontSize: "22px",
    fontWeight: "700",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  saludo: {
    fontSize: "13px",
    color: "#aaa",
  },
  avatar: {
    width: "34px",
    height: "34px",
    background: "#ffeaf4",
    border: "1.5px solid #ffc2da",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    color: "#f5478f",
  },
  btnSalir: {
    padding: "6px 14px",
    background: "transparent",
    border: "1px solid #ffc2da",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#f5478f",
    cursor: "pointer",
  },
  contenido: {
    padding: "28px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  bienvenida: {
    background: "#fff",
    borderRadius: "20px",
    padding: "22px 26px",
    border: "1px solid #ffc2da",
    marginBottom: "24px",
  },
  bienvenidaTitulo: {
    margin: "0 0 4px",
    color: "#f5478f",
    fontSize: "20px",
  },
  bienvenidaSub: {
    margin: "0",
    color: "#bbb",
    fontSize: "13px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
  },
  tarjeta: {
    background: "#fff",
    borderRadius: "18px",
    padding: "22px 20px",
    border: "1px solid #ffc2da",
    cursor: "pointer",
  },
  tarjetaDestacada: {
    background: "#ffeaf4",
    border: "2px solid #f5478f",
    cursor: "pointer",
  },
  emoji: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  tarjetaTitulo: {
    fontWeight: "700",
    fontSize: "15px",
    marginBottom: "4px",
  },
  tarjetaSub: {
    fontSize: "12px",
  },
};

export default DashboardPage;