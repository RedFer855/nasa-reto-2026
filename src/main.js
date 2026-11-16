import './estilos/principal.less';

import { mundos as mundosEs } from './contenido/es/sitio.js';
import { mundos as mundosEn } from './contenido/en/sitio.js';
import { interfaz as interfazEs } from './contenido/es/interfaz.js';
import { interfaz as interfazEn } from './contenido/en/interfaz.js';
import { buscar } from './utilidades/dom.js';
import { escuchar, EVENTOS } from './utilidades/eventos.js';
import { prefiereMovimientoReducido, alCambiarMovimientoReducido } from './utilidades/movimiento.js';
import { seguirPuntero } from './utilidades/puntero.js';
import { crearTerreno } from './modulos/terreno/renderizador-terreno.js';
import { usarFondoEstatico } from './modulos/terreno/respaldo.js';
import { crearSonda } from './modulos/sonda/sonda.js';
import { crearPresentacion } from './modulos/presentacion/presentacion.js';
import { vincularTeclado } from './modulos/presentacion/teclado.js';
import { crearProgreso } from './modulos/presentacion/progreso.js';
import { vincularCambioIdioma } from './modulos/idioma/idioma.js';


const enIngles = document.documentElement.lang === 'en';
const textos = { mundos: enIngles ? mundosEn : mundosEs, interfaz: enIngles ? interfazEn : interfazEs };
vincularCambioIdioma();


const lienzo =  (buscar('[data-terreno]'));
const terreno = crearTerreno(lienzo, {
  movimientoReducido: prefiereMovimientoReducido(),
  alFallar: () => usarFondoEstatico(lienzo),
});
if (!terreno) usarFondoEstatico(lienzo);
alCambiarMovimientoReducido((reducido) => terreno?.fijarMovimientoReducido(reducido));


const sonda = crearSonda( (buscar('[data-sonda]')), {
  etiquetasMundo: textos.mundos,
  puntos: textos.interfaz.sonda.puntos,
});
seguirPuntero((puntero) => {
  terreno?.fijarPuntero(puntero);
  sonda.actualizar(puntero);
});


let progreso;
function mostrarMundo(mundo) {
  terreno?.fijarMundo(mundo);
  sonda.fijarMundo(mundo);
  progreso?.mostrarMundo(mundo);
}

const raizPresentacion =  (buscar('[data-presentacion]'));
escuchar(EVENTOS.CAMBIO_DIAPOSITIVA, (diapositiva) => {
  progreso?.mostrarDiapositiva(diapositiva);
  mostrarMundo(diapositiva.mundo);
});


const presentacion = crearPresentacion(raizPresentacion);
progreso = crearProgreso(presentacion);
const primera = raizPresentacion.querySelectorAll('[data-diapositiva]')[presentacion.indice];
progreso.mostrarDiapositiva({ indice: presentacion.indice, id: primera.id, tono: primera.dataset.tono });
progreso.mostrarMundo(primera.dataset.mundo);
vincularTeclado(presentacion);

document.documentElement.classList.add('esta-listo');
