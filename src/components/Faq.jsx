import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SplitReveal from './motion/SplitReveal.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { Plus } from './ui/Icons.jsx'
import styles from './Faq.module.css'

const ITEMS = [1, 2, 3, 4, 5, 6, 7]

export default function Faq() {
  const { t } = useLang()
  const sectionRef = useScrollReveal()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className={styles.section} ref={sectionRef}>
      <div className="wrap">
        <div className={styles.layout}>
          <div className={`${styles.side} reveal`}>
            <span className="kicker">{t('faq.kicker')}</span>
            <SplitReveal text={t('faq.title')} tail={<span className="accentDot">.</span>} className={styles.title} />
            <p className={styles.desc}>{t('faq.desc')}</p>
            <div className={styles.sideCta}>
              <MagneticButton href="#contacto">{t('faq.cta')}</MagneticButton>
              <span className={styles.sideNote}>{t('faq.ctaSub')}</span>
            </div>
          </div>

          <div className={`${styles.list} reveal stagger-1`}>
            {ITEMS.map((n, i) => {
              const isOpen = open === i
              return (
                <div key={n} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                  <button
                    type="button"
                    className={styles.qBtn}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${n}`}
                  >
                    <span className={styles.qIdx}>0{n}</span>
                    <span className={styles.qText}>{t(`faq.q${n}`)}</span>
                    <span className={styles.qIcon}><Plus /></span>
                  </button>
                  <div id={`faq-a-${n}`} className={styles.aWrap} role="region">
                    <div className={styles.aInner}>
                      <p>{t(`faq.a${n}`)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
