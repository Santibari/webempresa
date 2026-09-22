import { useEffect, useRef } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { gsap, isTouchDevice, prefersReducedMotion } from '../lib/gsap.js'
import SplitReveal from './motion/SplitReveal.jsx'
import Parallax from './motion/Parallax.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { ArrowRight, ArrowDown } from './ui/Icons.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  const { t, lang } = useLang()
  const heroRef = useScrollReveal({ start: 'top 95%' })
  const cardRef = useRef(null)
  const stageRef = useRef(null)

  /* Tilt 3D de la ficha técnica siguiendo el cursor */
  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    if (!stage || !card || isTouchDevice() || prefersReducedMotion()) return
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3.out' })
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3.out' })
    const onMove = (e) => {
      const r = stage.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      ry(px * 10); rx(-py * 10)
    }
    const onLeave = () => { rx(0); ry(0) }
    stage.addEventListener('pointermove', onMove)
    stage.addEventListener('pointerleave', onLeave)
    return () => { stage.removeEventListener('pointermove', onMove); stage.removeEventListener('pointerleave', onLeave) }
  }, [])

  const ticker = t('hero.ticker').split('·').map(s => s.trim()).filter(Boolean)
  const stats = [
    { n: t('hero.stat1.n'), l: t('hero.stat1.l') },
    { n: t('hero.stat2.n'), l: t('hero.stat2.l') },
    { n: t('hero.stat3.n'), l: t('hero.stat3.l') },
  ]

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Fondo: rejilla técnica + halo de acento */}
      <div className={styles.grid} aria-hidden="true" />
      <Parallax speed={-120} className={styles.halo} aria-hidden="true" />

      <div className={`wrap ${styles.inner}`}>
        <div className={`eyebrow-tag reveal`}>
          <span className="eyebrow-dot" />
          <span>{t('hero.eyebrow')}</span>
        </div>

        <SplitReveal
          key={lang}
          as="h1"
          text={t('hero.h1')}
          className={styles.h1}
          accent={t('hero.h1.accent').toLowerCase().split(/\s+/)}
          accentClass={styles.h1Accent}
          delay={0.15}
          stagger={0.06}
          start="top 100%"
          tail={<span className="accentDot">.</span>}
        />

        <div className={styles.lower}>
          {/* Columna izquierda: subtítulo, CTAs, pruebas */}
          <div className={`${styles.copy} reveal stagger-2`}>
            <p className={styles.sub}>{t('hero.sub')}</p>

            <div className={styles.ctaRow}>
              <MagneticButton href="#contacto" size="lg" icon={<ArrowRight />}>
                {t('hero.cta')}
              </MagneticButton>
              <a href="#estimador" className="btn-mono">
                <span>{t('hero.ctaSec')}</span>
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </div>

            <div className={styles.stats}>
              {stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <span className={styles.statNum}>{s.n}</span>
                  <span className={styles.statLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: ficha técnica con tilt + parallax */}
          <div className={`${styles.stage} reveal stagger-3`} ref={stageRef}>
            <Parallax speed={60}>
              <div className={styles.card} ref={cardRef}>
                <div className={styles.cardHead}>
                  <div className={styles.dots}><span /><span /><span /></div>
                  <span className={styles.file}>aikata.manifest.ts</span>
                  <span className={styles.live}><i />{t('hero.live')}</span>
                </div>
                <pre className={styles.code}>
                  <span className={styles.ln}>01</span><span className={styles.kw}>interface</span> <span className={styles.ty}>OperationalStack</span> {'{'}{'\n'}
                  <span className={styles.ln}>02</span>  client: <span className={styles.str}>'Pyme & Enterprise'</span>;{'\n'}
                  <span className={styles.ln}>03</span>  philosophy: <span className={styles.str}>'Human First · AI Assisted'</span>;{'\n'}
                  <span className={styles.ln}>04</span>  focus: <span className={styles.str}>'Repetitive Process Automation'</span>;{'\n'}
                  <span className={styles.ln}>05</span>  firstPilot: <span className={styles.num}>3</span> <span className={styles.cm}>// {t('hero.weeks')}</span>{'\n'}
                  <span className={styles.ln}>06</span>  ownership: <span className={styles.num}>100</span>%;{'\n'}
                  <span className={styles.ln}>07</span>  partnership: <span className={styles.ty}>AikataCompanion</span>;{'\n'}
                  <span className={styles.ln}>08</span>{'}'}
                </pre>
                <div className={styles.telemetry}>
                  <div><span>pipeline_health</span><b>99.98% ok</b></div>
                  <div><span>human_first</span><b>active_assist</b></div>
                  <div><span>engineering</span><b>active_pair</b></div>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </div>

      {/* Ticker de capacidades */}
      <div className={`${styles.ticker} reveal stagger-4`} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i}><i>◆</i>{item}</span>
          ))}
        </div>
      </div>

      <a href="#servicios" className={styles.scrollHint} aria-label={t('hero.scroll')}>
        <span>{t('hero.scroll')}</span>
        <ArrowDown />
      </a>
    </section>
  )
}
