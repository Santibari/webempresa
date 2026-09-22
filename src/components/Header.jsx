import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'
import { useLang } from '../context/LangContext.jsx'
import { LOGO_SRC } from '../data/siteContent.js'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import MagneticButton from './ui/MagneticButton.jsx'
import { Sun, Moon, Menu, X, WhatsApp, ArrowRight } from './ui/Icons.jsx'
import styles from './Header.module.css'

const WA_URL = 'https://wa.me/573053704481?text=Hola%20Aikata%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20t%C3%A9cnico'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef(null)
  const drawerRef = useRef(null)

  const links = [
    ['#servicios', t('nav.services')],
    ['#estimador', t('nav.estimator')],
    ['#proceso', t('nav.how')],
    ['#roi', t('nav.roi')],
    ['#demos', t('nav.projects')],
    ['#faq', t('nav.faq')],
  ]

  /* Scroll: estado del header + barra de progreso */
  useEffect(() => {
    const bar = progressRef.current
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setPastHero(y > window.innerHeight * 0.85)
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Drawer: bloqueo de scroll + animación en cascada */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open && drawerRef.current && !prefersReducedMotion()) {
      const items = drawerRef.current.querySelectorAll('[data-stagger]')
      gsap.fromTo(items, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.1 })
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${open ? styles.headerOpen : ''}`}>
        <div className={`wrap ${styles.nav}`}>
          <a href="#" className={styles.logo} aria-label="Aikata — inicio" onClick={close}>
            {LOGO_SRC
              ? <img src={LOGO_SRC} alt="Aikata" className={styles.logoImg} />
              : <><span>Ai</span><span className={styles.nova}>kata</span><span className={styles.kanjiTag}>相方</span></>}
          </a>

          <nav className={styles.navLinks} aria-label="Navegación principal">
            {links.map(([href, label]) => (
              <a key={href} href={href}><span>{label}</span></a>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.controls}>
              <button className={styles.iconBtn} onClick={toggleTheme} aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <button className={styles.langBtn} onClick={toggleLang} aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}>
                {lang === 'es' ? 'EN' : 'ES'}
              </button>
            </div>
            <MagneticButton href="#contacto" className={styles.ctaBtn} strength={0.2} icon={<ArrowRight />}>
              {t('nav.cta')}
            </MagneticButton>
            <button
              className={`${styles.iconBtn} ${styles.burger}`}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? t('header.close') : t('header.menu')}
              aria-expanded={open}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Drawer móvil ── */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} ref={drawerRef} aria-hidden={!open}>
        <nav className={styles.drawerNav}>
          {links.map(([href, label], i) => (
            <a key={href} href={href} onClick={close} data-stagger>
              <span className={styles.drawerIdx}>0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className={styles.drawerFoot} data-stagger>
          <a href="#contacto" className="btn btn-primary btn-lg" onClick={close}>
            <span>{t('nav.cta')}</span>
          </a>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-tinted btn-lg">
            <WhatsApp style={{ width: 18, height: 18, marginRight: 8 }} />
            <span>{t('mobile.wa')}</span>
          </a>
          <div className={styles.drawerControls}>
            <button onClick={toggleTheme}>{theme === 'dark' ? <Sun /> : <Moon />} {theme === 'dark' ? 'Light' : 'Dark'}</button>
            <button onClick={toggleLang}>{lang === 'es' ? 'English' : 'Español'}</button>
          </div>
        </div>
      </div>

      {/* ── Barra CTA fija móvil (aparece tras el hero) ── */}
      <div className={`mobile-only ${styles.mobileBar} ${pastHero && !open ? styles.mobileBarOn : ''}`} aria-hidden={!pastHero}>
        <a href="#contacto" className="btn btn-primary">{t('mobile.cta')}</a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileWa} aria-label="WhatsApp">
          <WhatsApp />
        </a>
      </div>
    </>
  )
}
