import { ArrowRight, BadgeCheck } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import DeviceShowcase from './mockups/DeviceShowcase.jsx'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'
import Logo from './ui/Logo.jsx'
import Reveal from './ui/Reveal.jsx'

const perks = ['Respuesta rápida', 'Sin compromiso', 'Asesoría personalizada']

export default function FinalCTA() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative isolate overflow-hidden bg-ink-900 section-y">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-brand-500/30 blur-[120px]" />
        <div className="absolute -right-20 -bottom-32 h-[28rem] w-[28rem] rounded-full bg-violet-brand/35 blur-[130px]" />
        <div className="bg-grid absolute inset-0 opacity-70" />
      </div>

      <div aria-hidden="true" className="absolute top-8 right-6 hidden opacity-90 lg:block xl:right-[max(2.5rem,calc((100vw-72rem)/2))]">
        <Logo className="h-12" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <Reveal>
          <h2
            id="contacto-title"
            className="text-[2rem] leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl"
          >
            ¿Listo para llevar tu negocio a <span className="text-gradient">Internet?</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-slate-300">
            Cuéntanos sobre tu negocio y te mostramos cómo podría verse.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={getWhatsAppUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Hablar por WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#planes" className="btn btn-ghost-dark px-7 py-3.5 text-base">
              Ver planes
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-slate-300">
            {perks.map((perk) => (
              <li key={perk} className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-brand-400" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="mx-auto hidden w-full max-w-xl sm:block lg:max-w-none">
          <DeviceShowcase photo="kopa-fachada-dia" />
        </Reveal>
      </div>
    </section>
  )
}
