import { useMemo, useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useLead } from '../context/LeadContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useCountUp } from '../hooks/useCountUp.js'
import SplitReveal from './motion/SplitReveal.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { ArrowRight, Check } from './ui/Icons.jsx'
import styles from './Estimator.module.css'

/* ── Modelo de estimación (editable) ─────────────────────── */
const TYPES = [
  { id: 'web-movil',   base: 6, stack: 'React · Node · PostgreSQL',        tKey: 'web' },
  { id: 'ecommerce',   base: 5, stack: 'Next.js · Pasarela · Sync ERP',    tKey: 'ecom' },
  { id: 'ia',          base: 7, stack: 'Python · LLM / ML · Postgres',     tKey: 'ai' },
  { id: 'consultoria', base: 2, stack: 'Auditoría · ADRs · Roadmap',       tKey: 'audit' },
]
const MODULES = [
  { id: 'auth',   w: 1.0 }, { id: 'pay',    w: 1.5 }, { id: 'inv',    w: 1.5 }, { id: 'dash', w: 1.5 },
  { id: 'api',    w: 2.0 }, { id: 'mobile', w: 3.0 }, { id: 'ai',     w: 3.0 }, { id: 'rt',   w: 2.0 },
]
const TEAM = [{ id: 's', k: 1.0 }, { id: 'm', k: 1.15 }, { id: 'l', k: 1.35 }]
const TIME = [{ id: 'urgent' }, { id: 'normal' }, { id: 'flex' }]

function estimate({ type, mods, team, time }) {
  const t = TYPES.find(x => x.id === type) ?? TYPES[0]
  const modW = mods.reduce((acc, id) => acc + (MODULES.find(m => m.id === id)?.w ?? 0), 0)
  const k = TEAM.find(x => x.id === team)?.k ?? 1
  let weeks = (t.base + modW) * k
  const mvp = time === 'urgent' && weeks > 5
  if (mvp) weeks = Math.max(4, weeks * 0.6) // alcance recortado a MVP
  const min = Math.max(2, Math.round(weeks * 0.85))
  const max = Math.max(min + 1, Math.round(weeks * 1.2))
  const pilot = Math.max(2, Math.min(4, Math.round(weeks * 0.3)))
  const complexity = weeks < 4 ? 1 : weeks < 7 ? 2 : weeks < 10 ? 3 : weeks < 14 ? 4 : 5
  return { min, max, pilot, complexity, stack: t.stack, mvp }
}

export default function Estimator() {
  const { t, lang } = useLang()
  const { sendToForm } = useLead()
  const sectionRef = useScrollReveal()
  const onMove = useSpotlight()

  const [step, setStep] = useState(0)
  const [type, setType] = useState(null)
  const [mods, setMods] = useState([])
  const [team, setTeam] = useState('s')
  const [time, setTime] = useState('normal')

  const result = useMemo(() => (type ? estimate({ type, mods, team, time }) : null), [type, mods, team, time])
  const animMin = useCountUp(result?.min ?? 0)
  const animMax = useCountUp(result?.max ?? 0)
  const animPilot = useCountUp(result?.pilot ?? 0)

  const toggleMod = (id) => setMods(m => (m.includes(id) ? m.filter(x => x !== id) : [...m, id]))
  const canNext = step === 0 ? !!type : true

  const handleSend = () => {
    const typeLabel = t(`est.type.${TYPES.find(x => x.id === type).tKey}.t`)
    const modLabels = mods.map(id => t(`est.mod.${id}`)).join(', ') || t('est.mod.none')
    const msg =
      `${t('est.msg.intro')}\n` +
      `• ${t('est.msg.type')}: ${typeLabel}\n` +
      `• ${t('est.msg.mods')}: ${modLabels}\n` +
      `• ${t('est.team.label')}: ${t(`est.team.${team}`)}\n` +
      `• ${t('est.time.label')}: ${t(`est.time.${time}`)}\n` +
      `• ${t('est.r.weeks')}: ${result.min}–${result.max} ${t('est.weeks')}${result.mvp ? ` (${t('est.r.mvp')})` : ''}`
    sendToForm({ interes: type, mensaje: msg, source: 'estimator' })
  }

  const steps = [t('est.step1'), t('est.step2'), t('est.step3')]

  return (
    <section id="estimador" className={styles.section} ref={sectionRef}>
      <div className="wrap">
        <div className={`section-head reveal ${styles.head}`}>
          <span className="kicker">{t('est.kicker')}</span>
          <SplitReveal text={t('est.title')} tail={<span className="accentDot">.</span>} />
          <p className="desc">{t('est.desc')}</p>
        </div>

        <div className={`${styles.shell} glow-card reveal`} onMouseMove={onMove}>
          {/* ── Rail de pasos ── */}
          <aside className={styles.rail}>
            <div className={styles.railTop}>
              <span className="tag-mono">aikata.estimate()</span>
            </div>
            <ol className={styles.stepList}>
              {steps.map((label, i) => {
                const done = step > i || (step === 3)
                const active = step === i
                return (
                  <li key={label} className={`${styles.stepItem} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}>
                    <span className={styles.stepNum}>{done ? <Check /> : `0${i + 1}`}</span>
                    <span className={styles.stepLabel}>{label}</span>
                  </li>
                )
              })}
              <li className={`${styles.stepItem} ${step === 3 ? styles.stepActive : ''}`}>
                <span className={styles.stepNum}>→</span>
                <span className={styles.stepLabel}>{t('est.result')}</span>
              </li>
            </ol>
            <div className={styles.railProgress}>
              <span style={{ transform: `scaleX(${(step) / 3})` }} />
            </div>
          </aside>

          {/* ── Panel ── */}
          <div className={styles.panel} key={`${step}-${lang}`}>
            {step === 0 && (
              <div className={styles.stepBody}>
                <h3 className={styles.q}>{t('est.step1')}</h3>
                <div className={styles.typeGrid}>
                  {TYPES.map((x, i) => (
                    <button
                      key={x.id}
                      type="button"
                      className={`${styles.typeCard} ${type === x.id ? styles.selected : ''}`}
                      onClick={() => setType(x.id)}
                      aria-pressed={type === x.id}
                    >
                      <span className={styles.typeIdx}>0{i + 1}</span>
                      <span className={styles.typeTitle}>{t(`est.type.${x.tKey}.t`)}</span>
                      <span className={styles.typeDesc}>{t(`est.type.${x.tKey}.d`)}</span>
                      <span className={styles.typeCheck}><Check /></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className={styles.stepBody}>
                <h3 className={styles.q}>{t('est.step2')}</h3>
                <p className={styles.hint}>{t('est.step2.hint')}</p>
                <div className={styles.chips}>
                  {MODULES.map(m => {
                    const on = mods.includes(m.id)
                    return (
                      <button
                        key={m.id}
                        type="button"
                        className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                        onClick={() => toggleMod(m.id)}
                        aria-pressed={on}
                      >
                        <span className={styles.chipBox}>{on && <Check />}</span>
                        {t(`est.mod.${m.id}`)}
                        <span className={styles.chipW}>+{m.w}w</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.stepBody}>
                <h3 className={styles.q}>{t('est.step3')}</h3>
                <div className={styles.twoCol}>
                  <fieldset className={styles.fs}>
                    <legend className="tag-mono">{t('est.team.label')}</legend>
                    <div className={styles.seg}>
                      {TEAM.map(x => (
                        <button key={x.id} type="button" className={team === x.id ? styles.segOn : ''} onClick={() => setTeam(x.id)}>
                          {t(`est.team.${x.id}`)}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset className={styles.fs}>
                    <legend className="tag-mono">{t('est.time.label')}</legend>
                    <div className={styles.seg}>
                      {TIME.map(x => (
                        <button key={x.id} type="button" className={time === x.id ? styles.segOn : ''} onClick={() => setTime(x.id)}>
                          {t(`est.time.${x.id}`)}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
            )}

            {step === 3 && result && (
              <div className={styles.stepBody}>
                <div className={styles.resultHead}>
                  <span className="tag-accent">{t('est.r.ready')}</span>
                  {result.mvp && <span className={styles.mvpTag}>{t('est.r.mvp')}</span>}
                </div>

                <div className={styles.resultGrid}>
                  <div className={styles.bigStat}>
                    <span className="tag-mono">{t('est.r.weeks')}</span>
                    <span className={styles.bigNum}>
                      {animMin}<span className={styles.dash}>–</span>{animMax}
                      <small>{t('est.weeks')}</small>
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span className="tag-mono">{t('est.r.pilot')}</span>
                    <span className={styles.num}>{animPilot} <small>{t('est.weeks')}</small></span>
                  </div>
                  <div className={styles.stat}>
                    <span className="tag-mono">{t('est.r.complexity')}</span>
                    <span className={styles.bars} aria-label={`${result.complexity}/5`}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <i key={n} className={n <= result.complexity ? styles.barOn : ''} style={{ transitionDelay: `${n * 60}ms` }} />
                      ))}
                    </span>
                  </div>
                  <div className={styles.stat}>
                    <span className="tag-mono">{t('est.r.stack')}</span>
                    <span className={styles.mono}>{result.stack}</span>
                  </div>
                </div>

                <div className={styles.phases}>
                  {[['p1', 15], ['p2', 65], ['p3', 20]].map(([k, pct]) => (
                    <div key={k} className={styles.phase} style={{ flex: pct }}>
                      <span className={styles.phaseBar} />
                      <span className={styles.phaseLabel}>{t(`est.r.${k}`)} <b>{pct}%</b></span>
                    </div>
                  ))}
                </div>

                <div className={styles.resultCta}>
                  <MagneticButton as="button" type="button" onClick={handleSend} icon={<ArrowRight />}>
                    {t('est.r.cta')}
                  </MagneticButton>
                  <p className={styles.disclaimer}>{t('est.r.disclaimer')}</p>
                </div>
              </div>
            )}

            {/* ── Controles ── */}
            {step < 3 && (
              <div className={styles.controls}>
                <button type="button" className="btn btn-ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
                  {t('est.back')}
                </button>
                <span className={styles.counter}>{step + 1} / 3</span>
                <MagneticButton
                  as="button"
                  type="button"
                  icon={<ArrowRight />}
                  disabled={!canNext}
                  onClick={() => setStep(s => s + 1)}
                  className={!canNext ? styles.disabled : ''}
                >
                  {step === 2 ? t('est.compute') : t('est.next')}
                </MagneticButton>
              </div>
            )}
            {step === 3 && (
              <div className={styles.controls}>
                <button type="button" className="btn btn-ghost" onClick={() => { setStep(0); setType(null); setMods([]); setTeam('s'); setTime('normal') }}>
                  ↺ {t('est.restart')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
