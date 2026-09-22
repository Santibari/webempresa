import { useEffect, useRef } from 'react'
import { gsap, isTouchDevice, prefersReducedMotion } from '../lib/gsap.js'

/**
 * Botón magnético: el elemento "sigue" al cursor dentro de un radio
 * y regresa con rebote elástico al salir.
 * strength 0..1 → fracción de la distancia al cursor que se desplaza.
 */
export function useMagnetic({ strength = 0.35, radius = 110 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || isTouchDevice() || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
    let raf = 0

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      const reach = radius + Math.max(r.width, r.height) / 2
      if (dist < reach) {
        xTo(dx * strength)
        yTo(dy * strength)
      } else {
        xTo(0); yTo(0)
      }
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' })
    }

    const throttled = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; onMove(e) })
    }

    window.addEventListener('pointermove', throttled, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', throttled)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength, radius])

  return ref
}
