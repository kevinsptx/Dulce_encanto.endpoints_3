import { formatPrecio, onImgError, imagenProducto, respaldoProducto, DESCRIPCION_DEFECTO } from "../utils";

// Tarjeta de producto reutilizable (home y catálogo)
function CardProducto({ producto, onVer, onAgregar }) {
  const esTop = Number(producto.mas_vendido) === 1;
  return (
    <article className="prod-card">
      <button className="prod-media" onClick={() => onVer(producto)} aria-label={`Ver ${producto.nombre}`}>
        <img
          src={imagenProducto(producto)}
          data-fallback={respaldoProducto(producto)}
          alt={producto.nombre}
          loading="lazy"
          onError={onImgError}
        />
        {esTop && <span className="tag">Más vendido</span>}
        <span className="quick">Vista rápida</span>
      </button>
      <div className="prod-body">
        {producto.tipo_piel && <span className="prod-skin">Piel {producto.tipo_piel}</span>}
        <h3 className="prod-name">{producto.nombre}</h3>
        <p className="prod-desc">{producto.descripcion || DESCRIPCION_DEFECTO}</p>
        <div className="stars" aria-label="Calificación 4.8 de 5">★★★★★<small>4.8</small></div>
        <div className="prod-foot">
          <span className="price">{formatPrecio(producto.precio)}</span>
          <button className="btn btn-sm" onClick={() => onAgregar(producto)}>Añadir</button>
        </div>
      </div>
    </article>
  );
}

export default CardProducto;
