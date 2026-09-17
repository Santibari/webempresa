import { useLang } from '../context/LangContext.jsx'
import styles from './Services.module.css'

const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="14" rx="3"/>
    <path d="M8 20h8M12 18v2"/>
  </svg>
)
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>
  </svg>
)
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M16.9 16.9l1.5 1.5M5.6 18.4l1.4-1.4M16.9 7.1l1.5-1.5"/>
  </svg>
)
const ConsultIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

export default function Services() {
  const { t } = useLang()
  const services = [
    { icon: <WebIcon />,     cls: 'c1', titleKey: 'services.web.title',     descKey: 'services.web.desc'     },
    { icon: <CartIcon />,    cls: 'c2', titleKey: 'services.ecom.title',    descKey: 'services.ecom.desc'    },
    { icon: <AIIcon />,      cls: 'c3', titleKey: 'services.ai.title',      descKey: 'services.ai.desc'      },
    { icon: <ConsultIcon />, cls: 'c4', titleKey: 'services.consult.title', descKey: 'services.consult.desc' },
  ]
  return (
    <section id="servicios">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t('services.kicker')}</span>
          <h2>{t('services.title')}</h2>
          <p className="desc">{t('services.desc')}</p>
        </div>
        <div className={styles.bento}>
          {services.map(s => (
            <div key={s.titleKey} className={`${styles.card} ${styles[s.cls]}`}>
              <div className={styles.cardIcon}>{s.icon}</div>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}