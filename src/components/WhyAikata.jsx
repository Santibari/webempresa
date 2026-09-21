import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './WhyAikata.module.css'

export default function WhyAikata() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })

  const pillars = [
    { num: '01', titleKey: 'why.p1.title', descKey: 'why.p1.desc' },
    { num: '02', titleKey: 'why.p2.title', descKey: 'why.p2.desc' },
    { num: '03', titleKey: 'why.p3.title', descKey: 'why.p3.desc' },
    { num: '04', titleKey: 'why.p4.title', descKey: 'why.p4.desc' },
  ]

  return (
    <section id="por-que-aikata" className={styles.whySection} ref={sectionRef}>
      <div className="wrap">
        
        {/* Bento Grid Asimétrico (65/35) */}
        <div className={styles.whyBento}>
          
          {/* Card Principal (65%): Verbatim Concept & Kanji */}
          <div className={`${styles.conceptCard} reveal`}>
            <div className={styles.kanjiWatermark} aria-hidden="true">相方</div>
            
            <div className={styles.conceptContent}>
              <div className={styles.badgeWrap}>
                <span className={styles.badge}>{t('why.badge')}</span>
              </div>
              
              <h2 className={styles.conceptTitle}>
                {t('why.title')}
                <span className="accentDot">.</span>
              </h2>
              
              <p className={styles.leadText}>
                {t('why.lead')}
              </p>

              <div className={styles.quoteFooter}>
                <span className={styles.quoteSource}>[aikata // compañerismo técnico]</span>
              </div>
            </div>
          </div>

          {/* Columna Lateral (35%): 4 Pilares de Operación */}
          <div className={styles.pillarsColumn}>
            {pillars.map((p, i) => (
              <div key={p.num} className={`${styles.pillarItem} reveal stagger-${i + 1}`}>
                <div className={styles.pillarIndex}>// {p.num}</div>
                <div className={styles.pillarBody}>
                  <h4>{t(p.titleKey)}</h4>
                  <p>{t(p.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}