import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SplitReveal from './motion/SplitReveal.jsx'
import Parallax from './motion/Parallax.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { ArrowRight, WhatsApp } from './ui/Icons.jsx'
import styles from './CtaBand.module.css'

const WA_URL = 'https://wa.me/573053704481?text=Hola%20Aikata%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20t%C3%A9cnico'

export default function CtaBand() {
  const { t, lang } = useLang()
  const sectionRef = useScrollReveal()

  return (
    <section className={styles.band} id="cierre" ref={sectionRef}>
      <div className="wrap">
        <div className={`${styles.box} reveal`}>
          <Parallax speed={-90} className={styles.kanji} aria-hidden="true">相方</Parallax>

          <div className={styles.text}>
            <span className={styles.kicker}>{t('cta.kicker')}</span>
            <SplitReveal key={lang} text={t('cta.title')} tail={<span className="accentDot">.</span>} className={styles.title} />
            <p>{t('cta.desc')}</p>
          </div>

          <div className={styles.actions}>
            <MagneticButton href="#contacto" size="lg" icon={<ArrowRight />}>
              {t('cta.btn')}
            </MagneticButton>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className={`btn btn-tinted btn-lg ${styles.wa}`}>
              <WhatsApp style={{ width: 18, height: 18, marginRight: 10 }} />
              <span>{t('cta.wa')}</span>
            </a>
            <span className={styles.note}>{t('cta.note')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
