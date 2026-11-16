export const inicio = {
  antetitulo: 'NASA Space Apps 2026 · Tegucigalpa',
  lineasTitulo: ['La Tierra ya ensayó', 'la Luna y Marte.'],
  acento: 'Falta encontrar dónde.',
  entradilla:
    'Buscamos lugares de la Tierra que se parezcan, por procesos físicos y no por su aspecto, a los sitios de bases permanentes en la Luna y a Marte. Y explicamos en qué coinciden y en qué difieren.',
  accion: 'Ver el reto',
  pista: 'Mueve el cursor: es una sonda sobre el relieve.',
};



export const reto = {
  antetitulo: 'El reto',
  titulo: 'Terrenos Similares',
  descripcion:
    'El reto pide usar datos abiertos de la Tierra, la Luna y Marte, de NASA y de otras agencias, para identificar y caracterizar análogos terrestres nuevos de los sitios de bases permanentes en la Luna y de los sitios de aterrizaje y exploración en Marte. Cada análogo debe explicar qué características o procesos sostienen la analogía, dónde se rompe y cómo estudiar ese lugar ayuda a explorar la Luna o Marte.',
  tituloOficial: 'Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars',
  fuente: 'Fuente: página oficial del reto, NASA Space Apps Challenge 2026 (spaceappschallenge.org)',
  
  tituloObjetivo: 'Objetivo general',
  objetivo:
    'Construir un buscador que recorra la Tierra entera y la compare con cada uno de los 21 sitios objetivo de la Luna y Marte, según el uso que se le quiera dar al análogo. El parecido se mide por procesos físicos y no por el aspecto, y cada candidato dice en qué coincide y en qué difiere.',
};



export const metodo = {
  antetitulo: 'Cómo funciona',
  titulo: 'De capas de datos a una lista de lugares',
  entradilla: 'La Tierra entera se compara con cada sitio, variable por variable. Nada se calcula en vivo: todo llega preparado.',
  pasos: [
    {
      titulo: 'Entrada',
      cuerpo:
        'Datos abiertos de NASA, USGS y ESA, procesados antes en una computadora. La Tierra queda en una tabla de celdas HEALPix de nivel 12 y cada sitio objetivo en un vector: 9 regiones de la Luna y 12 sitios de Marte.',
      etiquetas: ['ADR-002', 'ADR-011'],
    },
    {
      titulo: 'Proceso',
      cuerpo:
        'Cada celda se mide contra el sitio con una distancia de Mahalanobis con pesos, sobre mediana y dispersión resistentes a extremos y con un margen de tolerancia por variable. Si falta un dato, esa variable no cuenta. La nota es S = e^(−γ·D²), de 0 a 1. Solo entran celdas con el terreno completo y NDVI ≤ 0,30, y se prueban muchos escenarios para ver qué candidatos se sostienen.',
      etiquetas: ['ADR-006', 'ADR-008', 'ADR-013'],
    },
    {
      titulo: 'Resultado',
      cuerpo:
        'Un metrics.json y una lista de candidatos por perfil y por sitio, con la nota, los valores medidos, la nota de cada variable y lo que la Tierra no reproduce.',
      etiquetas: ['ADR-010'],
    },
  ],
  capas: ['Pendiente', 'Rugosidad', 'Relieve relativo', 'Sílice', 'Rango térmico', 'Iluminación', 'Viento', '+ k'],
  fuente: 'Variables N1 a N7: ADR-008',
  etiquetaCapas: 'Capas que se comparan a la vez',
};
