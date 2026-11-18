import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import CardProducto from "../components/cardproducto";
import ProductModal from "../components/ProductModal";
import useAgregar from "../useAgregar";
import { guardarImagenes, normalizarLista } from "../utils";

const API_PRODUCTOS = "/api/productos";

function Productos() {
  const [params, setParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const [piel, setPiel] = useState("todas");
  const [orden, setOrden] = useState("relevancia");

  const q = params.get("q") || "";
  const soloTop = params.get("top") === "1";
  const { agregar, agregando, agregado, setAgregado, aviso } = useAgregar();

  useEffect(() => { obtenerProductos(); }, []);
  useEffect(() => { setAgregado(false); }, [seleccionado]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(API_PRODUCTOS);
      const lista = normalizarLista(response.data);
      if (!lista.length && !Array.isArray(response.data)) console.error("La API no devolviÃ³ un array");
      setProductos(lista);
      guardarImagenes(lista);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const pieles = useMemo(
    () => [...new Set(productos.map((p) => p.tipo_piel).filter(Boolean))],
    [productos]
  );

  const visibles = useMemo(() => {
    let l = productos.filter((p) => {
      const t = q.toLowerCase();
      const okQ = !t || `${p.nombre} ${p.descripcion || ""} ${p.tipo_piel || ""}`.toLowerCase().includes(t);
      const okP = piel === "todas" || p.tipo_piel === piel;
      const okT = !soloTop || Number(p.mas_vendido) === 1;
      return okQ && okP && okT;
    });
    if (orden === "menor") l = [...l].sort((a, b) => a.precio - b.precio);
    if (orden === "mayor") l = [...l].sort((a, b) => b.precio - a.precio);
    if (orden === "az") l = [...l].sort((a, b) => a.nombre.localeCompare(b.nombre));
    return l;
  }, [productos, q, piel, orden, soloTop]);

  const setQ = (v) => {
    const n = new URLSearchParams(params);
    v ? n.set("q", v) : n.delete("q");
    setParams(n, { replace: true });
  };
  const setTop = (v) => {
    const n = new URLSearchParams(params);
    v ? n.set("top", "1") : n.delete("top");
    setParams(n, { replace: true });
  };

  return (
    <main>
      <section className="page-head">
        <div className="container">
          <div className="crumbs"><Link to="/">Inicio</Link> / Productos</div>
          <h1>{soloTop ? "Los mÃ¡s vendidos" : "Nuestros productos"}</h1>
          <p>Descubre maquillaje diseñado para resaltar tu belleza. Filtra por tipo de piel, busca por nombre y encuentra tu favorito.</p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="toolbar">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
            <input type="search" placeholder="Buscar por nombre o descripción" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar" />
          </div>
          <select className="select" value={orden} onChange={(e) => setOrden(e.target.value)} aria-label="Ordenar">
            <option value="relevancia">Ordenar: destacados</option>
            <option value="menor">Precio: categoria</option>
            <option value="mayor">Precio: Tonos</option>
            <option value="az">Tipo de piel</option>
            <option value="marca">Marca</option>
          </select>
        </div>

        <div className="chips" role="group" aria-label="Filtros">
          <button className={`chip ${!soloTop && piel === "todas" ? "on" : ""}`} onClick={() => { setPiel("todas"); setTop(false); }}>Todos</button>
          <button className={`chip ${soloTop ? "on" : ""}`} onClick={() => setTop(!soloTop)}> Mas vendidos</button>
          {pieles.map((p) => (
            <button key={p} className={`chip ${piel === p ? "on" : ""}`} onClick={() => setPiel(piel === p ? "todas" : p)}>
              Piel {p}
            </button>
          ))}
        </div>

        <p className="result-count">{cargando ? "Cargando" : `${visibles.length} producto${visibles.length !== 1 ? "s" : ""}`}</p>

        {cargando ? (
          <div className="prod-grid">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" />)}</div>
        ) : visibles.length > 0 ? (
          <div className="prod-grid">
            {visibles.map((p) => (
              <CardProducto key={p.id_producto} producto={p} onVer={setSeleccionado} onAgregar={agregar} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h3>No encontramos productos</h3>
            <p>Prueba con otra palabra o quita los filtros.</p>
            <button className="btn" onClick={() => { setQ(""); setPiel("todas"); setTop(false); }}>Limpiar filtros</button>
          </div>
        )}
      </div>

      {seleccionado && (
        <ProductModal
          producto={seleccionado}
          agregando={agregando}
          agregado={agregado}
          onAgregar={() => agregar(seleccionado)}
          onCerrar={() => setSeleccionado(null)}
        />
      )}
      {aviso && <div className="toast" role="status">{aviso}</div>}
    </main>
  );
}

export default Productos;

