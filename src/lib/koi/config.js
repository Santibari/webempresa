/**
 * Configuración del ecosistema koi de Aikata.
 * Todo lo que se quiera ajustar después (velocidad, tamaño, partículas,
 * momentos del logo, etapas de scroll) vive aquí. Los colores se leen de
 * las variables CSS --koi-* en global.css para respetar el tema claro/oscuro.
 */
export const KOI_CONFIG = {
  /* Velocidad angular sobre el infinito (rad/s). */
  speed: {
    base: 0.5,    // al inicio del recorrido
    max: 0.78,    // cuando el infinito ya está formado
    logo: 0.38,   // factor cuando aparece el logo (los peces frenan)
    wobble: 0.12, // variación orgánica de velocidad (0 = constante)
  },

  /* Geometría relativa al viewport. `a` es la mitad del ancho del infinito. */
  size: {
    desktopA: 0.24,   // a = vw * desktopA (máx maxA)
    maxA: 360,
    mobileA: 0.40,    // a = vw * mobileA en móvil
    centerX: 0.60,    // centro horizontal del infinito (fracción del viewport)
    centerY: 0.50,
    mobileCenterX: 0.5,
    mobileCenterY: 0.42,
    fishLength: 0.34, // largo del pez = a * fishLength
    lane: 0.30,       // separación lateral al cruzarse = largo * lane
  },

  /* Scroll → narrativa. P=1 se alcanza tras scrollDistanceVh alturas de viewport. */
  scroll: {
    distanceVh: 1.7,
    smoothing: 2.2, // mayor = sigue al scroll más rápido (interpolación exponencial)
    stages: {
      approachStart: 0.16, // empiezan a acercarse
      onPath: 0.48,        // ya están sobre el infinito
      revealStart: 0.46,   // el trazo empieza a dibujarse (tras el encuentro)
      revealEnd: 0.96,     // trazo completo
    },
  },

  particles: { desktop: 90, mobile: 32, burst: 44 },
  trail: { length: 44, mobileLength: 26 },

  /* Momento del logo: cada `every` segundos, durante `duration`, con `delay` inicial. */
  logoMoment: { every: 18, duration: 5.5, delay: 4 },

  /* Textos conceptuales por etapa bajo el infinito (muy sutiles). */
  captions: true,
}
