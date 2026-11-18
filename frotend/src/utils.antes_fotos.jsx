import { ilustracion } from "./ilustraciones";

// Utilidades visuales compartidas (no tocan la API)

export const formatPrecio = (n) => "$" + Number(n || 0).toLocaleString("es-CO");

// Imagen de respaldo (SVG embebido, no depende de internet)
export const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#fde4ee'/><stop offset='1' stop-color='#f8c9dc'/></linearGradient></defs>
      <rect width='600' height='600' fill='url(#g)'/>
      <g fill='none' stroke='#c2185b' stroke-width='10' stroke-linecap='round' opacity='.55'>
        <rect x='255' y='230' width='90' height='200' rx='14'/><path d='M270 230v-70h60v70'/><path d='M285 160l15-45 15 45'/></g>
    </svg>`
  );

// Imagen del producto: su foto (img) o, si no tiene, una ilustración según su nombre
export const imagenProducto = (p) => (p?.img && String(p.img).trim()) || ilustracion(p?.nombre);
export const respaldoProducto = (p) => ilustracion(p?.nombre);

export const onImgError = (e) => {
  const el = e.currentTarget;
  el.onerror = null;
  el.src = el.dataset.fallback || PLACEHOLDER;
};

// Guarda img de cada producto para mostrarla también en el carrito
export const guardarImagenes = (productos) => {
  try {
    const mapa = JSON.parse(localStorage.getItem("img_cache") || "{}");
    productos.forEach((p) => { if (p.img) mapa[p.id_producto] = p.img; });
    localStorage.setItem("img_cache", JSON.stringify(mapa));
  } catch { /* sin cache */ }
};

export const imagenDe = (id) => {
  try { return JSON.parse(localStorage.getItem("img_cache") || "{}")[id] || ""; }
  catch { return ""; }
};

// Aviso global para refrescar el contador del carrito en el navbar
export const avisarCarrito = () => window.dispatchEvent(new Event("carrito:actualizado"));

export const DESCRIPCION_DEFECTO =
  "Fórmula cómoda de larga duración, pensada para realzar tu belleza natural con un acabado profesional.";

export const normalizarLista = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.productos)) return data.productos;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

export const ilustracionDe = (nombre) => ilustracion(nombre);
