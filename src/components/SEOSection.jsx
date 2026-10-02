import { Check, Globe } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const seoItems = [
  'Títulos y meta descripciones',
  'URLs amigables',
  'Sitemap',
  'Robots.txt',
  'Estructura H1/H2',
  'Optimización de imágenes',
  'Datos estructurados básicos',
  'Google Search Console',
  'Optimización local básica',
]

export default function SEOSection() {
  return (
    <section id="seo" aria-labelledby="seo-title" className="section-y bg-white">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading
            id="seo-title"
            eyebrow="SEO"
            title="Tu web preparada para Google"
            description="No prometemos posiciones mágicas. Preparamos tu sitio con buenas prácticas para que los buscadores puedan entenderlo, indexarlo y mostrarlo para búsquedas relevantes."
          />
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {seoItems.map((item, index) => (
              <Reveal as="li" key={item} delay={(index % 2) * 60} className="flex items-center gap-3 text-[0.95rem] font-medium text-ink-800">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Resultado de búsqueda ilustrativo */}
        <Reveal delay={120}>
          <figure className="rounded-3xl border border-line bg-gradient-to-br from-brand-50 via-white to-white p-5 shadow-card sm:p-7">
            <figcaption className="mb-4 text-xs font-semibold tracking-wide text-slate-500 uppercase">
              Ejemplo ilustrativo
            </figcaption>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-medium text-ink-800">Tu Negocio</p>
                  <p className="truncate text-xs text-slate-500">https://tunegocio.pe › inicio</p>
                </div>
              </div>
              <p className="mt-3 text-lg leading-snug font-medium text-brand-700">
                Tu Negocio | Cafetería en Lima
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Qué ofreces, dónde estás y cómo contactarte, explicado de forma clara para tus
                clientes y para los buscadores.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" aria-hidden="true">
              {['Título', 'Descripción', 'Mapa', 'Sitemap'].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  <Check className="h-3 w-3 text-brand-600" strokeWidth={3} />
                  {tag}
                </span>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
