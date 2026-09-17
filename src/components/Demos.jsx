import { useLang } from '../context/LangContext.jsx'
import { LOGOS, DEMOS } from '../data/siteContent.js'
import styles from './Demos.module.css'

const PlaceholderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="m21 15-5-5L5 21"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10h12M10 4l6 6-6 6"/>
  </svg>
)

export default function Demos() {
  const { t } = useLang()

  return (
    <section id="demos" className={styles.demosSection}>
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t('demos.kicker')}</span>
          <h2>{t('demos.title')}</h2>
          <p className="desc">{t('demos.desc')}</p>
        </div>

        {/* ── Logos strip ── */}
        <div className={styles.logosStrip} aria-label={t('demos.clientsLabel')}>
          <div className={styles.logosTrack}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo.id}-${i}`}
                className={styles.logoItem}
                aria-hidden={i >= LOGOS.length ? 'true' : undefined}
              >
                {logo.src
                  ? <img src={logo.src} alt={logo.label} />
                  : <div className={styles.logoPlaceholder}>{logo.label}</div>
                }
              </div>
            ))}
          </div>
        </div>

        {/* ── Demo grid ── */}
        <div className={styles.demoGrid}>
          {DEMOS.map(demo => (
            <div key={demo.id} className={styles.demoCard}>
              <div className={styles.demoImgWrap}>
                {demo.img
                  ? <img src={demo.img} alt={demo.title} />
                  : <div className={styles.demoPlaceholder}><PlaceholderIcon /></div>
                }
              </div>
              <div className={styles.demoContent}>
                <span className={styles.demoBadge}>{demo.badge}</span>
                <div className={styles.demoTitle}>{demo.title}</div>
                <p className={styles.demoDesc}>{demo.desc}</p>
                {demo.link
                  ? (
                    <a
                      href={demo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.demoBtn} ${styles.demoBtnActive}`}
                    >
                      {t('demos.btn')} <ArrowIcon />
                    </a>
                  )
                  : (
                    <span className={`${styles.demoBtn} ${styles.demoBtnDisabled}`}>
                      {t('demos.soon')}
                    </span>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}