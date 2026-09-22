import { createContext, useCallback, useContext, useState } from 'react'

/**
 * Transporta el resultado de las herramientas interactivas
 * (estimador / calculadora ROI) hacia el formulario de contacto,
 * pre-llenando área de interés y mensaje. Cierra el loop de conversión.
 */
const LeadContext = createContext()

export function LeadProvider({ children }) {
  const [lead, setLeadState] = useState(null)

  const sendToForm = useCallback((payload) => {
    setLeadState({ ...payload, ts: Date.now() })
    const target = document.getElementById('contacto')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <LeadContext.Provider value={{ lead, sendToForm }}>
      {children}
    </LeadContext.Provider>
  )
}

export const useLead = () => useContext(LeadContext)
