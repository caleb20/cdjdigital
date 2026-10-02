import { ChevronRight, Laptop, MessageCircle, Rocket, SlidersHorizontal } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const steps = [
  {
    number: '01',
    Icon: MessageCircle,
    title: 'Cuéntanos sobre tu negocio',
    text: 'Nos cuentas qué haces, qué vendes y qué necesitas.',
  },
  {
    number: '02',
    Icon: Laptop,
    title: 'Diseñamos tu web',
    text: 'Construimos una página alineada a tu negocio.',
  },
  {
    number: '03',
    Icon: SlidersHorizontal,
    title: 'Revisamos juntos',
    text: 'Realizamos ajustes de contenido y detalles.',
  },
  {
    number: '04',
    Icon: Rocket,
    title: 'Publicamos',
    text: 'Tu página queda online y lista para recibir visitas.',
  },
]

export default function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading id="proceso-title" eyebrow="Cómo funciona" title="Tu web en 4 pasos" />

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map(({ number, Icon, title, text }, index) => (
            <Reveal as="li" key={number} delay={index * 90} className="relative">
              <div className="group h-full rounded-2xl border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <span className="text-gradient-light text-6xl leading-none font-extrabold tracking-tighter">
                    {number}
                  </span>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-ink-800">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{text}</p>
              </div>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-[1.05rem] z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-brand-500 shadow-sm lg:inline-flex"
                >
                  <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
