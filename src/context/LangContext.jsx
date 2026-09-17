import { createContext, useContext, useState } from 'react'
import es from '../i18n/es.js'
import en from '../i18n/en.js'

const dicts = { es, en }

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem('lang')
      if (stored === 'es' || stored === 'en') return stored
      return navigator.language.startsWith('es') ? 'es' : 'en'
    } catch {
      return 'es'
    }
  })

  const t = (key) => dicts[lang][key] ?? key

  const toggleLang = () => {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    try { localStorage.setItem('lang', next) } catch {}
  }

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)