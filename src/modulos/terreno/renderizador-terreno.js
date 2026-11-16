import fuenteVertices from './sombreadores/terreno.vert.glsl?raw';
import fuenteFragmentos from './sombreadores/terreno.frag.glsl?raw';
import { MUNDOS, MUNDO_PREDETERMINADO } from './mundos.js';
import { amortiguar, hexARgb } from '../../utilidades/matematica.js';
import { variableCss } from '../../utilidades/dom.js';

const PROPORCION_PIXEL_MAXIMA = 1.5;
const VELOCIDAD_TRANSICION = 2.4; 
const VELOCIDAD_SONDA = 6;
const VELOCIDAD_PUNTERO = 14;

const UNIFORMES = [
  'u_resolucion', 'u_puntero', 'u_sonda', 'u_tiempo', 'u_mundo',
  'u_fondo', 'u_lineaBaja', 'u_lineaAlta', 'u_alfaLinea',
];

function compilar(gl, tipo, fuente) {
  const sombreador = gl.createShader(tipo);
  gl.shaderSource(sombreador, fuente);
  gl.compileShader(sombreador);
  if (!gl.getShaderParameter(sombreador, gl.COMPILE_STATUS)) {
    const registro = gl.getShaderInfoLog(sombreador);
    gl.deleteShader(sombreador);
    throw new Error(`No compiló el sombreador del terreno: ${registro}`);
  }
  return sombreador;
}

function crearPrograma(gl) {
  const programa = gl.createProgram();
  gl.attachShader(programa, compilar(gl, gl.VERTEX_SHADER, fuenteVertices));
  gl.attachShader(programa, compilar(gl, gl.FRAGMENT_SHADER, fuenteFragmentos));
  gl.linkProgram(programa);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) {
    throw new Error(`No enlazó el programa del terreno: ${gl.getProgramInfoLog(programa)}`);
  }
  return programa;
}

function crearCuadro(gl, programa) {
  const bufer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const ubicacion = gl.getAttribLocation(programa, 'a_posicion');
  gl.enableVertexAttribArray(ubicacion);
  gl.vertexAttribPointer(ubicacion, 2, gl.FLOAT, false, 0, 0);
}

const color = (token) => hexARgb(variableCss(token) || '#000000');


function objetivosPara(idMundo) {
  const ajuste = MUNDOS[idMundo] ?? MUNDOS[MUNDO_PREDETERMINADO];
  return {
    mezcla: [...ajuste.mezcla],
    fondo: color(ajuste.fondo),
    lineaBaja: color(ajuste.lineaBaja),
    lineaAlta: color(ajuste.lineaAlta),
    alfaLinea: ajuste.alfaLinea,
  };
}

const amortiguarLista = (actual, objetivo, lambda, dt) => actual.map((v, i) => amortiguar(v, objetivo[i], lambda, dt));


export function crearTerreno(lienzo, opciones) {
  const gl = lienzo.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return null;

  let programa;
  try {
    programa = crearPrograma(gl);
  } catch (error) {
    console.error(error);
    return null;
  }

  gl.useProgram(programa);
  crearCuadro(gl, programa);
  const ubic = Object.fromEntries(UNIFORMES.map((nombre) => [nombre, gl.getUniformLocation(programa, nombre)]));

  let movimientoReducido = opciones.movimientoReducido;
  let objetivo = objetivosPara(MUNDO_PREDETERMINADO);
  let actual = structuredClone(objetivo);
  const puntero = { x: 0, y: 0, ox: 0, oy: 0, sonda: 0, sondaObjetivo: 0 };
  let escala = 1;
  let cuadro = 0;
  let ultimo = performance.now();
  let transcurrido = 0;
  let pendiente = true;

  function redimensionar() {
    escala = Math.min(window.devicePixelRatio || 1, PROPORCION_PIXEL_MAXIMA);
    const ancho = Math.max(1, Math.round(lienzo.clientWidth * escala));
    const alto = Math.max(1, Math.round(lienzo.clientHeight * escala));
    if (lienzo.width !== ancho || lienzo.height !== alto) {
      lienzo.width = ancho;
      lienzo.height = alto;
      gl.viewport(0, 0, ancho, alto);
      pendiente = true;
    }
  }

  function avanzar(dt) {
    const velocidad = movimientoReducido ? 1e3 : VELOCIDAD_TRANSICION;
    actual.mezcla = amortiguarLista(actual.mezcla, objetivo.mezcla, velocidad, dt);
    actual.fondo = amortiguarLista(actual.fondo, objetivo.fondo, velocidad, dt);
    actual.lineaBaja = amortiguarLista(actual.lineaBaja, objetivo.lineaBaja, velocidad, dt);
    actual.lineaAlta = amortiguarLista(actual.lineaAlta, objetivo.lineaAlta, velocidad, dt);
    actual.alfaLinea = amortiguar(actual.alfaLinea, objetivo.alfaLinea, velocidad, dt);
    puntero.sonda = amortiguar(puntero.sonda, puntero.sondaObjetivo, VELOCIDAD_SONDA, dt);
    puntero.x = amortiguar(puntero.x, puntero.ox, VELOCIDAD_PUNTERO, dt);
    puntero.y = amortiguar(puntero.y, puntero.oy, VELOCIDAD_PUNTERO, dt);
    if (!movimientoReducido) transcurrido += dt;
  }

  function estaQuieto() {
    const cerca = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 1e-3);
    return (
      cerca(actual.mezcla, objetivo.mezcla) &&
      cerca(actual.fondo, objetivo.fondo) &&
      Math.abs(puntero.sonda - puntero.sondaObjetivo) < 1e-3 &&
      Math.abs(puntero.x - puntero.ox) < 0.5 &&
      Math.abs(puntero.y - puntero.oy) < 0.5
    );
  }

  function dibujar() {
    gl.uniform2f(ubic.u_resolucion, lienzo.width, lienzo.height);
    gl.uniform2f(ubic.u_puntero, puntero.x * escala, lienzo.height - puntero.y * escala);
    gl.uniform1f(ubic.u_sonda, puntero.sonda);
    gl.uniform1f(ubic.u_tiempo, transcurrido);
    gl.uniform3fv(ubic.u_mundo, actual.mezcla);
    gl.uniform3fv(ubic.u_fondo, actual.fondo);
    gl.uniform3fv(ubic.u_lineaBaja, actual.lineaBaja);
    gl.uniform3fv(ubic.u_lineaAlta, actual.lineaAlta);
    gl.uniform1f(ubic.u_alfaLinea, actual.alfaLinea);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function tic(ahora) {
    const dt = Math.min((ahora - ultimo) / 1000, 0.1);
    ultimo = ahora;
    redimensionar();
    avanzar(dt);
    
    if (!movimientoReducido || pendiente || !estaQuieto()) {
      dibujar();
      pendiente = false;
    }
    cuadro = requestAnimationFrame(tic);
  }

  function iniciar() {
    if (cuadro) return;
    ultimo = performance.now();
    cuadro = requestAnimationFrame(tic);
  }

  function detener() {
    cancelAnimationFrame(cuadro);
    cuadro = 0;
  }

  const alCambiarVisibilidad = () => (document.hidden ? detener() : iniciar());
  const alPerderContexto = (evento) => {
    evento.preventDefault();
    detener();
    opciones.alFallar?.();
  };

  document.addEventListener('visibilitychange', alCambiarVisibilidad);
  lienzo.addEventListener('webglcontextlost', alPerderContexto);
  iniciar();

  return {
    fijarMundo(id) {
      objetivo = objetivosPara(id);
      pendiente = true;
    },
    fijarPuntero({ x, y, activo }) {
      puntero.sondaObjetivo = activo ? 1 : 0;
      if (activo) {
        if (puntero.sonda < 0.01) {
          puntero.x = x;
          puntero.y = y;
        }
        puntero.ox = x;
        puntero.oy = y;
      }
      pendiente = true;
    },
    fijarMovimientoReducido(valor) {
      movimientoReducido = valor;
      pendiente = true;
    },
    destruir() {
      detener();
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      lienzo.removeEventListener('webglcontextlost', alPerderContexto);
    },
  };
}
