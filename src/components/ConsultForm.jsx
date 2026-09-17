import { useState } from 'react'
import { useLang } from '../context/LangContext.jsx'
import styles from './ConsultForm.module.css'

export default function ConsultForm() {
  const { t } = useLang()
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
    <section className={styles.formSection} id="formulario">
      <div className="wrap">
        <div className={styles.formGrid}>
          <div>
            <span className="kicker">{t('form.kicker')}</span>
            <h2>{t('form.title')}</h2>
            <p className="desc">{t('form.desc')}</p>
            <div className={styles.sideList}>
              <div className={styles.sideItem}>
                <div className={styles.sideIcon}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 2"/>
                  </svg>
                </div>
                <div className={styles.sideText}>
                  <strong>{t('form.side1.strong')}</strong>
                  {t('form.side1.text')}
                </div>
              </div>

              <div className={styles.sideItem}>
                <div className={styles.sideIcon}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <circle cx="12" cy="12" r="9"/>
                  </svg>
                </div>
                <div className={styles.sideText}>
                  <strong>{t('form.side2.strong')}</strong>
                  {t('form.side2.text')}
                </div>
              </div>

              <div className={styles.sideItem}>
                <div className={styles.sideIcon}>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="4"/>
                    <path d="M8 12h8"/>
                  </svg>
                </div>
                <div className={styles.sideText}>
                  <strong>{t('form.side3.strong')}</strong>
                  {t('form.side3.text')}
                </div>
              </div>
            </div>
          </div>

          <form className={styles.consultForm} onSubmit={onSubmit}>
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
                  disabled={loading}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="empresa">{t('form.label.business')}</label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  placeholder={t('form.ph.business')}
                  required
                  value={form.empresa}
                  onChange={onChange}
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="telefono">{t('form.label.phone')}</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder={t('form.ph.phone')}
                  required
                  value={form.telefono}
                  onChange={onChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="interes">{t('form.label.interest')}</label>
              <select
                id="interes"
                name="interes"
                required
                value={form.interes}
                onChange={onChange}
                disabled={loading}
              >
                <option value="" disabled>{t('form.opt.default')}</option>
                <option value="web-movil">{t('form.opt.web')}</option>
                <option value="ecommerce">{t('form.opt.ecom')}</option>
                <option value="ia">{t('form.opt.ai')}</option>
                <option value="consultoria">{t('form.opt.consult')}</option>
                <option value="no-seguro">{t('form.opt.unsure')}</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="mensaje">{t('form.label.message')}</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder={t('form.ph.message')}
                value={form.mensaje}
                onChange={onChange}
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  {t('form.sending')}
                </>
              ) : (
                t('form.submit')
              )}
            </button>

            {sent && (
              <div className={styles.formSuccess} role="alert">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M8 12l2.5 2.5L16 9"/>
                </svg>
                <span>{t('form.success')}</span>
              </div>
            )}

            {error && (
              <div className={styles.formError} role="alert">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <p className={styles.formNote}>{t('form.note')}</p>
          </form>
        </div>
      </div>
    </section>
  )
}