import { Routes, Route } from "react-router-dom";

import HomePage           from "./pages/HomePage";
import ProductosPage      from "./pages/ProductosPage";
import ClientesPage       from "./pages/ClientesPage";
import LoginPage          from "./pages/LoginPage";
import CarritoPage        from "./pages/CarritoPage";
import DashboardPage      from "./pages/DashboardPage";
import AdminProductosPage from "./pages/AdminProductosPage"; // ← NUEVA

import PrivateRoute from "./components/PrivateRoute";
import Navbar       from "./components/navbar";
import Footer       from "./components/footer";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* ── Rutas públicas ─────────────────────────── */}
        <Route path="/"          element={<HomePage />}      />
        <Route path="/productos" element={<ProductosPage />} />
        <Route path="/clientes"  element={<ClientesPage />}  />
        <Route path="/login"     element={<LoginPage />}     />
        <Route path="/carrito"   element={<CarritoPage />}   />

        {/* ── Rutas protegidas por token ──────────────── */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* ── Admin de productos (contraseña propia) ──── */}
        <Route
          path="/admin-productos"
          element={
            <PrivateRoute>
              <AdminProductosPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;