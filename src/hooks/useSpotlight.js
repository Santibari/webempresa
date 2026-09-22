import { useCallback } from 'react'

/**
 * Devuelve un onMouseMove para un contenedor: actualiza --mx / --my
 * en cada `.glow-card` hijo para que el borde luminoso siga al cursor.
 * Se usa por delegación (un solo listener por grid).
 */
export function useSpotlight(selector = '.glow-card') {
  return useCallback((e) => {
    const cards = e.currentTarget.querySelectorAll(selector)
    for (const card of cards) {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }, [selector])
}
