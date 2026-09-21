import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="servicios" className={styles.servicesSection} ref={sectionRef}>
      <div className="wrap">
        
        <div className="section-head reveal">
          <span className="kicker">{t('services.kicker')}</span>
          <h2>{t('services.title')}<span className="accentDot">.</span></h2>
          <p className="desc">{t('services.desc')}</p>
        </div>

        {/* Bento Grid Asimétrico (65/35 arriba, 40/60 abajo) */}
        <div className={styles.bentoGrid}>

          {/* Card 1 (65%): Desarrollo Web y Móvil */}
          <div className={`${styles.card} ${styles.cardWide} reveal stagger-1`}>
            <div className={styles.cardHeader}>
              <span className={styles.techTag}>// 01 · core engineering</span>
              <span className={styles.specBadge}>arquitectura modular</span>
            </div>
            
            <div className={styles.cardContent}>
              <h3>{t('services.web.title')}</h3>
              <p>{t('services.web.desc')}</p>

              {/* Stack de capacidades en Geist Mono con radio concéntrico */}
              <div className={styles.techStack}>
                <span className={styles.stackPill}>[react // next]</span>
                <span className={styles.stackPill}>[node // python]</span>
                <span className={styles.stackPill}>[postgres // sqlite]</span>
                <span className={styles.stackPill}>[pwa // ios // android]</span>
              </div>
            </div>
          </div>

          {/* Card 2 (35%): E-commerce e Integraciones */}
          <div className={`${styles.card} ${styles.cardNarrow} reveal stagger-2`}>
            <div className={styles.cardHeader}>
              <span className={styles.techTag}>// 02 · transacciones</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{t('services.ecom.title')}</h3>
              <p>{t('services.ecom.desc')}</p>

              <div className={styles.flowPipeline}>
                <span className={styles.pipelineNode}>checkout</span>
                <span className={styles.pipelineArrow}>→</span>
                <span className={styles.pipelineNode}>pasarela</span>
                <span className={styles.pipelineArrow}>→</span>
                <span className={styles.pipelineNode}>erp</span>
              </div>
            </div>
          </div>

          {/* Card 3 (40%): IA Aplicada sobre Datos Reales */}
          <div className={`${styles.card} ${styles.cardThird} reveal stagger-3`}>
            <div className={styles.cardHeader}>
              <span className={styles.techTag}>// 03 · analítica</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{t('services.ai.title')}</h3>
              <p>{t('services.ai.desc')}</p>

              <div className={styles.dataMetricBox}>
                <span className={styles.dataLabel}>entrenamiento</span>
                <span className={styles.dataValue}>datos propios</span>
              </div>
            </div>
          </div>

          {/* Card 4 (60%): Consultoría de Arquitectura */}
          <div className={`${styles.card} ${styles.cardTwoThirds} reveal stagger-4`}>
            <div className={styles.cardHeader}>
              <span className={styles.techTag}>// 04 · diagnóstico</span>
              <span className={styles.specBadge}>código limpio & auditoría</span>
            </div>

            <div className={styles.cardContent}>
              <h3>{t('services.consult.title')}</h3>
              <p>{t('services.consult.desc')}</p>

              <div className={styles.auditChecklist}>
                <div className={styles.checkItem}>
                  <span className={styles.checkMark}>✓</span>
                  <span>evaluación de cuellos de botella</span>
                </div>
                <div className={styles.checkItem}>
                  <span className={styles.checkMark}>✓</span>
                  <span>análisis de seguridad & deuda técnica</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}