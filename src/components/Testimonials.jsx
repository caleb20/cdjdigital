import { ArrowRight, Quote, Star } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/**
 * Estado inicial de la sección de testimonios: aún no hay clientes reales publicados y NO se
 * inventan. Cuando existan, reemplazar el contenido de la tarjeta por los testimonios reales.
 */
export default function Testimonials() {
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading
          id="testimonios-title"
          align="center"
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-brand-300 bg-gradient-to-br from-white via-white to-brand-50 p-8 text-center shadow-card sm:p-12">
            <Quote
              aria-hidden="true"
              className="absolute top-6 left-6 h-14 w-14 text-brand-500/10 sm:h-20 sm:w-20"
              strokeWidth={1.5}
            />
            <div className="relative">
              <div className="flex justify-center gap-1 text-brand-300" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5" strokeWidth={1.6} />
                ))}
              </div>
              <p className="mt-5 text-2xl leading-tight font-bold tracking-tight text-ink-800 sm:text-3xl">
                Tu negocio puede ser el próximo.
              </p>
              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Estamos sumando nuestros primeros clientes. Cuéntanos sobre tu negocio y empecemos.
              </p>
              <a
                href={getWhatsAppUrl(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-7"
              >
                Quiero comenzar
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
