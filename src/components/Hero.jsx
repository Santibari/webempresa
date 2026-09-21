import { useLang } from '../context/LangContext.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLang()
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.heroGrid}`}>
        <div>
          <span className="eyebrow-tag">
            <span className="eyebrow-dot"></span>
            {t('hero.eyebrow')}
          </span>
          <h1>
            {t('hero.title')}{' '}
            <span className={styles.accent}>{t('hero.accent')}</span>
          </h1>
          <p className={styles.sub}>{t('hero.sub')}</p>
          <div className={styles.ctaRow}>
            <a href="#contacto" className="btn btn-primary">{t('hero.cta')}</a>
            <a href="#servicios" className="btn btn-tinted">{t('hero.ctaSec')}</a>
          </div>
          <div className={styles.heroProof}>
            <div>
              <div className={styles.proofNum}>+1</div>
              <div className={styles.proofLabel}>{t('hero.proof1')}</div>
            </div>
            <div>
              <div className={styles.proofNum}>3</div>
              <div className={styles.proofLabel}>{t('hero.proof2')}</div>
            </div>
            <div>
              <div className={styles.proofNum}>100%</div>
              <div className={styles.proofLabel}>{t('hero.proof3')}</div>
            </div>
          </div>
        </div>

        <div className={styles.deviceStage}>
          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              <div className={styles.screenTopbar}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
              <div className={styles.uiCard}>
                <div className={styles.uiRow}>
                  <div>
                    <span className={styles.uiPill}>Ventas del mes</span>
                    <div className={styles.uiChart}>
                      <svg viewBox="0 0 200 64" preserveAspectRatio="none">
                        <polyline
                          points="0,50 30,42 60,46 90,28 120,32 150,14 180,20 200,8"
                          fill="none" stroke="#0e6b4f" strokeWidth="3"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className={styles.uiBar} style={{marginBottom:'8px'}}></div>
                    <div className={`${styles.uiBar} ${styles.short}`} style={{marginBottom:'8px'}}></div>
                    <div className={styles.uiBar}></div>
                  </div>
                </div>
                <div className={styles.uiRowDouble}>
                  <div className={styles.uiBarBlock}></div>
                  <div className={`${styles.uiBarBlock} ${styles.uiBarGreen}`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.phone}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneNotch}></div>
              <div className={styles.phoneCard}>
                <div className={styles.phoneAvatar}></div>
                <div className={`${styles.phoneLine} ${styles.w60}`}></div>
                <div className={`${styles.phoneLine} ${styles.w40}`}></div>
                <div className={styles.phoneBtn}>Nuevo pedido</div>
              </div>
              <div className={styles.phoneCard} style={{marginTop:'12px'}}>
                <div className={`${styles.phoneLine} ${styles.w40}`}></div>
                <div className={`${styles.phoneLine} ${styles.w60}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}