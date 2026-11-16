export const EVENTOS = Object.freeze({
  
  CAMBIO_DIAPOSITIVA: 'presentacion:cambio',
});

export function emitir(nombre, detalle) {
  document.dispatchEvent(new CustomEvent(nombre, { detail: detalle }));
}


export function escuchar(nombre, manejador) {
  const oyente = (evento) => manejador(evento.detail);
  document.addEventListener(nombre, oyente);
  return () => document.removeEventListener(nombre, oyente);
}
