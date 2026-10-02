import { ArrowRight, Mail } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { corporateEmail } from '../data/pricing.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import Reveal from './ui/Reveal.jsx'

export default function CorporateEmail() {
  return (
    <section id="correo" aria-labelledby="correo-title" className="bg-mist py-14 sm:py-16">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <h2 id="correo-title" className="text-2xl leading-tight font-bold tracking-tight text-ink-800 sm:text-3xl">
                También puedes tener un correo profesional
              </h2>
              <p className="mt-3 max-w-lg text-slate-600">
                Proyecta una imagen más profesional con un correo utilizando el dominio de tu negocio.
              </p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-ink-800">S/{corporateEmail.price}</span>
                <span className="text-slate-600">por cuenta / mes</span>
              </p>
              <a
                href={getWhatsAppUrl(whatsappMessages.corporateEmail)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-6"
              >
                Quiero correo corporativo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            {/* Ejemplo visual del correo */}
            <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-50 to-white p-5 sm:p-6">
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase">Ejemplo</p>
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 shadow-sm">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-brand text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0 truncate text-base font-semibold text-ink-800 sm:text-lg">
                  contacto@<span className="text-brand-600">tunegocio.pe</span>
                </span>
              </div>
              <div aria-hidden="true" className="mt-3 space-y-2 px-1">
                <span className="block h-2 w-3/4 rounded-full bg-slate-200/80" />
                <span className="block h-2 w-1/2 rounded-full bg-slate-200/60" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
