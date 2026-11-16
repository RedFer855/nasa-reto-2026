import { buscarTodos } from '../../utilidades/dom.js';


export function crearProgreso(presentacion) {
  const enlaces = buscarTodos('[data-ir-a]');
  const etiquetasMundo = buscarTodos('[data-etiqueta-mundo]');

  enlaces.forEach((enlace) =>
    enlace.addEventListener('click', (evento) => {
      evento.preventDefault();
      presentacion.irA(Number(enlace.dataset.irA));
    }),
  );

  return {
    
    mostrarDiapositiva({ indice, id, tono }) {
      enlaces.forEach((enlace, i) => {
        if (i === indice) enlace.setAttribute('aria-current', 'step');
        else enlace.removeAttribute('aria-current');
      });
      document.documentElement.dataset.tono = tono;
      history.replaceState(null, '', `#${id}`);
    },
    mostrarMundo(mundo) {
      document.documentElement.dataset.mundo = mundo;
      etiquetasMundo.forEach((etiqueta) => etiqueta.classList.toggle('es-actual', etiqueta.dataset.etiquetaMundo === mundo));
    },
  };
}
