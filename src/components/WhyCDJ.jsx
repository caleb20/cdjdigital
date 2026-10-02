import { HeartHandshake, Smartphone, Sparkles, Wallet } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const benefits = [
  {
    number: '01',
    Icon: Wallet,
    title: 'Sin grandes inversiones',
    text: 'Empieza pagando una mensualidad accesible.',
  },
  {
    number: '02',
    Icon: Sparkles,
    title: 'Diseño moderno',
    text: 'Tu negocio tendrá una imagen digital profesional.',
  },
  {
    number: '03',
    Icon: Smartphone,
    title: 'Pensado para celulares',
    text: 'La mayoría de tus clientes navegarán desde su teléfono.',
  },
  {
    number: '04',
    Icon: HeartHandshake,
    title: 'Estamos contigo',
    text: 'Soporte y mantenimiento para que no tengas que preocuparte por la parte técnica.',
  },
]

export default function WhyCDJ() {
  return (
    <section id="por-que" aria-labelledby="por-que-title" className="relative section-y overflow-hidden bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-violet-brand/20 blur-[130px]" />
        <div className="absolute top-0 -right-24 h-[24rem] w-[24rem] rounded-full bg-brand-500/20 blur-[120px]" />
      </div>

      <div className="container-x relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="por-que-title"
          tone="dark"
          eyebrow="¿Por qué CDJ Digital?"
          title="Una web profesional sin complicarte"
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {benefits.map(({ number, Icon, title, text }, index) => (
            <Reveal as="li" key={number} delay={index * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]">
                <span
                  aria-hidden="true"
                  className="absolute -top-2 right-4 text-7xl leading-none font-extrabold tracking-tighter text-white/[0.05] select-none"
                >
                  {number}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  <span className="sr-only">{number}. </span>
                  {title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-400">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
