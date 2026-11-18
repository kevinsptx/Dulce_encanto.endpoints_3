import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_CARRITO = "/api/carrito";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(0);

  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  // Contador del carrito (misma lógica de datos que CarritoPage)
  const contar = async () => {
    try {
      const u = JSON.parse(localStorage.getItem("usuario") || "{}");
      if (u?.id) {
        const res = await axios.get(`${API_CARRITO}/${u.id}`);
        const items = res.data.data || [];
        setCantidad(items.reduce((s, i) => s + Number(i.cantidad || 0), 0));
      } else {
        const local = JSON.parse(localStorage.getItem("carrito_temp") || "[]");
        setCantidad(local.reduce((s, i) => s + Number(i.cantidad || 0), 0));
      }
    } catch {
      setCantidad(0);
    }
  };

  useEffect(() => {
    contar();
    window.addEventListener("carrito:actualizado", contar);
    return () => window.removeEventListener("carrito:actualizado", contar);
  }, [location.pathname]);

  useEffect(() => setAbierto(false), [location.pathname]);

  const buscar = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/productos?q=${encodeURIComponent(q.trim())}` : "/productos");
  };

  const cls = ({ isActive }) => (isActive ? "active" : "");

  return (
    <>
      <div className="topbar">
        Envi­o gratis en compras superiores a <b>$150.000</b> Paga seguro en linea
      </div>
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="logo">Dulce <span>Encanto</span></Link>

          <nav className={`nav-links ${abierto ? "open" : ""}`} aria-label="Principal">
            <NavLink to="/" end className={cls}>Inicio</NavLink>
            <NavLink to="/productos" className={cls}>Productos</NavLink>
            <Link to="/productos?top=1">Mas vendidos</Link>
            <NavLink to="/carrito" className={cls}>Carrito</NavLink>
          </nav>

          <form className="nav-search" onSubmit={buscar} role="search">
            <input
              type="search"
              placeholder="Buscar labiales, bases, sombrasâ€¦"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit" aria-label="Buscar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            </button>
          </form>

          <div className="nav-actions">
            <Link to={token ? "/dashboard" : "/login"} className="icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>
              <span className="lbl">{token ? (usuario?.nombre?.split(" ")[0] || "Mi cuenta") : "Ingresar"}</span>
            </Link>
            <Link to="/carrito" className="icon-btn" aria-label="Carrito">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1 12H7L6 7z" /><path d="M9 7a3 3 0 016 0" /></svg>
              <span className="lbl">Carrito</span>
              {cantidad > 0 && <span className="badge">{cantidad}</span>}
            </Link>
            <button className="menu-toggle" onClick={() => setAbierto(!abierto)} aria-label="MenÃº">â˜°</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;

