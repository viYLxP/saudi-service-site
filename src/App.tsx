import { useCallback, useRef } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { QuoteForm, type QuoteFormHandle } from './components/QuoteForm'
import { Services } from './components/Services'
import { WhatsAppFab } from './components/WhatsAppFab'
import type { ServiceId } from './config/site'
import { useI18n } from './i18n/useI18n'

export default function App() {
  const { t } = useI18n()
  const quoteRef = useRef<QuoteFormHandle>(null)

  const requestService = useCallback((service: ServiceId) => {
    quoteRef.current?.selectService(service)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Services onRequest={requestService} />
        <About />
        <Process />
        <QuoteForm ref={quoteRef} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
