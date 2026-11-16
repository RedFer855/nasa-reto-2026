const SIGUIENTE = new Set(['ArrowDown', 'ArrowRight', 'PageDown']);
const ANTERIOR = new Set(['ArrowUp', 'ArrowLeft', 'PageUp']);

function esInteractivo(objetivo) {
  return objetivo instanceof HTMLElement && Boolean(objetivo.closest('input, textarea, select, button, [contenteditable="true"]'));
}


export function vincularTeclado(presentacion) {
  function alPresionarTecla(evento) {
    if (evento.defaultPrevented || evento.altKey || evento.ctrlKey || evento.metaKey) return;
    if (esInteractivo(evento.target)) return;

    const tecla = evento.key;
    if (SIGUIENTE.has(tecla) || (tecla === ' ' && !evento.shiftKey)) presentacion.siguiente();
    else if (ANTERIOR.has(tecla) || (tecla === ' ' && evento.shiftKey)) presentacion.anterior();
    else if (tecla === 'Home') presentacion.irA(0);
    else if (tecla === 'End') presentacion.irA(presentacion.total - 1);
    else return;

    evento.preventDefault();
  }

  window.addEventListener('keydown', alPresionarTecla);
  return () => window.removeEventListener('keydown', alPresionarTecla);
}
