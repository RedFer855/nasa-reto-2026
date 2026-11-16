export const creditos = {
  textos: {
    antetitulo: 'Licenses and AI use',
    titulo: 'Everything we used, with its license',
    entradilla: 'Open data, free software and AI assistants. Each piece says where it comes from and under what terms it is used.',
  },
  grupos: [
    {
      id: 'datos',
      titulo: 'Open data',
      items: [
        { nombre: 'NASA Earthdata and GES DISC', descripcion: 'ASTER GED, MODIS (temperature and NDVI), MERRA-2 (wind and dust), EMIT. NASA open data.' },
        { nombre: 'NASA PDS and PGDA', descripcion: 'LOLA, Diviner, Mini-RF, TES, THEMIS, Mars caves. NASA open data.' },
        { nombre: 'USGS', descripcion: 'Artemis candidate regions, Mars relief (HRSC-MOLA, CTX, HiRISE). Public domain.' },
        { nombre: 'Copernicus DEM and JRC Surface Water', descripcion: 'Earth elevation and surface water. Copernicus open license.' },
      ],
    },
    {
      id: 'motor',
      titulo: 'Engine and viewer',
      items: [
        { nombre: 'J4Ks team code', descripcion: 'MIT license.' },
        { nombre: 'Rust and WebAssembly', descripcion: 'The similarity engine runs in Rust and reaches the browser as WebAssembly. Free software.' },
        { nombre: 'CesiumJS', descripcion: '3D globe viewer. Apache 2.0 license.' },
      ],
    },
    {
      id: 'pagina',
      titulo: 'This page',
      items: [
        { nombre: 'Vite, Handlebars and vite-plugin-handlebars', descripcion: 'Build and templates. MIT license.' },
        { nombre: 'Less', descripcion: 'Styles. Apache 2.0 license.' },
        { nombre: 'Inter Tight, JetBrains Mono and Unbounded', descripcion: 'Google Fonts typefaces. SIL Open Font License.' },
      ],
    },
    {
      id: 'ia',
      titulo: 'AI use',
      items: [
        { nombre: 'Code assistants', descripcion: 'We use Claude Code, Gemini, Codex, Copilot and others to write and review code, tests and documentation.' },
        { nombre: 'The data is not AI-generated', descripcion: 'Every comparison comes from public datasets with name, version and source. AI does not invent or fill in data.' },
      ],
    },
  ],
};
