import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()
  const heroRef = useScrollReveal({ threshold: 0.05 })

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={`wrap ${styles.heroGrid}`}>
        
        {/* Columna Izquierda (60%): Manifiesto y Acción */}
        <div className={`${styles.heroCopy} reveal`}>
          <div className="eyebrow-tag">
            <span className="eyebrow-dot"></span>
            <span>{t('hero.eyebrow')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {t('hero.title')}{' '}
            <span className={styles.accent}>{t('hero.accent')}</span>
            <span className="accentDot">.</span>
          </h1>

          <p className={styles.heroSub}>{t('hero.sub')}</p>

          <div className={styles.ctaRow}>
            <a href="#contacto" className="btn btn-primary">
              {t('hero.cta')}
            </a>
            <a href="#servicios" className="btn-mono">
              <span>{t('hero.ctaSec')}</span>
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <div className={styles.heroProof}>
            <div className={styles.proofItem}>
              <div className={styles.proofIndex}>// 01</div>
              <div className={styles.proofNum}>+1</div>
              <div className={styles.proofLabel}>{t('hero.proof1')}</div>
            </div>
            <div className={styles.proofItem}>
              <div className={styles.proofIndex}>// 02</div>
              <div className={styles.proofNum}>3 sem</div>
              <div className={styles.proofLabel}>{t('hero.proof2')}</div>
            </div>
            <div className={styles.proofItem}>
              <div className={styles.proofIndex}>// 03</div>
              <div className={styles.proofNum}>100%</div>
              <div className={styles.proofLabel}>{t('hero.proof3')}</div>
            </div>
          </div>
        </div>

        {/* Columna Derecha (40%): Ficha Arquitectónica con Sangrado Inferior */}
        <div className={`${styles.specStage} reveal stagger-2`}>
          <div className={styles.specCard}>
            
            {/* Cabecera del archivo de configuración / manifiesto */}
            <div className={styles.specHeader}>
              <div className={styles.specDots}>
                <span className={styles.specDot}></span>
                <span className={styles.specDot}></span>
                <span className={styles.specDot}></span>
              </div>
              <span className={styles.specFileName}>aikata.manifest.ts</span>
              <span className={styles.specLiveBadge}>
                <span className={styles.livePulse}></span>
                operativo
              </span>
            </div>

            {/* Bloque de código / arquitectura técnica */}
            <div className={styles.specBody}>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>01</span>
                <span className={styles.codeKeyword}>interface</span>{' '}
                <span className={styles.codeType}>OperationalStack</span> {'{'}
              </div>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>02</span>
                <span className={styles.codeIndent}>client:</span>{' '}
                <span className={styles.codeStr}>'Pyme & Enterprise'</span>;
              </div>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>03</span>
                <span className={styles.codeIndent}>architecture:</span>{' '}
                <span className={styles.codeStr}>'Modular Event-Driven'</span>;
              </div>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>04</span>
                <span className={styles.codeIndent}>deliveryCycle:</span>{' '}
                <span className={styles.codeNum}>14</span>{' '}
                <span className={styles.codeComment}>/* días primer release */</span>;
              </div>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>05</span>
                <span className={styles.codeIndent}>partnership:</span>{' '}
                <span className={styles.codeType}>AikataCompanion</span>;
              </div>
              <div className={styles.codeRow}>
                <span className={styles.lineNum}>06</span>
                {'}'}
              </div>
            </div>

            {/* Telemetría y diagnóstico en vivo */}
            <div className={styles.specTelemetry}>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>pipeline_health</span>
                <span className={styles.telemetryVal}>99.98% ok</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>database_sync</span>
                <span className={styles.telemetryVal}>0.12s latency</span>
              </div>
              <div className={styles.telemetryRow}>
                <span className={styles.telemetryLabel}>engineering_mode</span>
                <span className={styles.telemetryVal}>active_pair</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}