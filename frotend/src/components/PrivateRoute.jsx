import { Navigate } from "react-router-dom";

// Componente que protege rutas privadas
// Si no hay token en localStorage, redirige al login
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;