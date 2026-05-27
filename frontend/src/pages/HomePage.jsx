import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero_contenido">
        </div>
      </section>

      {/* CARDS */}
      <div className="cards">
        <h2 className="segundo_titulo">
          Categorías
        </h2>

        <nav className="contenedor_cards">

          {/* PRODUCTOS */}
          <button
            className="categoria_card"
            onClick={() =>
              navigate("/productos")
            }
          >
            <h3 className="enlace">
              Productos
            </h3>

            <img
              src="https://i.pinimg.com/1200x/6b/d1/a5/6bd1a5ceaac536db2c7fc0f5c4a53921.jpg"
              className="img_index"
            />
          </button>

          {/* LOGIN */}
          <button
            className="categoria_card"
            onClick={() =>
              navigate("/login")
            }
          >
            <h3 className="enlace">
              Login
            </h3>

            <img
              src="https://i.pinimg.com/1200x/ad/17/da/ad17da15ad94e5770d0111942a33a0bc.jpg"
              className="img_index"
            />
          </button>

          {/* CARRITO */}
          <button
            className="categoria_card"
            onClick={() =>
              navigate("/carrito")
            }
          >
            <h3 className="enlace">
              Carrito
            </h3>

            <img
              src="https://i.pinimg.com/1200x/0f/42/4d/0f424dc30acf7577a13e864829b7f3b1.jpg"
              className="img_index"
            />
          </button>

        </nav>
      </div>

      {/* INFO */}
      <section className="info">
        <div className="contenedor_info">
          <h2 className="titulo_2">
            Resalta tu belleza con
            Dulce Encanto
          </h2>

          <p className="texto_2">
            En Dulce Encanto creemos
            que tu piel cuenta una
            historia única, y nuestro
            maquillaje está diseñado
            para realzarla, no
            ocultarla. Descubre una
            forma diferente de
            maquillarte, donde la
            suavidad, el brillo natural
            y el cuidado se unen para
            resaltar lo mejor de ti.
          </p>
        </div>
      </section>

      {/* FRASE FINAL */}
      <section className="info_2">
        <img
          src="https://i.pinimg.com/736x/54/eb/02/54eb02aef7767c9d190e0ca9edbe95df.jpg"
          className="img_belleza"
        />

        <div className="texto_3">
          <p>
            Tu piel ya es hermosa,
            nosotros solo la hacemos
            brillar un poco más ✨
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;