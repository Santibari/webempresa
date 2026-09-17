import { useLang } from '../context/LangContext.jsx'
import styles from './Process.module.css'

export default function Process() {
  const { t } = useLang()
  const steps = [
    { num: '01', titleKey: 'process.s1.title', descKey: 'process.s1.desc' },
    { num: '02', titleKey: 'process.s2.title', descKey: 'process.s2.desc' },
    { num: '03', titleKey: 'process.s3.title', descKey: 'process.s3.desc' },
  ]
  return (
    <section id="proceso">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{t('process.kicker')}</span>
          <h2>{t('process.title')}</h2>
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={s.num} className={styles.step}>
              {i < steps.length - 1 && <div className={styles.connector} aria-hidden="true" />}
              <div className={styles.stepNum}>{s.num}</div>
              <h3>{t(s.titleKey)}</h3>
              <p>{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}