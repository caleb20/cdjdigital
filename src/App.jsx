import CorporateEmail from './components/CorporateEmail.jsx'
import Demos from './components/Demos.jsx'
import FAQ from './components/FAQ.jsx'
import Features from './components/Features.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PlanDetails from './components/PlanDetails.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import SEOSection from './components/SEOSection.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import WhyCDJ from './components/WhyCDJ.jsx'

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-800"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Process />
        <Pricing />
        <PlanDetails />
        <CorporateEmail />
        <Demos />
        <Features />
        <SEOSection />
        <WhyCDJ />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
