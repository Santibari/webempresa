import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'
import styles from './ConsultForm.module.css'

export default function ConsultForm() {
  const { t } = useLang()
  const sectionRef = useScrollReveal({ threshold: 0.1 })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: ''
  })

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
        body: JSON.stringify(form)
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        setSent(true)
        setForm({ nombre: '', empresa: '', email: '', telefono: '', interes: '', mensaje: '' })
      } else {
        setError(data.message || t('form.error'))
      }
    } catch {
      setError(t('form.error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.formSection} id="formulario" ref={sectionRef}>
      <div className="wrap">
        <div className={styles.formGrid}>
          
          {/* Lateral Izquierdo: Diagnóstico y Garantías */}
          <div className={`${styles.sideInfo} reveal`}>
            <span className="kicker">{t('form.kicker')}</span>
            <h2>
              {t('form.title')}
              <span className="accentDot">.</span>
            </h2>
            <p className="desc">{t('form.desc')}</p>

            <div className={styles.sideList}>
              <div className={styles.sideItem}>
                <span className={styles.sideMonoTag}>// 01 · sla</span>
                <div className={styles.sideText}>
                  <strong>{t('form.side1.strong')}</strong>
                  {t('form.side1.text')}
                </div>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideMonoTag}>// 02 · alcance</span>
                <div className={styles.sideText}>
                  <strong>{t('form.side2.strong')}</strong>
                  {t('form.side2.text')}
                </div>
              </div>

              <div className={styles.sideItem}>
                <span className={styles.sideMonoTag}>// 03 · nda</span>
                <div className={styles.sideText}>
                  <strong>{t('form.side3.strong')}</strong>
                  {t('form.side3.text')}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario Técnico */}
          <form className={`${styles.consultForm} reveal stagger-1`} onSubmit={onSubmit}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="nombre">{t('form.label.name')}</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder={t('form.ph.name')}
                  required
                  value={form.nombre}
                  onChange={onChange}
                  disabled={loading || sent}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="empresa">{t('form.label.business')}</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  placeholder={t('form.ph.business')}
                  value={form.empresa}
                  onChange={onChange}
                  disabled={loading || sent}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="email">{t('form.label.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t('form.ph.email')}
                  required
                  value={form.email}
                  onChange={onChange}
                  disabled={loading || sent}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="telefono">{t('form.label.phone')}</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder={t('form.ph.phone')}
                  value={form.telefono}
                  onChange={onChange}
                  disabled={loading || sent}
                />
              </div>
            </div>

            {/* Selector Táctil de Área Técnica (Pills) */}
            <div className={styles.field}>
              <label className={styles.pillsLabel}>{t('form.label.interest')}</label>
              <div className={styles.pillsGroup} role="radiogroup" aria-label={t('form.label.interest')}>
                {interestOptions.map((opt) => {
                  const active = form.interes === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`${styles.pillBtn} ${active ? styles.pillBtnActive : ''}`}
                      onClick={() => {
                        setForm(f => ({ ...f, interes: opt.value }))
                        if (error) setError('')
                      }}
                      disabled={loading || sent}
                    >
                      <span className={styles.pillIndicator}>{active ? '●' : '○'}</span>
                      <span>{t(opt.labelKey)}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="mensaje">{t('form.label.message')}</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder={t('form.ph.message')}
                value={form.mensaje}
                onChange={onChange}
                disabled={loading || sent}
              />
            </div>

            {error && <div className={styles.errorMsg}>{error}</div>}
            {sent && <div className={styles.successMsg}>{t('form.success')}</div>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || sent}
              style={{ width: '100%', marginTop: '8px' }}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  <span>{t('form.sending')}</span>
                </>
              ) : (
                <span>{sent ? '✓ Solicitud recibida' : t('form.submit')}</span>
              )}
            </button>

            <p className={styles.formNote}>{t('form.note')}</p>
          </form>

        </div>
      </div>
    </section>
  )
}