import { ThemeProvider } from './context/ThemeContext.jsx'
import { LangProvider }  from './context/LangContext.jsx'
import { LeadProvider }  from './context/LeadContext.jsx'
import Header         from './components/Header.jsx'
import Hero           from './components/Hero.jsx'
import Services       from './components/Services.jsx'
import Estimator      from './components/Estimator.jsx'
import Process        from './components/Process.jsx'
import RoiCalculator  from './components/RoiCalculator.jsx'
import WhyAikata      from './components/WhyAikata.jsx'
import Founders       from './components/Founders.jsx'
import Demos          from './components/Demos.jsx'
import Faq            from './components/Faq.jsx'
import ConsultForm    from './components/ConsultForm.jsx'
import CtaBand        from './components/CtaBand.jsx'
import Footer         from './components/Footer.jsx'
import WhatsAppBubble from './components/WhatsAppBubble.jsx'
import KoiBackground  from './components/KoiBackground.jsx'

/**
 * Customer journey:
 * Hero (promesa) → Services (qué) → Estimator (interacción / cualificación)
 * → Process (cómo) → ROI (valor cuantificado) → Why / Founders (confianza)
 * → Demos (prueba) → FAQ (objeciones) → Form (conversión) → CTA final (rescate)
 */
export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <LeadProvider>
          <KoiBackground />
          <Header />
          <main>
            <Hero />
            <Services />
            <Estimator />
            <Process />
            <RoiCalculator />
            <WhyAikata />
            <Founders />
            <Demos />
            <Faq />
            <ConsultForm />
            <CtaBand />
          </main>
          <Footer />
          <WhatsAppBubble />
        </LeadProvider>
      </LangProvider>
    </ThemeProvider>
  )
}
