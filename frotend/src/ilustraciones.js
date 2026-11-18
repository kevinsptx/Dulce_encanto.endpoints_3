// Imágenes automáticas por tipo de producto (SVG propio, funcionan sin internet).
// Se usan solo cuando el producto no tiene foto en la columna `img` (o la URL falla).

const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const TIPOS = [
  ["gloss", /gloss|brillo labial|lip oil|aceite labial/],
  ["labial", /labial|lipstick|barra de labios|tinta|lip tint|bala/],
  ["mascara", /mascara de pest|pestan|rimel|mascara/],
  ["delineador", /delineador|lapiz|eyeliner|cejas|ceja|perfilador/],
  ["sombra", /sombra|paleta|palette/],
  ["rubor", /rubor|blush|colorete|bronzer|bronceador|polvo|iluminador en polvo|compacto|contorno/],
  ["base", /base|corrector|serum|primer|prebase|bb cream|cc cream|fluida|liquid|iluminador|fijador|spray/],
  ["esmalte", /esmalte|unas|uñas|nail/],
  ["crema", /crema|hidratante|mascarilla|balsamo|protector|bloqueador|exfoliante|mantequilla/],
  ["perfume", /perfume|fragancia|colonia|splash|body mist/],
];

// Colores según palabras del nombre; si no, se elige uno estable por nombre
const COLORES = [
  [/rojo|cereza|rubi|cherry/, "#c0152f"],
  [/vino|burgundy|borgona|granate|ciruela/, "#7a1840"],
  [/coral|durazno|melocoton|peach|naranja/, "#ee6f57"],
  [/nude|natural|beige|arena|canela|caramelo|marron|cafe|chocolate/, "#b9795a"],
  [/rosa|rose|pink|fucsia|magenta|chicle/, "#e0457b"],
  [/morado|lila|violeta|purpura|lavanda/, "#8e4bb0"],
  [/dorado|oro|gold|champan|bronce/, "#d4a64a"],
  [/azul|celeste|turquesa/, "#3b78c4"],
  [/verde|menta/, "#2f9c74"],
  [/negro|black/, "#231a26"],
  [/blanco|perla|nacar/, "#e9dfe6"],
];
const PALETA = ["#d6246e", "#c0152f", "#e0457b", "#ee6f57", "#b9795a", "#8e4bb0", "#7a1840", "#d4a64a"];

const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
const mezclar = (hex, t, con = "#ffffff") => {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex), b = p(con);
  return "#" + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

export const tipoDe = (nombre) => {
  const n = norm(nombre);
  for (const [tipo, re] of TIPOS) if (re.test(n)) return tipo;
  return "labial";
};

const colorDe = (nombre) => {
  const n = norm(nombre);
  for (const [re, c] of COLORES) if (re.test(n)) return c;
  return PALETA[hash(n) % PALETA.length];
};

const DIBUJOS = {
  labial: (c) => `
    <rect x="262" y="330" width="76" height="150" rx="10" fill="#2a1230"/>
    <rect x="262" y="330" width="76" height="22" fill="#d4a64a"/>
    <rect x="270" y="262" width="60" height="74" rx="6" fill="#d9d2d6"/>
    <path d="M272 270V190q0-18 14-26l30 22q14 10 14 26v58z" fill="${c}"/>
    <path d="M286 272v-82q0-12 8-18" stroke="#fff" stroke-opacity=".35" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  gloss: (c) => `
    <rect x="272" y="150" width="56" height="150" rx="14" fill="#2a1230"/>
    <rect x="262" y="290" width="76" height="190" rx="22" fill="${mezclar(c, .15)}" fill-opacity=".92"/>
    <rect x="262" y="290" width="76" height="190" rx="22" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="4"/>
    <path d="M280 310v140" stroke="#fff" stroke-opacity=".5" stroke-width="8" stroke-linecap="round"/>`,
  base: (c) => `
    <rect x="285" y="120" width="30" height="40" rx="6" fill="#2a1230"/>
    <rect x="262" y="155" width="76" height="40" rx="8" fill="#d4a64a"/>
    <rect x="240" y="190" width="120" height="290" rx="22" fill="${mezclar(c, .25, "#f3d9c4")}"/>
    <rect x="240" y="190" width="120" height="290" rx="22" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="4"/>
    <rect x="262" y="270" width="76" height="110" rx="8" fill="#fff" fill-opacity=".85"/>
    <path d="M276 300h48M276 322h34" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  sombra: (c) => {
    const tonos = [mezclar(c, .55), c, mezclar(c, .25, "#2a1230"), "#d4a64a", mezclar(c, .75), mezclar(c, .45, "#2a1230")];
    return `<rect x="140" y="190" width="320" height="230" rx="22" fill="#2a1230"/>
    <rect x="152" y="202" width="296" height="206" rx="16" fill="#3a2040"/>
    ${tonos.map((t, i) => `<circle cx="${204 + (i % 3) * 96}" cy="${252 + Math.floor(i / 3) * 96}" r="38" fill="${t}"/>`).join("")}
    <rect x="140" y="400" width="320" height="26" rx="10" fill="#d4a64a"/>`;
  },
  rubor: (c) => `
    <circle cx="300" cy="320" r="150" fill="#2a1230"/>
    <circle cx="300" cy="320" r="150" fill="none" stroke="#d4a64a" stroke-width="10"/>
    <circle cx="300" cy="320" r="112" fill="${c}"/>
    <circle cx="300" cy="320" r="112" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-dasharray="10 14"/>
    <ellipse cx="262" cy="276" rx="34" ry="18" fill="#fff" fill-opacity=".3" transform="rotate(-30 262 276)"/>`,
  mascara: (c) => `
    <rect x="276" y="110" width="48" height="190" rx="16" fill="#2a1230"/>
    <rect x="268" y="296" width="64" height="26" rx="6" fill="#d4a64a"/>
    <rect x="262" y="320" width="76" height="170" rx="18" fill="${mezclar(c, .1, "#2a1230")}"/>
    <path d="M282 345v120" stroke="#fff" stroke-opacity=".4" stroke-width="8" stroke-linecap="round"/>`,
  delineador: (c) => `
    <g transform="rotate(-38 300 300)">
      <rect x="110" y="270" width="300" height="60" rx="10" fill="${mezclar(c, .1, "#2a1230")}"/>
      <rect x="110" y="270" width="300" height="14" fill="#fff" fill-opacity=".25"/>
      <rect x="400" y="268" width="26" height="64" fill="#d4a64a"/>
      <path d="M110 270L40 300l70 30z" fill="#e9d3bf"/><path d="M62 291L40 300l22 9z" fill="#2a1230"/>
    </g>`,
  esmalte: (c) => `
    <rect x="268" y="110" width="64" height="150" rx="14" fill="#2a1230"/>
    <rect x="285" y="250" width="30" height="30" fill="#2a1230"/>
    <rect x="220" y="275" width="160" height="200" rx="30" fill="${c}"/>
    <rect x="220" y="275" width="160" height="200" rx="30" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/>
    <path d="M246 300v140" stroke="#fff" stroke-opacity=".45" stroke-width="10" stroke-linecap="round"/>`,
  crema: (c) => `
    <rect x="190" y="190" width="220" height="60" rx="14" fill="#2a1230"/>
    <rect x="200" y="245" width="200" height="220" rx="26" fill="${mezclar(c, .6)}"/>
    <rect x="200" y="245" width="200" height="220" rx="26" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4"/>
    <rect x="230" y="310" width="140" height="90" rx="10" fill="#fff" fill-opacity=".85"/>
    <path d="M250 340h100M250 366h66" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`,
  perfume: (c) => `
    <rect x="270" y="120" width="60" height="60" rx="8" fill="#d4a64a"/>
    <rect x="282" y="175" width="36" height="34" fill="#2a1230"/>
    <rect x="200" y="205" width="200" height="270" rx="28" fill="${mezclar(c, .45)}" fill-opacity=".9"/>
    <rect x="200" y="205" width="200" height="270" rx="28" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="5"/>
    <rect x="240" y="300" width="120" height="70" rx="8" fill="#fff" fill-opacity=".85"/>
    <path d="M222 235v200" stroke="#fff" stroke-opacity=".5" stroke-width="9" stroke-linecap="round"/>`,
};

const cache = new Map();

export const ilustracion = (nombre = "") => {
  if (cache.has(nombre)) return cache.get(nombre);
  const tipo = tipoDe(nombre);
  const c = colorDe(nombre);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'>
    <defs>
      <radialGradient id='bg' cx='.5' cy='.35' r='.85'><stop offset='0' stop-color='${mezclar(c, .88)}'/><stop offset='1' stop-color='${mezclar(c, .62)}'/></radialGradient>
      <filter id='sh' x='-30%' y='-30%' width='160%' height='160%'><feDropShadow dx='0' dy='18' stdDeviation='16' flood-color='#2a1230' flood-opacity='.28'/></filter>
    </defs>
    <rect width='600' height='600' fill='url(#bg)'/>
    <circle cx='500' cy='110' r='90' fill='#fff' fill-opacity='.18'/><circle cx='90' cy='520' r='120' fill='#fff' fill-opacity='.14'/>
    <ellipse cx='300' cy='500' rx='150' ry='16' fill='#2a1230' fill-opacity='.14'/>
    <g filter='url(#sh)'>${DIBUJOS[tipo](c)}</g>
  </svg>`;
  const url = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  cache.set(nombre, url);
  return url;
};
