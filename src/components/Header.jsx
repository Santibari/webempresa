import { useTheme } from '../context/ThemeContext.jsx'
import { useLang }  from '../context/LangContext.jsx'
import { LOGO_SRC } from '../data/siteContent.js'
import styles from './Header.module.css'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, toggleLang } = useLang()

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.nav}`}>

        {/* Logo */}
        <a href="#" className={styles.logo} aria-label="LuckNova — inicio">
          {LOGO_SRC
            ? <img src={LOGO_SRC} alt="LuckNova" className={styles.logoImg} />
            : <><span>Luck</span><span className={styles.nova}>Nova</span></>
          }
        </a>

        {/* Nav links — desktop */}
        <nav className={styles.navLinks} aria-label="Navegacion principal">
          <a href="#servicios">{t('nav.services')}</a>
          <a href="#proceso">{t('nav.how')}</a>
          <a href="#equipo">{t('nav.team')}</a>
          <a href="#demos">{t('nav.demos')}</a>
          <a href="#formulario">{t('nav.contact')}</a>
        </nav>

        {/* Controls + CTA */}
        <div className={styles.actions}>
          <div className={styles.controls}>
            <button
              className={styles.iconBtn}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              className={styles.langBtn}
              onClick={toggleLang}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Espanol'}
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
          <a href="#contacto" className={`btn btn-primary ${styles.ctaBtn}`}>
            {t('nav.cta')}
          </a>
        </div>

      </div>
    </header>
  )
}