import { useEffect, useRef, useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useLead } from '../context/LeadContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import SplitReveal from './motion/SplitReveal.jsx'
import MagneticButton from './ui/MagneticButton.jsx'
import { ArrowRight, Check } from './ui/Icons.jsx'
import styles from './ConsultForm.module.css'

const EMPTY = { nombre: '', empresa: '', email: '', telefono: '', interes: '', mensaje: '' }

export default function ConsultForm() {
  const { t, lang } = useLang()
  const { lead } = useLead()
  const sectionRef = useScrollReveal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prefilled, setPrefilled] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const nameRef = useRef(null)

  /* Prefill desde el estimador / calculadora ROI */
  useEffect(() => {
    if (!lead) return
    setForm(f => ({ ...f, interes: lead.interes ?? f.interes, mensaje: lead.mensaje ?? f.mensaje }))
    setPrefilled(true)
    setSent(false)
    const id = setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 700)
    return () => clearTimeout(id)
  }, [lead])

  const interestOptions = [
    { value: 'web-movil', labelKey: 'form.opt.web' },
    { value: 'ecommerce', labelKey: 'form.opt.ecom' },
    { value: 'ia', labelKey: 'form.opt.ai' },
    { value: 'consultoria', labelKey: 'form.opt.consult' },
    { value: 'no-seguro', labelKey: 'form.opt.unsure' },
  ]

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (error) setError('')
  }

  const onSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: lead?.source ?? 'form' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setSent(true)
        setForm(EMPTY)
        setPrefilled(false)
      } else {
        setError(data.message || t('form.error'))
      }
    } catch {
      setError(t('form.error'))
    } finally {
      setLoading(false)
    }
  }

  const disabled = loading || sent

  return (
    <section className={styles.formSection} id="contacto" ref={sectionRef}>
      <div className="wrap">
        <div className={styles.formGrid}>

          <div className={`${styles.sideInfo} reveal`}>
            <span className="kicker">{t('form.kicker')}</span>
            <SplitReveal key={lang} text={t('form.title')} tail={<span className="accentDot">.</span>} className={styles.title} />
            <p className={styles.desc}>{t('form.desc')}</p>

            <div className={styles.sideList}>
              {[1, 2, 3].map(n => (
                <div key={n} className={styles.sideItem}>
                  <span className={styles.sideIdx}>0{n}</span>
                  <div className={styles.sideText}>
                    <strong>{t(`form.side${n}.strong`)}</strong>
                    {t(`form.side${n}.text`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className={`${styles.consultForm} glow-card reveal stagger-1`} onSubmit={onSubmit} noValidate={false}>
            {prefilled && !sent && (
              <div className={styles.prefillBanner}>
                <Check /> <span>{t('form.prefilled')}</span>
              </div>
            )}

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="nombre">{t('form.label.name')}</label>
                <input ref={nameRef} type="text" id="nombre" name="nombre" placeholder={t('form.ph.name')} required value={form.nombre} onChange={onChange} disabled={disabled} autoComplete="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="empresa">{t('form.label.business')}</label>
                <input type="text" id="empresa" name="empresa" placeholder={t('form.ph.business')} value={form.empresa} onChange={onChange} disabled={disabled} autoComplete="organization" />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="email">{t('form.label.email')}</label>
                <input type="email" id="email" name="email" placeholder={t('form.ph.email')} required value={form.email} onChange={onChange} disabled={disabled} autoComplete="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="telefono">{t('form.label.phone')}</label>
                <input type="tel" id="telefono" name="telefono" placeholder={t('form.ph.phone')} value={form.telefono} onChange={onChange} disabled={disabled} autoComplete="tel" />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.pillsLabel}>{t('form.label.interest')}</label>
              <div className={styles.pillsGroup} role="radiogroup" aria-label={t('form.label.interest')}>
                {interestOptions.map(opt => {
                  const active = form.interes === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`${styles.pillBtn} ${active ? styles.pillBtnActive : ''}`}
                      onClick={() => { setForm(f => ({ ...f, interes: opt.value })); if (error) setError('') }}
                      disabled={disabled}
                    >
                      <span className={styles.pillIndicator} aria-hidden="true">{active && <Check />}</span>
                      <span>{t(opt.labelKey)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="mensaje">{t('form.label.message')}</label>
              <textarea id="mensaje" name="mensaje" placeholder={t('form.ph.message')} value={form.mensaje} onChange={onChange} disabled={disabled} rows={prefilled ? 7 : 4} />
            </div>

            {error && <div className={styles.errorMsg} role="alert">{error}</div>}
            {sent && <div className={styles.successMsg} role="status"><Check /> {t('form.success')}</div>}

            <MagneticButton
              as="button"
              type="submit"
              size="lg"
              disabled={disabled}
              icon={<ArrowRight />}
              strength={0.15}
              className={styles.submit}
            >
              {loading ? t('form.sending') : sent ? t('form.sentBtn') : t('form.submit')}
            </MagneticButton>

            <p className={styles.formNote}>{t('form.note')}</p>
          </form>

        </div>
      </div>
    </section>
  )
}
