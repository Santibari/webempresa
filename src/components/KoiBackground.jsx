import { useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { KoiEngine } from '../lib/koi/engine.js'
import { KOI_CONFIG } from '../lib/koi/config.js'
import styles from './KoiBackground.module.css'

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/**
 * Ecosistema koi de Aikata: capa canvas fija detrás de todo el contenido.
 * - Colores desde variables CSS --koi-* (responden al tema).
 * - El scroll fija un objetivo narrativo; el motor lo interpola suavemente.
 * - prefers-reduced-motion → un solo frame estático con el infinito completo.
 * - Se pausa cuando la pestaña no es visible.
 */
export default function KoiBackground() {
  const canvasRef = useRef(null)
  const engineRef = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const eng = new KoiEngine(canvas)
    engineRef.current = eng
    const reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)')

    const readPalette = () => {
      const cs = getComputedStyle(document.documentElement)
      const g = k => cs.getPropertyValue(k).trim()
      eng.setPalette({
        green: g('--koi-green'), green2: g('--koi-green-2'), glow: g('--koi-glow'),
        white: g('--koi-white'), whiteShade: g('--koi-white-shade'), gray: g('--koi-gray'),
        ink: g('--koi-ink'), outline: g('--koi-outline'),
      })
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.5 : 2)
      eng.resize(window.innerWidth, window.innerHeight, dpr)
      if (eng.reduced) eng.renderStatic()
    }
    const onScroll = () => {
      eng.setScrollTarget(clamp(window.scrollY / (window.innerHeight * KOI_CONFIG.scroll.distanceVh), 0, 1))
    }

    let raf = 0
    let last = performance.now()
    const loop = (now) => {
      const dt = (now - last) / 1000
      last = now
      eng.update(dt)
      eng.render()
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || eng.reduced || document.hidden) return
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => { cancelAnimationFrame(raf); raf = 0 }

    const onVisibility = () => (document.hidden ? stop() : start())
    const onReduced = () => {
      eng.setReduced(reducedMQ.matches)
      if (eng.reduced) { stop(); eng.renderStatic() } else start()
    }

    readPalette()
    eng.setReduced(reducedMQ.matches)
    resize()
    onScroll()
    /* Las fuentes web pueden llegar después del primer frame estático */
    document.fonts?.ready.then(() => { if (eng.reduced) eng.renderStatic() })
    start()

    const themeObserver = new MutationObserver(() => { readPalette(); if (eng.reduced) eng.renderStatic() })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    reducedMQ.addEventListener?.('change', onReduced)

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMQ.removeEventListener?.('change', onReduced)
      engineRef.current = null
    }
  }, [])

  /* Textos según idioma */
  useEffect(() => {
    const eng = engineRef.current
    if (!eng) return
    eng.setTexts({
      captions: [t('koi.s1'), t('koi.s2'), t('koi.s3'), t('koi.s4'), t('koi.s5')],
      brand: 'Aikata',
      kanji: '相方',
      tagline: t('koi.tagline'),
    })
    if (eng.reduced) eng.renderStatic()
  }, [lang, t])

  return (
    <div className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
