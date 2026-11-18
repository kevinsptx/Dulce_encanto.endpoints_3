export const DESCRIPCION_DEFECTO =
  "Descubre un producto ideal para complementar tu rutina de belleza.";

export function formatPrecio(valor) {
  const precio = Number(valor) || 0;
  return precio.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export function normalizarLista(respuesta) {
  if (Array.isArray(respuesta)) return respuesta;
  if (Array.isArray(respuesta?.data)) return respuesta.data;
  if (Array.isArray(respuesta?.productos)) return respuesta.productos;
  if (Array.isArray(respuesta?.data?.productos)) return respuesta.data.productos;
  return [];
}

export function imagenProducto(producto) {
  return (
    producto?.img ||
    producto?.imagen ||
    producto?.url_imagen ||
    producto?.imagen_url ||
    producto?.foto ||
    ""
  );
}

export function respaldoProducto(producto) {
  return (
    producto?.img ||
    producto?.imagen ||
    producto?.url_imagen ||
    producto?.imagen_url ||
    ""
  );
}

export function imagenDe(producto) {
  return imagenProducto(producto);
}

export function ilustracionDe(producto) {
  return imagenProducto(producto);
}

export function onImgError(evento) {
  const imagen = evento.currentTarget;
  const respaldo = imagen.dataset.fallback;

  if (respaldo && imagen.src !== respaldo) {
    imagen.src = respaldo;
    imagen.dataset.fallback = "";
    return;
  }

  imagen.onerror = null;
  imagen.style.visibility = "hidden";
}

export function guardarImagenes(productos) {
  return productos;
}

export function avisarCarrito() {
  window.dispatchEvent(new Event("carrito-actualizado"));
}
