import { sitio, idsMundos } from './sitio.js';
import { diapositivas } from './diapositivas.js';
import { sitiosObjetivo } from './sitios.js';
import { agencias } from './datos.js';
import { cifras, fuenteSitios } from './alcance.js';
import { integrantes } from './equipo.js';
import es from './es/index.js';
import en from './en/index.js';

export const idiomas = { es, en };


const paginas = {
  es: { ruta: '', otro: 'en' },
  en: { ruta: 'en/', otro: 'es' },
};




export function construirDemo(urlDemo, { probar, probarCorto }) {
  const url = (urlDemo ?? '').trim();
  return { disponible: url !== '', url, probar, probarCorto };
}


export function construirContexto(codigo = 'es', base = '/') {
  const t = idiomas[codigo] ?? es;
  const otro = paginas[t.codigo].otro;
  const formato = new Intl.NumberFormat(t.codigo);
  const cifra = (c) => ({ ...c, texto: formato.format(c.valor), ...t.alcance.cifras[c.id] });
  const sitiosDe = (cuerpo) => sitiosObjetivo.filter((s) => s.cuerpo === cuerpo);

  return {
    base,
    idioma: {
      codigo: t.codigo,
      otro: { codigo: otro, etiqueta: otro.toUpperCase(), ruta: base + paginas[otro].ruta },
    },
    interfaz: t.interfaz,
    sitio: { ...sitio, ...t.sitio },
    demo: construirDemo(sitio.urlDemo, t.interfaz.demo),
    mundos: idsMundos.map((id) => ({ id, etiqueta: t.mundos[id] })),
    diapositivas: diapositivas.map((d) => ({ ...d, etiqueta: t.diapositivas[d.id] })),
    inicio: t.inicio,
    reto: t.reto,
    sitios: { luna: sitiosDe('luna'), marte: sitiosDe('marte'), textos: t.sitios },
    metodo: t.metodo,
    datos: {
      agencias: agencias.map((a) => ({
        ...a,
        recursos: a.recursos.map((r) => ({ ...r, descripcion: t.datos.descripciones[r.id] })),
      })),
      fuente: t.datos.textos.fuente,
      textos: t.datos.textos,
    },
    alcance: {
      
      cifras: [...cifras.slice(0, -1), { id: 'sitios', valor: sitiosObjetivo.length, fuente: fuenteSitios }, ...cifras.slice(-1)].map(
        (c) => cifra(c),
      ),
      textos: t.alcance.textos,
    },
    equipo: {
      integrantes: integrantes.map((i) => ({ ...i, rol: t.equipo.roles[i.id] })),
      textos: t.equipo.textos,
    },
    creditos: t.creditos,
    cierre: t.cierre,
    anio: new Date().getFullYear(),
  };
}
