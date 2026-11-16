export function seguirPuntero(manejador) {
  const mover = (evento) => manejador({ x: evento.clientX, y: evento.clientY, activo: true });
  const salir = () => manejador({ x: -1, y: -1, activo: false });

  window.addEventListener('pointermove', mover, { passive: true });
  window.addEventListener('pointerdown', mover, { passive: true });
  document.documentElement.addEventListener('pointerleave', salir);
  window.addEventListener('blur', salir);

  return () => {
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerdown', mover);
    document.documentElement.removeEventListener('pointerleave', salir);
    window.removeEventListener('blur', salir);
  };
}
