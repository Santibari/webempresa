import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'

/**
 * Interpola un número hacia `value` cada vez que cambia.
 * Devuelve el valor animado (redondeado a `decimals`).
 */
export function useCountUp(value, { duration = 0.9, decimals = 0 } = {}) {
  const [display, setDisplay] = useState(value)
  const obj = useRef({ v: value })

  useEffect(() => {
    if (prefersReducedMotion()) { setDisplay(value); return }
    const tween = gsap.to(obj.current, {
      v: value,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        const f = Math.pow(10, decimals)
        setDisplay(Math.round(obj.current.v * f) / f)
      },
    })
    return () => tween.kill()
  }, [value, duration, decimals])

  return display
}
