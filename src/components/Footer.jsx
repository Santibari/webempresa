import { useLang } from '../context/LangContext.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}><span>Luck</span><span className={styles.nova}>Nova</span></div>
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
              <a href="#demos">{t('footer.demos')}</a>
              <a href="#formulario">{t('footer.contact')}</a>
            </div>
            <div className={styles.footerCol}>
              <h4>{t('footer.contact')}</h4>
              <a href="mailto:hola@lucknova.co">hola@lucknova.co</a>
              <a href="tel:+573000000000">+57 300 000 0000</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 LuckNova. {t('footer.copyright')}</span>
          <span>{t('footer.city')}</span>
        </div>
      </div>
    </footer>
  )
}