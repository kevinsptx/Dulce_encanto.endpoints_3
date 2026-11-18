import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CardProducto from "../components/cardproducto";
import ProductModal from "../components/ProductModal";
import useAgregar from "../useAgregar";
import { guardarImagenes, normalizarLista, onImgError } from "../utils";

const API = "/api/productos";

// Imágenes de la tienda (las mismas que ya usabas)
const IMG = {
  heroA: "https://i.pinimg.com/736x/54/eb/02/54eb02aef7767c9d190e0ca9edbe95df.jpg",
  heroB: "https://i.pinimg.com/1200x/6b/d1/a5/6bd1a5ceaac536db2c7fc0f5c4a53921.jpg",
  c1: "https://i.pinimg.com/1200x/6b/d1/a5/6bd1a5ceaac536db2c7fc0f5c4a53921.jpg",
  c2: "https://i.pinimg.com/1200x/ad/17/da/ad17da15ad94e5770d0111942a33a0bc.jpg",
  c3: "https://i.pinimg.com/1200x/0f/42/4d/0f424dc30acf7577a13e864829b7f3b1.jpg",
  c4: "https://i.pinimg.com/736x/54/eb/02/54eb02aef7767c9d190e0ca9edbe95df.jpg",
};

const CATEGORIAS = [
  { t: "Labios", q: "labial", img: IMG.c1 },
  { t: "Rostro", q: "base", img: IMG.c2 },
  { t: "Ojos", q: "sombra", img: IMG.c3 },
  { t: "Todo el catálogo", q: "", img: IMG.c4 },
];

const TESTIMONIOS = [
  { n: "Laura G.", t: "Los colores son hermosos y duran todo el dÃ­a. Mi labial favorito, sin duda." },
  { n: "Camila R.", t: "Llegó rápido y bien empacado. La base se ve natural y suave en mi piel." },
  { n: "Valentina M.", t: "Por fin encontré maquillaje que respeta mi piel sensible. ¡Lo recomiendo!" },
];

function Seccion({ eyebrow, titulo, lista, to, onVer, onAgregar }) {
  if (!lista.length) return null;
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="h2">{titulo}</h2>
          </div>
          <Link to={to} className="link-more">Ver todos →</Link>
        </div>
        <div className="prod-grid">
          {lista.map((p) => <CardProducto key={p.id_producto} producto={p} onVer={onVer} onAgregar={onAgregar} />)}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [vendidos, setVendidos] = useState([]);
  const [nuevos, setNuevos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [correo, setCorreo] = useState("");
  const [suscrito, setSuscrito] = useState(false);
  const { agregar, agregando, agregado, setAgregado, aviso } = useAgregar();

  useEffect(() => {
    (async () => {
      try {
        const [todos, top, nue] = await Promise.allSettled([
          axios.get(API),
          axios.get(`${API}/mas-vendidos`),
          axios.get(`${API}/nuevos`),
        ]);
        const lt = todos.status === "fulfilled" ? normalizarLista(todos.value.data) : [];
        const lv = top.status === "fulfilled" ? normalizarLista(top.value.data) : [];
        const ln = nue.status === "fulfilled" ? normalizarLista(nue.value.data) : [];
        guardarImagenes([...lt, ...lv, ...ln]);
        setVendidos((lv.length ? lv : lt).slice(0, 4));
        setNuevos((ln.length ? ln : lt.slice().reverse()).slice(0, 4));
      } catch (e) { console.error(e); }
    })();
  }, []);

  useEffect(() => { setAgregado(false); }, [seleccionado]);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-tag">Nueva colección 2026</span>
            <h1>Resalta tu <em>belleza</em> natural</h1>
            <p>Maquillaje suave, brillante y de larga duración, creado para realzar lo mejor de ti sin ocultar tu piel.</p>
            <div className="hero-cta">
              <button className="btn btn-dark" onClick={() => navigate("/productos")}>Comprar ahora</button>
              <button className="btn btn-outline" onClick={() => navigate("/productos?top=1")}>Ver más vendidos</button>
            </div>
            <div className="hero-stats">
              <div><strong>+5.000</strong><span>clientas felices</span></div>
              <div><strong>4.8★</strong><span>calificación media</span></div>
              <div><strong>100%</strong><span>pago seguro</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-photo a" src={IMG.heroA} alt="Maquillaje Dulce Encanto" onError={onImgError} />
            <img className="hero-photo b" src={IMG.heroB} alt="Productos de belleza" onError={onImgError} />
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="benefits">
        <div className="container benefits-grid">
          <div className="benefit"><div className="ico">{"\u{1F69A}"}</div><div><b>Env\u00EDo a todo el pa\u00EDs</b><small>Gratis desde $150.000</small></div></div>
          <div className="benefit"><div className="ico">{"\u{1F512}"}</div><div><b>Pago 100% seguro</b><small>Tus datos protegidos</small></div></div>
          <div className="benefit"><div className="ico">{"\u{1F33F}"}</div><div><b>F\u00F3rmulas suaves</b><small>Cuidan tu piel</small></div></div>
          <div className="benefit"><div className="ico">{"\u{1F4AC}"}</div><div><b>Atenci\u00F3n cercana</b><small>Te asesoramos por WhatsApp</small></div></div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Explora</p>
              <h2 className="h2">Compra por categorÃ­a</h2>
            </div>
          </div>
          <div className="cat-grid">
            {CATEGORIAS.map((c) => (
              <button key={c.t} className="cat-card" onClick={() => navigate(c.q ? `/productos?q=${c.q}` : "/productos")}>
                <img src={c.img} alt="" loading="lazy" onError={onImgError} />
                <div className="cat-info"><h3>{c.t}</h3><span>Ver productos →</span></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Seccion eyebrow="Favoritos" titulo="Los más vendidos" lista={vendidos} to="/productos?top=1" onVer={setSeleccionado} onAgregar={agregar} />

      {/* PROMO */}
      <section className="container">
        <div className="promo">
          <div className="promo-text">
            <p className="eyebrow">Dulce Encanto</p>
            <h2>Tu piel ya es hermosa, nosotros la hacemos brillar un poco más ✨</h2>
            <p>Descubre una forma diferente de maquillarte, donde la suavidad, el brillo natural y el cuidado se unen.</p>
            <button className="btn btn-light" onClick={() => navigate("/productos")}>Descubrir productos</button>
          </div>
          <img src={IMG.heroA} alt="Belleza natural" loading="lazy" onError={onImgError} />
        </div>
      </section>

      <Seccion eyebrow="Recién llegados" titulo="Novedades" lista={nuevos} to="/productos" onVer={setSeleccionado} onAgregar={agregar} />

      {/* TESTIMONIOS */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">Opiniones</p><h2 className="h2">Lo que dicen nuestras clientas</h2></div></div>
          <div className="testi-grid">
            {TESTIMONIOS.map((t) => (
              <div key={t.n} className="testi">
                <div className="stars">★★★★★</div>
                <p>“{t.t}”</p>
                <b>{t.n}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="news">
        <div className="container news-inner">
          <div>
            <p className="eyebrow">Ãšnete</p>
            <h2 className="h2">Recibe ofertas y lanzamientos</h2>
          </div>
          <form className="news-form" onSubmit={(e) => { e.preventDefault(); if (correo) setSuscrito(true); }}>
            {suscrito ? <b>¡Gracias por suscribirte! ðŸ’–</b> : (
              <>
                <input type="email" required placeholder="Tu correo electrÃ³nico" value={correo} onChange={(e) => setCorreo(e.target.value)} aria-label="Correo" />
                <button className="btn" type="submit">Suscribirme</button>
              </>
            )}
          </form>
        </div>
      </section>

      {seleccionado && (
        <ProductModal producto={seleccionado} agregando={agregando} agregado={agregado}
          onAgregar={() => agregar(seleccionado)} onCerrar={() => setSeleccionado(null)} />
      )}
      {aviso && <div className="toast" role="status">{aviso}</div>}
    </main>
  );
}

export default HomePage;

