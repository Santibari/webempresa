import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap.js'

/**
 * Desplaza su contenido con el scroll (parallax suave con scrub).
 * `speed` en px totales de recorrido: positivo = más lento que la página.
 */
export default function Parallax({ children, speed = 80, className = '', style, as: Tag = 'div' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: speed * 0.5 },
        {
          y: -speed * 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [speed])

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform', ...style }}>
      {children}
    </Tag>
  )
}
