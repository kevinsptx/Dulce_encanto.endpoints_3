import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">Dulce <span>Encanto</span></div>
          <p>Maquillaje pensado para resaltar tu belleza natural, con fórmulas suaves, colores vibrantes y envíos a todo el país.</p>
        </div>
        <div>
          <h4>Tienda</h4>
          <ul>
            <li><Link to="/productos">Todos los productos</Link></li>
            <li><Link to="/productos?q=labial">Labiales</Link></li>
            <li><Link to="/productos?q=base">Rostro</Link></li>
            <li><Link to="/productos?q=sombra">Ojos</Link></li>
          </ul>
        </div>
        <div>
          <h4>Mi cuenta</h4>
          <ul>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/carrito">Mi carrito</Link></li>
          </ul>
        </div>
        <div>
          <h4>Síguenos</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Dulce Encanto · Todos los derechos reservados</span>
        <span>Pagos seguros · Envíos a toda Colombia</span>
      </div>
    </footer>
  );
}

export default Footer;
