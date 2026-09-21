import { ThemeProvider } from './context/ThemeContext.jsx'
import { LangProvider }  from './context/LangContext.jsx'
import Header        from './components/Header.jsx'
import Hero          from './components/Hero.jsx'
import Services      from './components/Services.jsx'
import Process       from './components/Process.jsx'
import WhyAikata      from './components/WhyAikata.jsx'
import Founders      from './components/Founders.jsx'
import Demos         from './components/Demos.jsx'
import ConsultForm   from './components/ConsultForm.jsx'
import CtaBand       from './components/CtaBand.jsx'
import Footer        from './components/Footer.jsx'
import WhatsAppBubble from './components/WhatsAppBubble.jsx'
import './styles/global.css'

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Header />
        <main>
          <Hero />
          <Services />
          <Process />
          <WhyAikata />
          <Founders />
          <Demos />
          <ConsultForm />
          <CtaBand />
        </main>
        <Footer />
        <WhatsAppBubble />
      </LangProvider>
    </ThemeProvider>
  )
}