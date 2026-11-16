import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { construirContexto } from './src/contenido/contexto.js';
import { ayudantes } from './src/vistas/ayudantes.js';
import { baseDesdeRepositorio } from './src/utilidades/base-publicacion.js';

const desdeRaiz = (ruta) => fileURLToPath(new URL(ruta, import.meta.url));
const carpetaVistas = desdeRaiz('./src/vistas');


export default defineConfig(({ command }) => {
  
  const base = command === 'build' ? baseDesdeRepositorio(process.env.GITHUB_REPOSITORY) : '/';

  return {
    base,
    plugins: [
      handlebars({
        partialDirectory: carpetaVistas,
        
        context: (ruta) => construirContexto(ruta.startsWith('/en/') ? 'en' : 'es', base),
        helpers: ayudantes,
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          es: desdeRaiz('./index.html'),
          en: desdeRaiz('./en/index.html'),
        },
      },
    },
  };
});
