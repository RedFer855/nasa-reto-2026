export const inicio = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['Earth has already rehearsed', 'the Moon and Mars.'],
  acento: 'Now we need to find where.',
  entradilla:
    'We look for places on Earth that resemble permanent Moon base sites and Mars through physical processes, not appearance. And we explain where they match and where they differ.',
  accion: 'See the challenge',
  pista: 'Move the cursor: it is a probe over the terrain.',
};



export const reto = {
  antetitulo: 'The challenge',
  titulo: 'Similar Plots of Land',
  descripcion:
    'Teams are asked to use open Earth, Moon and Mars data from NASA and other agencies to identify and characterize new places on Earth that serve as analogs for permanent Moon base locations and for Mars landing and exploration sites. Each analog should explain which features or processes make the analogy work, where it breaks down, and how studying that place helps us explore the Moon or Mars.',
  tituloOficial: 'Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars',
  fuente: 'Source: official challenge page, NASA Space Apps Challenge 2026 (spaceappschallenge.org)',
  
  tituloObjetivo: 'General objective',
  objetivo:
    'Build a search tool that scans the whole Earth and compares it with each of the 21 target sites on the Moon and Mars, according to how the analog will be used. Similarity is measured by physical processes, not appearance, and every candidate states where it matches and where it differs.',
};



export const metodo = {
  antetitulo: 'How it works',
  titulo: 'From data layers to a list of places',
  entradilla: 'The whole Earth is compared with each site, variable by variable. Nothing is computed live: it all arrives ready.',
  pasos: [
    {
      titulo: 'Input',
      cuerpo:
        'Open data from NASA, USGS and ESA, processed beforehand on a computer. Earth becomes a table of HEALPix level-12 cells and each target site a vector: 9 lunar regions and 12 Mars sites.',
      etiquetas: ['ADR-002', 'ADR-011'],
    },
    {
      titulo: 'Process',
      cuerpo:
        'Each cell is measured against the site with a weighted Mahalanobis distance, on a median and spread that resist outliers, with a tolerance margin per variable. If a value is missing, that variable does not count. The score is S = e^(−γ·D²), from 0 to 1. Only cells with complete terrain and NDVI ≤ 0.30 qualify, and many scenarios are tried to see which candidates hold up.',
      etiquetas: ['ADR-006', 'ADR-008', 'ADR-013'],
    },
    {
      titulo: 'Output',
      cuerpo:
        'A metrics.json and a list of candidates per profile and site, with the score, the measured values, the score of each variable and what Earth cannot reproduce.',
      etiquetas: ['ADR-010'],
    },
  ],
  capas: ['Slope', 'Roughness', 'Relative relief', 'Silica', 'Thermal range', 'Illumination', 'Wind', '+ k'],
  fuente: 'Variables N1 to N7: ADR-008',
  etiquetaCapas: 'Layers compared at the same time',
};
