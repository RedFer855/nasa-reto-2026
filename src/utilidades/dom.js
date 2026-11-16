export const buscar = (selector, raiz = document) => raiz.querySelector(selector);


export const buscarTodos = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];


export const variableCss = (nombre, elemento = document.documentElement) =>
  getComputedStyle(elemento).getPropertyValue(nombre).trim();

const formateadores = new Map();
const idiomaDocumento = () => (typeof document === 'undefined' ? 'es' : document.documentElement.lang || 'es');


export function formatearNumero(valor, decimales = 2, locale = idiomaDocumento()) {
  const clave = `${locale}|${decimales}`;
  if (!formateadores.has(clave)) {
    formateadores.set(
      clave,
      new Intl.NumberFormat(locale, { minimumFractionDigits: decimales, maximumFractionDigits: decimales }),
    );
  }
  return formateadores.get(clave).format(valor);
}
