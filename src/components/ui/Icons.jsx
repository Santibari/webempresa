const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ArrowRight = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowDown = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
)
export const Check = (p) => (
  <svg {...base} {...p}><path d="M5 12.5 9.5 17 19 7" /></svg>
)
export const Plus = (p) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const Menu = (p) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const X = (p) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Sun = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)
export const Moon = (p) => (
  <svg {...base} {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
)
export const WhatsApp = (p) => (
  <svg viewBox="0 0 32 32" fill="currentColor" {...p}>
    <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.63 4.55 1.73 6.45L4 29l7.7-1.68a11.9 11.9 0 0 0 4.32.8h.01c6.63 0 12.02-5.4 12.02-12.02C28.05 8.4 22.66 3 16.02 3Zm7.02 17.02c-.3.85-1.7 1.62-2.35 1.72-.6.1-1.36.14-2.2-.14-.5-.16-1.15-.38-1.98-.74-3.48-1.5-5.75-5-5.93-5.24-.17-.24-1.42-1.9-1.42-3.62 0-1.72.9-2.57 1.22-2.92.31-.35.68-.44.9-.44h.65c.21 0 .49-.08.77.58.3.7.99 2.42 1.07 2.6.09.17.14.38.03.62-.1.24-.16.38-.3.58-.15.2-.32.44-.46.6-.15.16-.31.34-.13.66.17.32.77 1.28 1.66 2.08 1.14 1.02 2.11 1.34 2.43 1.5.32.16.51.13.7-.08.2-.2.83-.96 1.05-1.3.22-.32.44-.27.74-.16.3.1 1.92.9 2.25 1.07.32.16.53.24.6.38.08.14.08.8-.22 1.65Z" />
  </svg>
)
