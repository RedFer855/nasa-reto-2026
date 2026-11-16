export const ayudantes = {
  
  rellenar: (indice) => String(Number(indice) + 1).padStart(2, '0'),
  
  rellenarTotal: (lista) => String(lista?.length ?? 0).padStart(2, '0'),
  igual: (a, b) => a === b,
  
  nombreArchivo: (ruta) => String(ruta).split('/').pop(),
};
