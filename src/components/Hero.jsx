import { ArrowRight, BadgeCheck, Play } from 'lucide-react'
import { site, whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import DeviceShowcase from './mockups/DeviceShowcase.jsx'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'

const trust = [site.startingPrice, 'Sin complicaciones', 'Soporte incluido']

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24"
    >
      {/* Fondo: glows azul/violeta + cuadrícula sutil */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-[120px]" />
        <div className="absolute right-[-15%] bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-violet-brand/25 blur-[130px]" />
        <div className="absolute top-1/3 -left-40 h-[22rem] w-[22rem] rounded-full bg-brand-600/15 blur-[120px]" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <div className="container-x grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.08fr] lg:gap-10 xl:gap-16">
        <div>
          <p
            className="hero-slide inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-[0.65rem] font-semibold tracking-[0.1em] text-brand-200 min-[380px]:text-[0.7rem] min-[380px]:tracking-[0.14em] sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
            DESARROLLO WEB PARA NEGOCIOS
          </p>

          <h1
            id="hero-title"
            className="hero-slide mt-6 text-[2.25rem] leading-[1.05] font-extrabold tracking-tight text-white min-[380px]:text-[2.5rem] sm:text-[3.4rem] lg:text-[3.5rem] xl:text-[4rem]"
          >
            Tu negocio merece una web <span className="text-gradient">profesional.</span>
          </h1>

          <p
            className="hero-in mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
            style={{ '--d': '140ms' }}
          >
            Creamos páginas web modernas, rápidas y adaptadas a celulares para pequeños negocios y
            emprendimientos.
          </p>

          <div
            className="hero-in mt-8 flex flex-col gap-3 sm:flex-row"
            style={{ '--d': '220ms' }}
          >
            <a
              href={getWhatsAppUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-7 py-3.5 text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Quiero mi web
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#demos" className="btn btn-ghost-dark px-7 py-3.5 text-base">
              Ver demos
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            </a>
          </div>

          <ul
            className="hero-in mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-slate-300"
            style={{ '--d': '300ms' }}
          >
            {trust.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-brand-400" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-in mx-auto w-full max-w-[34rem] lg:max-w-none" style={{ '--d': '200ms' }}>
          <DeviceShowcase priority showChips />
        </div>
      </div>
    </section>
  )
}
