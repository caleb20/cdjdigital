import { MessageCircle, Monitor, Search, Smartphone } from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const services = [
  {
    Icon: Monitor,
    title: 'Página web profesional',
    text: 'Un sitio moderno que represente la identidad de tu negocio.',
  },
  {
    Icon: Smartphone,
    title: 'Diseño responsive',
    text: 'Tu web se verá bien en celulares, tablets y computadoras.',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp y contacto',
    text: 'Facilitamos que tus clientes puedan contactarte rápidamente.',
  },
  {
    Icon: Search,
    title: 'Presencia en Google',
    text: 'Configuramos elementos básicos para que tu negocio pueda ser encontrado en buscadores.',
  },
]

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section-y bg-white">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <SectionHeading
          id="servicios-title"
          eyebrow="Lo que hacemos"
          title="Más que una página web."
          description="Construimos una presencia digital que ayude a tu negocio a verse profesional y conseguir clientes."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map(({ Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 80}>
              <div className="group h-full rounded-2xl border border-line bg-gradient-to-b from-white to-mist p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-ink-800">{title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
