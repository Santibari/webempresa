import { useState, useRef, useEffect } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { LOGOS, DEMOS } from '../data/siteContent.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import Skeleton from './Skeleton.jsx'
import styles from './Demos.module.css'

export default function Demos() {
  const { t } = useLang()
  const demo = DEMOS[0] // Holy Family Preschool
  const sectionRef = useScrollReveal({ threshold: 0.1 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageLoaded(true)
    }
  }, [])

  return (
    <section id="demos" className={styles.demosSection} ref={sectionRef}>
      <div className="wrap">
        
        {/* Encabezado Asimétrico */}
        <div className="section-head reveal">
          <span className="kicker">{t('demos.kicker')}</span>
          <h2>
            {t('demos.title')}
            <span className="accentDot">.</span>
          </h2>
          <p className="desc">{t('demos.desc')}</p>
        </div>

        {/* ── Tira de Aliados Técnicos ── */}
        <div className={`${styles.logosStrip} reveal`} aria-label={t('demos.clientsLabel')}>
          <div className={styles.logosTrack}>
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo.id}-${i}`}
                className={styles.logoItem}
                aria-hidden={i >= LOGOS.length ? 'true' : undefined}
              >
                {logo.src ? (
                  <img src={logo.src} alt={logo.label} />
                ) : (
                  <div className={styles.logoPlaceholder}>// {logo.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stage Spotlight del Proyecto Holy Family ── */}
        <div className={`${styles.spotlightContainer} reveal stagger-1`}>
          {/* Barra de Control / Browser Window Chrome */}
          <div className={styles.spotlightTopBar}>
            <div className={styles.browserDots}>
              <span className={styles.dotRed}></span>
              <span className={styles.dotYellow}></span>
              <span className={styles.dotGreen}></span>
              <span className={styles.browserUrl}>
                <svg className={styles.lockIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                https://www.holyfamily.com.co
              </span>
            </div>

            <div className={styles.statusBadge}>
              <span className={styles.livePulse}></span>
              <span>{t('demos.statusActive')}</span>
            </div>
          </div>

          {/* Ventana de visualización interactiva */}
          <div className={styles.spotlightGrid}>
            
            {/* Visual Izquierdo con Enlace Directo a Holy Family */}
            <a
              href={demo.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visualLink}
              title={t('demos.previewTooltip')}
            >
              <div className={styles.stageVisual}>
                {!imageLoaded && (
                  <Skeleton
                    width="100%"
                    height="100%"
                    borderRadius="12px"
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                  />
                )}
                <img
                  ref={imgRef}
                  src={demo.img}
                  alt={demo.title}
                  className={styles.stageImg}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  style={{
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease'
                  }}
                />
                <div className={styles.hoverOverlay}>
                  <div className={styles.overlayPill}>
                    <span>{t('demos.visitSite')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.arrowIcon}>
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                  <span className={styles.overlayHint}>{t('demos.previewTooltip')}</span>
                </div>
              </div>
            </a>

            {/* Especificación Técnica Derecha */}
            <div className={styles.stageSpec}>
              <div className={styles.specHeader}>
                <span className={styles.demoBadge}>[{demo.badge}]</span>
                <span className={styles.techTag}>prod // verified</span>
              </div>

              <h3 className={styles.demoTitle}>{demo.title}</h3>
              <p className={styles.demoDesc}>{demo.desc}</p>

              {/* Ficha técnica de estado y arquitectura */}
              <div className={styles.metricList}>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Estado operativo:</span>
                  <span className={styles.metricValActive}>
                    <span className={styles.statusDot}></span>
                    {t('demos.statusActive')}
                  </span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Despliegue:</span>
                  <span className={styles.metricVal}>Producción continua</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Arquitectura:</span>
                  <span className={styles.metricVal}>Web Moderna / Responsive / SEO</span>
                </div>
              </div>

              <div className={styles.stageActions}>
                <a
                  href={demo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>{t('demos.btn')}</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#contacto"
                  className="btn btn-tinted"
                >
                  {t('demos.similarCta')}
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}