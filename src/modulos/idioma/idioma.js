import { buscarTodos } from '../../utilidades/dom.js';

export function vincularCambioIdioma(raiz = document) {
  buscarTodos('[data-cambio-idioma]', raiz).forEach((enlace) => {
    const ruta = new URL(enlace.getAttribute('href') ?? '/', location.href).pathname;
    const actualizar = () => enlace.setAttribute('href', ruta + location.hash);
    ['pointerdown', 'focus', 'click'].forEach((tipo) => enlace.addEventListener(tipo, actualizar));
  });
}
