// ═══════════════════════════════════════════════════════════
//  FUENTE DE VERDAD DE IMÁGENES Y DATOS DEL SITIO
//  Edita este archivo para cambiar logo, fotos y demos.
// ═══════════════════════════════════════════════════════════

// ── LOGO ──────────────────────────────────────────────────
// Deja vacío ('') para usar el logo de texto "Aikata"
// Ejemplo: '/src/assets/images/logo.svg'
export const LOGO_SRC = ''

import pabloPhoto from '../assets/images/founders/pablo-boada.jpeg'
import juanPhoto from '../assets/images/founders/juan-henao.png'

// ── FUNDADORES ────────────────────────────────────────────
// photo: ruta o import de la imagen
// Deja photo: '' para mostrar las iniciales
export const FOUNDERS = [
  { name: 'Pablo Boada',      initials: 'PB', photo: pabloPhoto },
  { name: 'Santiago Bazzani', initials: 'SB', photo: '' },
  { name: 'Juan David Henao', initials: 'JH', photo: juanPhoto },
]

// ── LOGOS DE CLIENTES / ALIADOS (banda superior de Demos) ─
// src: ruta de imagen, ej. '/src/assets/images/logos/cliente1.svg'
// Deja src: '' para mostrar el placeholder con el label
export const LOGOS = [
  { id: 1, label: 'Cliente 1', src: '' },
  { id: 2, label: 'Cliente 2', src: '' },
  { id: 3, label: 'Cliente 3', src: '' },
  { id: 4, label: 'Aliado 1',  src: '' },
  { id: 5, label: 'Cliente 4', src: '' },
  { id: 6, label: 'Aliado 2',  src: '' },
]

// ── DEMOS DE PROYECTOS ────────────────────────────────────
// img:  ruta o import de imagen (vacío para mención informativa)
// link: URL externa del proyecto (vacío si no tiene enlace saliente)
export const DEMOS = [
  {
    id: 1,
    badge: 'Web & Plataforma Educativa',
    title: 'Holy Family Preschool',
    desc: 'Sitio web oficial y plataforma digital desarrollada para Holy Family Preschool. Arquitectura moderna, diseño de alta fidelidad, interactividad y optimización de rendimiento.',
    img: '',
    link: '',
    status: 'Entregado y activo',
  },
]