#version 300 es

precision highp float;

uniform vec2 u_resolucion;
uniform vec2 u_puntero;
uniform float u_sonda;
uniform float u_tiempo;
uniform vec3 u_mundo;
uniform vec3 u_fondo;
uniform vec3 u_lineaBaja;
uniform vec3 u_lineaAlta;
uniform float u_alfaLinea;

out vec4 colorSalida;

const mat2 OCTAVA = mat2(1.6, 1.2, -1.2, 1.6);
const float NIVELES = 10.0;

float azar(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 azar2(vec2 p) {
  float n = azar(p);
  return vec2(n, azar(p + n));
}

float ruido(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(azar(i), azar(i + vec2(1.0, 0.0)), u.x),
    mix(azar(i + vec2(0.0, 1.0)), azar(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}


float ruidoFractal(vec2 p) {
  float valor = 0.0;
  float amplitud = 0.5;
  for (int i = 0; i < 5; i++) {
    valor += amplitud * ruido(p);
    p = OCTAVA * p;
    amplitud *= 0.5;
  }
  return valor;
}


float crestas(vec2 p) {
  float valor = 0.0;
  float amplitud = 0.5;
  for (int i = 0; i < 5; i++) {
    float n = 1.0 - abs(ruido(p) * 2.0 - 1.0);
    valor += amplitud * n * n;
    p = OCTAVA * p;
    amplitud *= 0.5;
  }
  return valor;
}


float crateres(vec2 p) {
  vec2 celda = floor(p);
  vec2 local = fract(p);
  float h = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 centro = g + 0.15 + azar2(celda + g) * 0.7;
      float radio = mix(0.12, 0.42, azar(celda + g + 7.1));
      float d = length(local - centro) / radio;
      float cuenco = d < 1.0 ? (d * d - 1.0) * 0.55 : 0.0;
      float borde = exp(-pow((d - 1.0) * 3.5, 2.0)) * 0.3;
      h += (cuenco + borde) * radio * 2.2;
    }
  }
  return h;
}

float alturaTierra(vec2 p) {
  return crestas(p * 0.85) * 1.1 + ruidoFractal(p * 2.1) * 0.22;
}

float alturaLuna(vec2 p) {
  return ruidoFractal(p * 0.6) * 0.45 + crateres(p * 1.25) * 0.85 + crateres(p * 3.2 + 11.0) * 0.3;
}

float alturaMarte(vec2 p) {
  vec2 estirado = vec2(p.x * 0.55 + p.y * 0.3, p.y * 1.5);
  float dunas = sin(estirado.y * 3.2 + ruidoFractal(p * 1.1) * 4.5) * 0.1;
  return ruidoFractal(p * 0.75) * 0.85 + dunas + crateres(p * 0.8 + 3.0) * 0.45;
}

float altura(vec2 p) {
  float h = 0.0;

  if (u_mundo.x > 0.001) h += u_mundo.x * alturaTierra(p);
  if (u_mundo.y > 0.001) h += u_mundo.y * alturaLuna(p);
  if (u_mundo.z > 0.001) h += u_mundo.z * alturaMarte(p);
  return h;
}


float curvaNivel(float valor, float grosor) {
  float distanciaALinea = abs(fract(valor + 0.5) - 0.5);
  return 1.0 - smoothstep(0.0, fwidth(valor) * grosor, distanciaALinea);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolucion) / u_resolucion.y;
  vec2 deriva = vec2(u_tiempo * 0.012, u_tiempo * 0.006);
  vec2 p = uv * 2.6 + deriva;

  vec2 uvSonda = (u_puntero - 0.5 * u_resolucion) / u_resolucion.y;
  float distanciaSonda = length(uv - uvSonda);
  float elevacionSonda = exp(-distanciaSonda * distanciaSonda * 26.0) * 0.42 * u_sonda;
  float brillo = exp(-distanciaSonda * distanciaSonda * 9.0) * u_sonda;

  float h = altura(p) + elevacionSonda;
  float v = h * NIVELES;

  float menor = curvaNivel(v, 1.1);
  float mayor = curvaNivel(v / 5.0, 1.6);

  float elevacion = clamp(h * 0.9, 0.0, 1.0);
  vec3 colorLinea = mix(u_lineaBaja, u_lineaAlta, elevacion);

  float intensidad = (menor * 0.45 + mayor * 0.75) * u_alfaLinea * (0.55 + brillo * 0.8);


  vec3 color = mix(u_fondo, colorLinea, elevacion * 0.06);
  color = mix(color, colorLinea, clamp(intensidad, 0.0, 1.0));


  float vineta = smoothstep(1.25, 0.35, length(uv));
  color = mix(u_fondo, color, 0.35 + 0.65 * vineta);

  colorSalida = vec4(color, 1.0);
}
