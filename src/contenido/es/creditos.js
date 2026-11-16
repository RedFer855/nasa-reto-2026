export const creditos = {
  textos: {
    antetitulo: 'Licencias y uso de IA',
    titulo: 'Todo lo que usamos, con su licencia',
    entradilla: 'Datos abiertos, software libre y asistentes de IA. Cada pieza dice de dónde viene y bajo qué condiciones se usa.',
  },
  grupos: [
    {
      id: 'datos',
      titulo: 'Datos abiertos',
      items: [
        { nombre: 'NASA Earthdata y GES DISC', descripcion: 'ASTER GED, MODIS (temperatura y NDVI), MERRA-2 (viento y polvo), EMIT. Datos abiertos de la NASA.' },
        { nombre: 'NASA PDS y PGDA', descripcion: 'LOLA, Diviner, Mini-RF, TES, THEMIS, cuevas de Marte. Datos abiertos de la NASA.' },
        { nombre: 'USGS', descripcion: 'Regiones candidatas de Artemis, relieve de Marte (HRSC-MOLA, CTX, HiRISE). Dominio público.' },
        { nombre: 'Copernicus DEM y JRC Surface Water', descripcion: 'Elevación y agua superficial de la Tierra. Licencia abierta de Copernicus.' },
      ],
    },
    {
      id: 'motor',
      titulo: 'Motor y visor',
      items: [
        { nombre: 'Código del equipo J4Ks', descripcion: 'Licencia MIT.' },
        { nombre: 'Rust y WebAssembly', descripcion: 'El motor de similitud corre en Rust y llega al navegador como WebAssembly. Software libre.' },
        { nombre: 'CesiumJS', descripcion: 'Visor 3D del globo. Licencia Apache 2.0.' },
      ],
    },
    {
      id: 'pagina',
      titulo: 'Esta página',
      items: [
        { nombre: 'Vite, Handlebars y vite-plugin-handlebars', descripcion: 'Construcción y plantillas. Licencia MIT.' },
        { nombre: 'Less', descripcion: 'Estilos. Licencia Apache 2.0.' },
        { nombre: 'Inter Tight, JetBrains Mono y Unbounded', descripcion: 'Tipografías de Google Fonts. Licencia SIL Open Font.' },
      ],
    },
    {
      id: 'ia',
      titulo: 'Uso de IA',
      items: [
        { nombre: 'Asistentes de código', descripcion: 'Usamos Claude Code, Gemini, Codex, Copilot y otros para escribir y revisar código, pruebas y documentación.' },
        { nombre: 'Los datos no los genera la IA', descripcion: 'Toda comparación sale de datasets públicos con nombre, versión y fuente. La IA no inventa ni completa datos.' },
      ],
    },
  ],
};
