function CardProducto({ nombre, precio, imagen }) {

  return (

    <div className="card-producto">

      <img src={imagen} alt={nombre} />

      <h2>{nombre}</h2>

      <p>{precio}</p>

      <button>
        Comprar 💕
      </button>

    </div>

  );
}

export default CardProducto;