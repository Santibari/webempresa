import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './Process.module.css'

export default function Process() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="proceso" className={styles.processSection} ref={sectionRef}>
      <div className="wrap">
        
        <div className="section-head reveal">
          <span className="kicker">{t('process.kicker')}</span>
          <h2>
            {t('process.title')}
            <span className="accentDot">.</span>
          </h2>
        </div>

        {/* Timeline Asimétrico (60/40 en fila 1, barra consolidada en fila 2) */}
        <div className={styles.processLayout}>
          
          {/* Fila 1: Fase 1 (60%) y Fase 2 (40%) */}
          <div className={styles.rowTop}>
            
            <div className={`${styles.phaseCard} ${styles.phaseWide} reveal stagger-1`}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseIndex}>phase // 01</span>
                <span className={styles.phaseTag}>diagnóstico previo</span>
              </div>
              <h3>{t('process.s1.title')}</h3>
              <p>{t('process.s1.desc')}</p>
              <div className={styles.phaseDeliverable}>
                <span className={styles.deliverableLabel}>entregable:</span>
                <span className={styles.deliverableVal}>especificación de arquitectura técnica</span>
              </div>
            </div>

            <div className={`${styles.phaseCard} ${styles.phaseNarrow} reveal stagger-2`}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseIndex}>phase // 02</span>
                <span className={styles.phaseTag}>sprints semanales</span>
              </div>
              <h3>{t('process.s2.title')}</h3>
              <p>{t('process.s2.desc')}</p>
              <div className={styles.phaseDeliverable}>
                <span className={styles.deliverableLabel}>entregable:</span>
                <span className={styles.deliverableVal}>código en staging con pruebas unitarias</span>
              </div>
            </div>

          </div>

          {/* Fila 2: Fase 3 (100% Barra de Estabilidad Técnica) */}
          <div className={`${styles.phaseCard} ${styles.phaseFull} reveal stagger-3`}>
            <div className={styles.phaseHeader}>
              <span className={styles.phaseIndex}>phase // 03</span>
              <span className={styles.phaseTag}>puesta en producción</span>
            </div>
            
            <div className={styles.fullContent}>
              <div className={styles.fullText}>
                <h3>{t('process.s3.title')}</h3>
                <p>{t('process.s3.desc')}</p>
              </div>

              <div className={styles.telemetryStrip}>
                <div className={styles.telemetryItem}>
                  <span className={styles.tLabel}>monitoreo</span>
                  <span className={styles.tValue}>alertas y métricas en vivo</span>
                </div>
                <div className={styles.telemetryItem}>
                  <span className={styles.tLabel}>propiedad</span>
                  <span className={styles.tValue}>repositorio 100% del cliente</span>
                </div>
                <div className={styles.telemetryItem}>
                  <span className={styles.tLabel}>soporte</span>
                  <span className={styles.tValue}>acompañamiento continuo</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}