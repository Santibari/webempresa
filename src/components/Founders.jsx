import { useLang } from '../context/LangContext.jsx'
import { FOUNDERS } from '../data/siteContent.js'
import styles from './Founders.module.css'

export default function Founders() {
  const { t } = useLang()

  return (
    <section id="equipo">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t('founders.kicker')}</span>
          <h2>{t('founders.title')}</h2>
          <p className="desc">{t('founders.desc')}</p>
        </div>
        <div className={styles.foundersGrid}>
          {FOUNDERS.map(f => (
            <div key={f.name} className={styles.founderCard}>
              <div className={styles.founderPhoto}>
                {f.photo
                  ? <img src={f.photo} alt={f.name} />
                  : f.initials
                }
              </div>
              <div className={styles.founderName}>{f.name}</div>
              <div className={styles.founderRole}>{t('founders.role')}</div>
              <span className={styles.founderTag}>{t('founders.tag')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}