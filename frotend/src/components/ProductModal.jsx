import {
  DESCRIPCION_DEFECTO,
  formatPrecio,
  imagenProducto,
  onImgError,
  respaldoProducto,
} from "../utils";

export default function ProductModal({
  producto,
  agregando,
  agregado,
  onAgregar,
  onCerrar,
}) {
  if (!producto) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${producto.nombre}`}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="modal-img">
          <img
            src={imagenProducto(producto)}
            data-fallback={respaldoProducto(producto)}
            alt={producto.nombre || "Producto de belleza"}
            onError={onImgError}
          />
        </div>

        <div className="modal-body">
          {producto.tipo_piel && (
            <span className="prod-skin">Piel {producto.tipo_piel}</span>
          )}

          <h2>{producto.nombre}</h2>

          <p className="modal-desc">
            {producto.descripcion || DESCRIPCION_DEFECTO}
          </p>

          <p className="modal-price">{formatPrecio(producto.precio)}</p>

          <div className="modal-actions">
            <button
              className="btn"
              type="button"
              onClick={onAgregar}
              disabled={agregando}
            >
              {agregando
                ? "Añadiendo..."
                : agregado
                  ? "Añadir otra unidad"
                  : "Añadir al carrito"}
            </button>

            <button
              className="btn btn-sm"
              type="button"
              onClick={onCerrar}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
