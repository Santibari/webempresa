import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import SplitReveal from './motion/SplitReveal.jsx'
import { ArrowUpRight, Check } from './ui/Icons.jsx'
import styles from './Services.module.css'

export default function Services() {
  const { t, lang } = useLang()
  const sectionRef = useScrollReveal()
  const onMove = useSpotlight()

  return (
    <section id="servicios" className={styles.section} ref={sectionRef}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">{t('services.kicker')}</span>
          <SplitReveal key={lang} text={t('services.title')} tail={<span className="accentDot">.</span>} />
          <p className="desc">{t('services.desc')}</p>
        </div>

        {/* Bento asimétrico: 7/5 arriba, tarjeta alta a la derecha, 4/3 abajo */}
        <div className={styles.bento} onMouseMove={onMove}>

          {/* 01 · Web & móvil (ancha) */}
          <a href="#estimador" className={`glow-card ${styles.card} ${styles.c1} reveal stagger-1`}>
            <span className={styles.watermark} aria-hidden="true">01</span>
            <div className={styles.cardTop}>
              <span className="tag-mono">01 · core engineering</span>
              <span className={styles.go}><ArrowUpRight /></span>
            </div>
            <div className={styles.cardBody}>
              <h3>{t('services.web.title')}</h3>
              <p>{t('services.web.desc')}</p>
            </div>
            <div className={styles.stack}>
              {['react / next', 'node / python', 'postgres', 'pwa · ios · android'].map(s => <span key={s}>{s}</span>)}
            </div>
            <span className={styles.cardCta}>{t('services.cta')}</span>
          </a>

          {/* 02 · E-commerce (alta) */}
          <a href="#estimador" className={`glow-card ${styles.card} ${styles.c2} reveal stagger-2`}>
            <span className={styles.watermark} aria-hidden="true">02</span>
            <div className={styles.cardTop}>
              <span className="tag-mono">02 · transacciones</span>
              <span className={styles.go}><ArrowUpRight /></span>
            </div>
            <div className={styles.cardBody}>
              <h3>{t('services.ecom.title')}</h3>
              <p>{t('services.ecom.desc')}</p>
            </div>
            <div className={styles.pipeline}>
              {['checkout', 'pasarela', 'erp / crm', 'facturación'].map((n, i, arr) => (
                <div key={n} className={styles.pipeNode} style={{ animationDelay: `${i * 0.5}s` }}>
                  <span>{n}</span>
                  {i < arr.length - 1 && <i />}
                </div>
              ))}
            </div>
            <span className={styles.cardCta}>{t('services.cta')}</span>
          </a>

          {/* 03 · IA aplicada */}
          <a href="#roi" className={`glow-card ${styles.card} ${styles.c3} reveal stagger-3`}>
            <span className={styles.watermark} aria-hidden="true">03</span>
            <div className={styles.cardTop}>
              <span className="tag-mono">03 · analítica</span>
              <span className={styles.go}><ArrowUpRight /></span>
            </div>
            <div className={styles.cardBody}>
              <h3>{t('services.ai.title')}</h3>
              <p>{t('services.ai.desc')}</p>
            </div>
            <div className={styles.metric}>
              <span className="tag-mono">entrenamiento</span>
              <b>datos propios</b>
            </div>
            <span className={styles.cardCta}>{t('services.ctaRoi')}</span>
          </a>

          {/* 04 · Consultoría */}
          <a href="#contacto" className={`glow-card ${styles.card} ${styles.c4} reveal stagger-4`}>
            <span className={styles.watermark} aria-hidden="true">04</span>
            <div className={styles.cardTop}>
              <span className="tag-mono">04 · diagnóstico</span>
              <span className={styles.go}><ArrowUpRight /></span>
            </div>
            <div className={styles.cardBody}>
              <h3>{t('services.consult.title')}</h3>
              <p>{t('services.consult.desc')}</p>
            </div>
            <ul className={styles.checks}>
              <li><Check /> {t('services.consult.c1')}</li>
              <li><Check /> {t('services.consult.c2')}</li>
            </ul>
            <span className={styles.cardCta}>{t('services.ctaAudit')}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
