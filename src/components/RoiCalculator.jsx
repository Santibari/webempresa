import { useMemo, useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useLead } from '../context/LeadContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useCountUp } from '../hooks/useCountUp.js'
import SplitReveal from './motion/SplitReveal.jsx'
import Parallax from './motion/Parallax.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { ArrowRight } from './ui/Icons.jsx'
import styles from './RoiCalculator.module.css'

const CFG = {
  es: { currency: 'COP', locale: 'es-CO', cost: { min: 8000, max: 150000, step: 1000, def: 25000 }, maxFrac: 0 },
  en: { currency: 'USD', locale: 'en-US', cost: { min: 5, max: 150, step: 1, def: 22 }, maxFrac: 0 },
}

function Slider({ label, unit, value, min, max, step, onChange, format }) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <label className={styles.slider}>
      <span className={styles.sliderHead}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderVal}>{format ? format(value) : value}<small>{unit}</small></span>
      </span>
      <input
        type="range"
        className="range"
        min={min} max={max} step={step} value={value}
        style={{ '--fill': `${fill}%` }}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className={styles.sliderScale}><span>{format ? format(min) : min}</span><span>{format ? format(max) : max}</span></span>
    </label>
  )
}

export default function RoiCalculator() {
  const { t, lang } = useLang()
  const { sendToForm } = useLead()
  const sectionRef = useScrollReveal()
  const onMove = useSpotlight()
  const cfg = CFG[lang] ?? CFG.es

  const [people, setPeople] = useState(4)
  const [hours, setHours] = useState(8)
  const [cost, setCost] = useState(cfg.cost.def)
  const [auto, setAuto] = useState(60)

  const money = useMemo(
    () => new Intl.NumberFormat(cfg.locale, { style: 'currency', currency: cfg.currency, maximumFractionDigits: cfg.maxFrac }),
    [cfg]
  )
  const compact = useMemo(
    () => new Intl.NumberFormat(cfg.locale, { style: 'currency', currency: cfg.currency, notation: 'compact', maximumFractionDigits: 1 }),
    [cfg]
  )

  const out = useMemo(() => {
    const weeklyHours = people * hours
    const savedWeekly = weeklyHours * (auto / 100)
    const savedYear = savedWeekly * 48
    const moneyYear = savedYear * cost
    const fte = savedWeekly / 40
    return { savedYear, moneyYear, fte, weeklyHours }
  }, [people, hours, cost, auto])

  const aHours = useCountUp(out.savedYear)
  const aMoney = useCountUp(out.moneyYear)
  const aFte = useCountUp(out.fte, { decimals: 1 })

  const handleSend = () => {
    const msg =
      `${t('roi.msg.intro')}\n` +
      `• ${t('roi.people')}: ${people}\n` +
      `• ${t('roi.hours')}: ${hours} ${t('roi.hours.unit')}\n` +
      `• ${t('roi.cost')}: ${money.format(cost)}\n` +
      `• ${t('roi.auto')}: ${auto}%\n` +
      `→ ${t('roi.out.hours')}: ${Math.round(out.savedYear).toLocaleString(cfg.locale)} ${t('roi.out.hoursUnit')}\n` +
      `→ ${t('roi.out.money')}: ${money.format(Math.round(out.moneyYear))}`
    sendToForm({ interes: 'ia', mensaje: msg, source: 'roi' })
  }

  return (
    <section id="roi" className={styles.section} ref={sectionRef}>
      <Parallax speed={140} className={styles.bgNumber} aria-hidden="true">
        {compact.format(out.moneyYear)}
      </Parallax>

      <div className="wrap">
        <div className={styles.layout}>
          <div className={`${styles.copy} reveal`}>
            <span className="kicker">{t('roi.kicker')}</span>
            <SplitReveal text={t('roi.title')} tail={<span className="accentDot">.</span>} className={styles.title} />
            <p className={styles.desc}>{t('roi.desc')}</p>

            <div className={styles.assump}>
              <span className="tag-mono">{t('roi.assump')}</span>
              <p>{t('roi.assump.text')}</p>
            </div>

            <div className={styles.philosophyNote}>
              <span className="tag-mono">filosofía // human first</span>
              <p>{t('roi.philosophy.note')}</p>
            </div>
          </div>

          <div className={`${styles.calc} glow-card reveal stagger-1`} onMouseMove={onMove}>
            <div className={styles.inputs}>
              <Slider label={t('roi.people')} unit={` ${t('roi.people.unit')}`} value={people} min={1} max={50} step={1} onChange={setPeople} />
              <Slider label={t('roi.hours')} unit={` ${t('roi.hours.unit')}`} value={hours} min={1} max={30} step={1} onChange={setHours} />
              <Slider label={t('roi.cost')} unit="" value={cost} min={cfg.cost.min} max={cfg.cost.max} step={cfg.cost.step} onChange={setCost} format={v => money.format(v)} />
              <Slider label={t('roi.auto')} unit="%" value={auto} min={20} max={90} step={5} onChange={setAuto} />
            </div>

            <div className={styles.outputs}>
              <div className={styles.outMain}>
                <span className="tag-mono">{t('roi.out.money')}</span>
                <span className={styles.outBig}>{money.format(Math.round(aMoney))}</span>
                <span className={styles.outSub}>{t('roi.out.perYear')}</span>
              </div>
              <div className={styles.outRow}>
                <div className={styles.outItem}>
                  <span className="tag-mono">{t('roi.out.hours')}</span>
                  <span className={styles.outNum}>{Math.round(aHours).toLocaleString(cfg.locale)} <small>{t('roi.out.hoursUnit')}</small></span>
                </div>
                <div className={styles.outItem}>
                  <span className="tag-mono">{t('roi.out.fte')}</span>
                  <span className={styles.outNum}>{aFte.toFixed(1)} <small>{t('roi.out.fteUnit')}</small></span>
                </div>
              </div>

              <div className={styles.outCta}>
                <MagneticButton as="button" type="button" onClick={handleSend} icon={<ArrowRight />}>
                  {t('roi.cta')}
                </MagneticButton>
                <span className={styles.note}>{t('roi.note')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
