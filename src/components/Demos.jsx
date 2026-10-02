import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { site, whatsappMessages } from '../config/site.js'
import { conceptDemos, kopaDemo } from '../data/demos.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import ConceptScreen from './mockups/ConceptScreen.jsx'
import { BrowserFrame, PhoneFrame } from './mockups/Frames.jsx'
import { KopaDesktopScreen, KopaMobileScreen, KopaPhoto } from './mockups/KopaScreens.jsx'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const galleryPhotos = ['kopa-cafe', 'kopa-interior-02', 'kopa-interior-03', 'kopa-interior-04']

function KopaFeatured() {
  return (
    <Reveal className="grid grid-cols-1 items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_30px_80px_-40px_rgba(76,92,255,0.5)] sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:p-10">
      <div
        role="img"
        aria-label="Vista previa del sitio web de Kopa Caffe en computadora y celular"
        className="relative pr-[5%] pb-[9%]"
      >
        <BrowserFrame url="kopa-caffe.vercel.app">
          <KopaDesktopScreen photo="kopa-fachada-dia" />
        </BrowserFrame>
        <div className="absolute right-0 bottom-0 w-[22%]">
          <PhoneFrame>
            <KopaMobileScreen photo="kopa-fachada-dia" />
          </PhoneFrame>
        </div>
      </div>

      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          DEMO REAL · YA ESTÁ EN LÍNEA
        </span>
        <h3 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">{kopaDemo.name}</h3>
        <p className="mt-1 text-base font-medium text-brand-300">{kopaDemo.category}</p>
        <p className="mt-4 max-w-md leading-relaxed text-slate-400">{kopaDemo.description}</p>

        <ul className="mt-5 grid grid-cols-1 max-w-md gap-2.5 text-sm text-slate-300 sm:grid-cols-2">
          {kopaDemo.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand-400" strokeWidth={2.6} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2" aria-label="Galería de fotos del sitio de Kopa Caffe" role="group">
          {galleryPhotos.map((name) => (
            <KopaPhoto
              key={name}
              name={name}
              alt=""
              sizes="48px"
              className="h-14 w-11 rounded-lg object-cover ring-1 ring-white/15"
            />
          ))}
          <span className="pl-1.5 text-xs text-slate-400">Galería de fotos</span>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={site.kopaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
            Ver demo
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <a
            href={getWhatsAppUrl(whatsappMessages.demo(kopaDemo.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Quiero una web como esta
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

function ConceptCard({ demo, index }) {
  return (
    <Reveal as="li" delay={index * 70} className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-auto">
      <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]">
        <div role="img" aria-label={`Concepto visual de una web para ${demo.category.toLowerCase()}`}>
          <BrowserFrame url="tunegocio.pe" size="sm">
            <ConceptScreen demo={demo} />
          </BrowserFrame>
        </div>
        <div className="flex flex-1 flex-col px-1.5 pt-4 pb-1.5">
          <span className="mb-2 inline-flex w-fit rounded-full bg-violet-brand/20 px-2 py-0.5 text-[0.62rem] font-semibold tracking-wider text-violet-300 uppercase">
            Concepto
          </span>
          <h3 className="font-semibold text-white">{demo.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            {demo.category} · {demo.tags.join(' · ')}
          </p>
          <a
            href={getWhatsAppUrl(whatsappMessages.demo(demo.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
          >
            Quiero una web como esta
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Demos() {
  return (
    <section id="demos" aria-labelledby="demos-title" className="relative section-y overflow-hidden bg-ink-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[120px]" />
      </div>

      <div className="container-x relative">
        <SectionHeading
          id="demos-title"
          tone="dark"
          align="center"
          eyebrow="Demos"
          title="Conoce algunos ejemplos"
          description="Así podría verse la web de tu negocio."
        />

        <div className="mt-12 lg:mt-14">
          <KopaFeatured />
        </div>

        <div className="mt-14">
          <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold text-white">Ideas para otros rubros</h3>
            <p className="text-sm text-slate-400">
              Conceptos visuales con negocios ficticios, para mostrar lo que podemos hacer.
            </p>
          </Reveal>

          <ul
            role="list"
            tabIndex={0}
            aria-label="Conceptos de demos para otros rubros"
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5 lg:gap-4"
          >
            {conceptDemos.map((demo, index) => (
              <ConceptCard key={demo.id} demo={demo} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
