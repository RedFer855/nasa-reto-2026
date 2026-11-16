export function baseDesdeRepositorio(repositorio) {
  const nombre = (repositorio ?? '').split('/')[1]?.trim();
  if (!nombre || nombre.toLowerCase().endsWith('.github.io')) return '/';
  return `/${nombre}/`;
}
