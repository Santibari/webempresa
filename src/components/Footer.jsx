import { useLang } from '../context/LangContext.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}><span>Ai</span><span className={styles.nova}>kata</span><span className={styles.kanjiTag}>相方</span></div>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <h4>{t('footer.services')}</h4>
              <a href="#servicios">{t('services.web.title')}</a>
              <a href="#servicios">{t('services.ecom.title')}</a>
              <a href="#servicios">{t('services.ai.title')}</a>
              <a href="#servicios">{t('services.consult.title')}</a>
            </div>
            <div className={styles.footerCol}>
              <h4>{t('footer.company')}</h4>
              <a href="#proceso">{t('footer.how')}</a>
              <a href="#por-que-aikata">{t('footer.why')}</a>
              <a href="#demos">{t('footer.demos')}</a>
              <a href="#contacto">{t('footer.contact')}</a>
            </div>
            <div className={styles.footerCol}>
              <h4>{t('footer.contact')}</h4>
              <a href="mailto:aikatasascolombia@gmail.com">aikatasascolombia@gmail.com</a>
              <a href="https://wa.me/573053704481" target="_blank" rel="noopener noreferrer">+57 305 370 4481</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Aikata. {t('footer.copyright')}</span>
          <span>{t('footer.city')}</span>
        </div>
      </div>
    </footer>
  )
}