import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
        Dulce Encanto ✨
      </h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;