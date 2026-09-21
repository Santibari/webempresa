import { useEffect, useRef } from 'react'

/**
 * Hook para animar elementos al entrar al viewport (Scroll Reveal)
 * Soporta elementos individuales o contenedores con elementos hijos con clase .reveal
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respeta la preferencia de reducción de movimiento del usuario
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      el.querySelectorAll('.reveal').forEach(child => child.classList.add('revealed'))
      return
    }

    const targets = el.classList.contains('reveal') 
      ? [el, ...el.querySelectorAll('.reveal')]
      : el.querySelectorAll('.reveal').length > 0 
        ? el.querySelectorAll('.reveal')
        : [el]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      }
    )

    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}
