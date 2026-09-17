// ═══════════════════════════════════════════════════════════
//  FUENTE DE VERDAD DE IMÁGENES Y DATOS DEL SITIO
//  Edita este archivo para cambiar logo, fotos y demos.
// ═══════════════════════════════════════════════════════════

// ── LOGO ──────────────────────────────────────────────────
// Deja vacío ('') para usar el logo de texto "LuckNova"
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
// img:  ruta de imagen, ej. '/src/assets/images/demos/demo1.jpg'
// link: URL externa de la demo, ej. 'https://demo.cliente.com'
// Deja link: '' para mostrar el botón "Próximamente"
export const DEMOS = [
  {
    id: 1,
    badge: 'E-commerce',
    title: 'Proyecto 1',
    desc:  'Descripción corta del proyecto',
    img:   '',
    link:  '',
  },
  {
    id: 2,
    badge: 'App Móvil',
    title: 'Proyecto 2',
    desc:  'Descripción corta del proyecto',
    img:   '',
    link:  '',
  },
  {
    id: 3,
    badge: 'Dashboard',
    title: 'Proyecto 3',
    desc:  'Descripción corta del proyecto',
    img:   '',
    link:  '',
  },
]