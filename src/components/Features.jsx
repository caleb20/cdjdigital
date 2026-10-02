import {
  ChartColumn,
  Cloud,
  Gauge,
  Globe,
  Headset,
  Info,
  Lock,
  MapPin,
  MessageCircle,
  Palette,
  Search,
  Smartphone,
  Wrench,
} from 'lucide-react'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const features = [
  { Icon: Palette, label: 'Diseño profesional' },
  { Icon: Smartphone, label: 'Responsive' },
  { Icon: Cloud, label: 'Hosting' },
  { Icon: Lock, label: 'HTTPS' },
  { Icon: Globe, label: 'Dominio el primer año' },
  { Icon: MessageCircle, label: 'WhatsApp' },
  { Icon: MapPin, label: 'Google Maps' },
  { Icon: Search, label: 'SEO básico' },
  { Icon: ChartColumn, label: 'Google Analytics' },
  { Icon: Headset, label: 'Soporte' },
  { Icon: Wrench, label: 'Mantenimiento' },
  { Icon: Gauge, label: 'Optimización móvil' },
]

export default function Features() {
  return (
    <section id="incluye" aria-labelledby="incluye-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading
          id="incluye-title"
          eyebrow="¿Qué incluye?"
          title="Todo lo necesario para comenzar"
          description="Sin complicaciones: nosotros nos encargamos de la parte técnica."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {features.map(({ Icon, label }, index) => (
            <Reveal as="li" key={label} delay={(index % 4) * 60}>
              <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 text-[0.9rem] leading-snug font-semibold text-ink-800 sm:text-base">{label}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex items-start gap-2.5 text-sm text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <p>
            El dominio se incluye durante el primer año. La renovación se cotiza según el dominio
            elegido.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
