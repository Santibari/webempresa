import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './CtaBand.module.css'

export default function CtaBand() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section className={styles.ctaBand} id="contacto" ref={sectionRef}>
      <div className="wrap">
        <div className={`${styles.ctaBox} reveal`}>
          
          <div className={styles.ctaBoxText}>
            <span className={styles.ctaKicker}>// siguiente paso</span>
            <h2>
              {t('cta.title')}
              <span className="accentDot">.</span>
            </h2>
            <p>{t('cta.desc')}</p>
          </div>

          <div className={styles.ctaBoxActions}>
            <a href="#formulario" className="btn btn-onDark">
              <span>{t('cta.btn')}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
            <span className={styles.note}>{t('cta.note')}</span>
          </div>

        </div>
      </div>
    </section>
  )
}