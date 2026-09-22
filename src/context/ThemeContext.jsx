import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()
/* Clave nueva para que la preferencia guardada por la versión oscura anterior no fuerce dark. */
const STORAGE_KEY = 'aikata-theme-v3'

/**
 * Dark por defecto: agua profunda #07110F, identidad del ecosistema koi.
 * Prioridad: ?theme= en la URL → preferencia guardada por el usuario → dark.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('theme')
      if (param === 'dark' || param === 'light') return param
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
      return 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem(STORAGE_KEY, theme) } catch {}
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
