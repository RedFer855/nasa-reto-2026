export const limitar = (valor, minimo, maximo) => Math.min(maximo, Math.max(minimo, valor));

export const interpolar = (desde, hasta, t) => desde + (hasta - desde) * t;


export const amortiguar = (actual, objetivo, lambda, dt) => interpolar(actual, objetivo, 1 - Math.exp(-lambda * dt));


export function hexARgb(hex) {
  let valor = hex.trim().replace('#', '');
  if (valor.length === 3) valor = [...valor].map((c) => c + c).join('');
  const entero = Number.parseInt(valor, 16);
  return [((entero >> 16) & 255) / 255, ((entero >> 8) & 255) / 255, (entero & 255) / 255];
}
