import { buscarTodos } from '../../utilidades/dom.js';
import { emitir, EVENTOS } from '../../utilidades/eventos.js';
import { prefiereMovimientoReducido } from '../../utilidades/movimiento.js';

const FRANJA_CENTRAL = '-49% 0px -49% 0px';


export function crearPresentacion(raiz) {
  const diapositivas = buscarTodos('[data-diapositiva]', raiz);
  let indiceActivo = -1;

  function activar(indice) {
    if (indice === indiceActivo || !diapositivas[indice]) return;
    diapositivas[indiceActivo]?.classList.remove('esta-activa');
    indiceActivo = indice;
    const diapositiva = diapositivas[indice];
    diapositiva.classList.add('esta-activa', 'fue-vista');
    emitir(EVENTOS.CAMBIO_DIAPOSITIVA, {
      indice,
      total: diapositivas.length,
      id: diapositiva.id,
      mundo: diapositiva.dataset.mundo,
      tono: diapositiva.dataset.tono,
    });
  }

  
  
  const desdeHash = diapositivas.findIndex((d) => `#${d.id}` === window.location.hash);
  if (desdeHash > 0) diapositivas[desdeHash].scrollIntoView({ behavior: 'instant', block: 'start' });

  
  
  const observador = new IntersectionObserver(
    (entradas) => {
      const cruce = entradas.find((entrada) => entrada.isIntersecting);
      if (cruce) activar(diapositivas.indexOf( (cruce.target)));
    },
    { rootMargin: FRANJA_CENTRAL, threshold: 0 },
  );
  diapositivas.forEach((diapositiva) => observador.observe(diapositiva));

  function irA(indice) {
    const destino = diapositivas[Math.max(0, Math.min(diapositivas.length - 1, indice))];
    destino.scrollIntoView({ behavior: prefiereMovimientoReducido() ? 'auto' : 'smooth', block: 'start' });
  }

  activar(desdeHash >= 0 ? desdeHash : 0);

  return {
    get indice() {
      return indiceActivo;
    },
    get total() {
      return diapositivas.length;
    },
    irA,
    siguiente: () => irA(indiceActivo + 1),
    anterior: () => irA(indiceActivo - 1),
    destruir: () => observador.disconnect(),
  };
}
