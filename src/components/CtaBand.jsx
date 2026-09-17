import { useLang } from '../context/LangContext.jsx'
import styles from './CtaBand.module.css'

export default function CtaBand() {
  const { t } = useLang()

  return (
    <section className={styles.ctaBand} id="contacto">
      <div className="wrap">
        <div className={styles.ctaBox}>
          <div className={styles.ctaBoxText}>
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.desc')}</p>
          </div>
          <div className={styles.ctaBoxActions}>
            <a href="#formulario" className="btn btn-onDark">{t('cta.btn')}</a>
            <span className={styles.note}>{t('cta.note')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}