import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { FOUNDERS } from '../data/siteContent.js'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import Skeleton from './Skeleton.jsx'
import styles from './Founders.module.css'

function FounderAvatar({ photo, name, initials }) {
  const [loaded, setLoaded] = useState(false)

  if (!photo) {
    return (
      <div className={styles.engineerAvatar}>
        <span className={styles.avatarInitials}>{initials}</span>
      </div>
    )
  }

  return (
    <div className={styles.engineerAvatar} style={{ position: 'relative' }}>
      {!loaded && (
        <Skeleton
          width="100%"
          height="100%"
          borderRadius="50%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      <img
        src={photo}
        alt={name}
        className={styles.avatarImg}
        onLoad={() => setLoaded(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.35s ease'
        }}
      />
    </div>
  )
}

export default function Founders() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })

  const founderSpecs = {
    'Pablo Boada': 'arquitectura web & interfaces',
    'Santiago Bazzani': 'backend & sistemas de datos',
    'Juan David Henao': 'infraestructura & despliegue',
  }

  return (
    <section id="equipo" className={styles.foundersSection} ref={sectionRef}>
      <div className="wrap">
        
        {/* Layout Asimétrico de Estudio de Ingeniería (40/60) */}
        <div className={styles.foundersLayout}>

          {/* Panel Izquierdo (40%): Manifiesto y Credenciales */}
          <div className={`${styles.manifestoCard} reveal`}>
            <span className={styles.manifestoKicker}>// colectivo técnico</span>
            <h2 className={styles.manifestoTitle}>
              {t('founders.title')}
              <span className="accentDot">.</span>
            </h2>
            <p className={styles.manifestoDesc}>{t('founders.desc')}</p>

            <div className={styles.credentialList}>
              <div className={styles.credentialItem}>
                <span className={styles.credDot}>■</span>
                <span>Comunicación directa con quienes escriben el código</span>
              </div>
              <div className={styles.credentialItem}>
                <span className={styles.credDot}>■</span>
                <span>Sin intermediarios comerciales ni gestores distantes</span>
              </div>
              <div className={styles.credentialItem}>
                <span className={styles.credDot}>■</span>
                <span>Diseño e ingeniería bajo estándares formales</span>
              </div>
            </div>
          </div>

          {/* Roster de Ingenieros (60%): Lista Asimétrica */}
          <div className={styles.foundersRoster}>
            {FOUNDERS.map((f, i) => (
              <div key={f.name} className={`${styles.engineerCard} reveal stagger-${i + 1}`}>
                <div className={styles.engineerIndex}>0{i + 1}</div>
                
                <FounderAvatar
                  photo={f.photo}
                  name={f.name}
                  initials={f.initials}
                />

                <div className={styles.engineerInfo}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.engineerName}>{f.name}</h3>
                    <span className={styles.roleTag}>{t('founders.role')}</span>
                  </div>
                  <div className={styles.specialtyTag}>
                    [{founderSpecs[f.name] || t('founders.tag')}]
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}