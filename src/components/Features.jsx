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

/** Cada elemento: qué es y, sobre todo, para qué le sirve al cliente. */
const features = [
  { Icon: Palette, label: 'Diseño profesional', text: 'Tu negocio se ve serio desde el primer vistazo, y eso da confianza para escribirte.' },
  { Icon: Smartphone, label: 'Responsive', text: 'Se ve bien en celular, tablet y computadora, sin tener que acercar la pantalla.' },
  { Icon: Cloud, label: 'Hosting', text: 'Tu web siempre en línea, sin que contrates ni manejes servidores.' },
  { Icon: Lock, label: 'HTTPS', text: 'El candado de seguridad: tus clientes no ven avisos de «sitio no seguro» y Google lo prefiere.' },
  { Icon: Globe, label: 'Dominio (Negocio y Pro)', text: 'Una dirección propia, como tunegocio.pe, fácil de recordar y de compartir.' },
  { Icon: MessageCircle, label: 'WhatsApp', text: 'Te escriben con un toque y el mensaje ya viene armado, sin copiar tu número.' },
  { Icon: MapPin, label: 'Google Maps', text: 'Te encuentran y llegan a tu local con un toque.' },
  { Icon: Search, label: 'SEO básico', text: 'Dejamos tu web lista para que Google la entienda y pueda mostrarla cuando te busquen.' },
  { Icon: ChartColumn, label: 'Google Analytics (Negocio y Pro)', text: 'Sabes cuánta gente visita tu web y de dónde viene, para decidir con datos.' },
  { Icon: Headset, label: 'Soporte', text: 'Si algo falla o tienes una duda, te responde una persona real por WhatsApp.' },
  { Icon: Wrench, label: 'Mantenimiento (Negocio y Pro)', text: 'Tu web sigue funcionando y al día sin que tengas que ocuparte de lo técnico.' },
  { Icon: Gauge, label: 'Optimización móvil', text: 'Carga rápido en el celular, para que tus visitantes no se aburran y se vayan.' },
]

export default function Features() {
  return (
    <section id="incluye" aria-labelledby="incluye-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading
          id="incluye-title"
          eyebrow="¿Qué incluye?"
          title="Todo lo necesario para comenzar"
          description="Qué incluye tu web y para qué te sirve, sin términos técnicos: nosotros nos encargamos de lo técnico."
        />

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {features.map(({ Icon, label, text }, index) => (
            <Reveal as="li" key={label} delay={(index % 3) * 60}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-4 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover sm:p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.95rem] leading-snug font-semibold text-ink-800 sm:text-base">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex items-start gap-2.5 text-sm text-slate-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
          <p>
            El dominio se incluye el primer año en los planes Negocio y Pro; en el plan Inicio es obligatorio
            pero se paga aparte. La renovación se cotiza según el dominio elegido.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
