const consulta = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export const prefiereMovimientoReducido = () => Boolean(consulta?.matches);


export function alCambiarMovimientoReducido(manejador) {
  consulta?.addEventListener('change', (evento) => manejador(evento.matches));
}
