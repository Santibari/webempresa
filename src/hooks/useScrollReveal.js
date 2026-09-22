import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'

/**
 * Scroll reveal con GSAP ScrollTrigger.
 * Mantiene la API anterior: elementos con clase `.reveal` dentro del ref
 * (o el propio ref) entran con desplazamiento + blur y stagger natural.
 * Las clases .stagger-N siguen funcionando como retardo adicional.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const inner = Array.from(el.querySelectorAll('.reveal'))
    const targets = el.classList.contains('reveal') ? [el, ...inner] : inner.length ? inner : [el]

    if (prefersReducedMotion()) {
      targets.forEach(t => t.classList.add('revealed'))
      return
    }

    // Neutralizamos la transición CSS legacy y animamos con GSAP
    targets.forEach(t => {
      t.classList.add('revealed')
      t.style.transition = 'none'
    })

    const ctx = gsap.context(() => {
      targets.forEach((t) => {
        const m = /stagger-(\d)/.exec(t.className)
        const extraDelay = m ? Number(m[1]) * 0.08 : 0
        gsap.fromTo(
          t,
          { autoAlpha: 0, y: options.distance ?? 40, filter: 'blur(6px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: options.duration ?? 1.1,
            delay: extraDelay,
            ease: 'expo.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: t,
              start: options.start ?? 'top 88%',
              once: true,
            },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [options.threshold, options.rootMargin, options.start, options.distance, options.duration])

  return ref
}
