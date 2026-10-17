import { useState } from 'react'
import FAQ from './components/FAQ.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Included from './components/Included.jsx'
import MobileCTA from './components/MobileCTA.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import { describeBusiness, initialBusiness } from './lib/business.js'

export default function App() {
  // Lo que el visitante escribe en el hero también personaliza los botones de WhatsApp y el cierre.
  const [business, setBusiness] = useState(initialBusiness)
  const details = describeBusiness(business)
  const updateBusiness = (patch) => setBusiness((current) => ({ ...current, ...patch }))

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-papel focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-asfalto"
      >
        Saltar al contenido
      </a>
      <Header whatsappUrl={details.whatsappUrl} />
      <main id="contenido">
        <Hero business={business} details={details} onChange={updateBusiness} />
        <Pricing />
        <Included />
        <Process />
        <FAQ />
        <FinalCTA details={details} />
      </main>
      <Footer />
      <MobileCTA whatsappUrl={details.whatsappUrl} />
    </>
  )
}
