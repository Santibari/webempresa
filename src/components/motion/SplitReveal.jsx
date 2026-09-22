import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap.js'

/**
 * Revela un texto palabra por palabra al entrar en viewport.
 * - `text`: string a dividir
 * - `as`: etiqueta (h1, h2, p...)
 * - `tail`: nodo opcional al final (ej. el punto de acento)
 * - `accent`: array de palabras (lowercase) que reciben la clase `accentClass`
 * - `delay`, `stagger`, `start`: control fino de la animación
 */
export default function SplitReveal({
  text,
  as: Tag = 'h2',
  className = '',
  tail = null,
  accent = [],
  accentClass = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  start = 'top 88%',
  once = true,
  ...rest
}) {
  const ref = useRef(null)
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    el.classList.add('split-ready')
    const targets = el.querySelectorAll('.split-word')

    const ctx = gsap.context(() => {
      gsap.to(targets, {
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [text, delay, stagger, duration, start, once])

  // Si cambia el idioma, GSAP recalcula (dependencia en text arriba)
  useEffect(() => {}, [words])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {words.map((w, i) => {
        const clean = w.toLowerCase().replace(/[.,;:!?¿¡]/g, '')
        const isAccent = accent.includes(clean)
        return (
          <span className="split-line" key={`${w}-${i}`}>
            <span className={`split-word ${isAccent ? accentClass : ''}`}>{w}</span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
      {tail}
    </Tag>
  )
}
