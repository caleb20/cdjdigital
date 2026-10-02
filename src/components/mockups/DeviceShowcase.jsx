import { Cloud, MessageCircle, Search, Smartphone } from 'lucide-react'
import { LaptopFrame, PhoneFrame } from './Frames.jsx'
import { KopaDesktopScreen, KopaMobileScreen } from './KopaScreens.jsx'

/** Chips flotantes sutiles alrededor del mockup (solo ≥ sm, para no recargar el celular). */
const chips = [
  { label: 'Responsive', Icon: Smartphone, pos: 'left-[1%] top-[2%]', delay: '0s', anim: 'animate-float' },
  { label: 'SEO', Icon: Search, pos: 'right-[26%] -top-[3%]', delay: '1.2s', anim: 'animate-float-slow' },
  { label: 'WhatsApp', Icon: MessageCircle, pos: 'left-0 bottom-[22%]', delay: '0.6s', anim: 'animate-float-slow' },
  { label: 'Hosting', Icon: Cloud, pos: 'right-[1%] top-[14%]', delay: '1.8s', anim: 'animate-float' },
]

/**
 * Laptop + celular mostrando una web real de negocio (Kopa Caffe).
 * `photo` permite variar la foto entre secciones; `priority` solo en el hero (LCP).
 */
export default function DeviceShowcase({
  photo = 'kopa-fachada-noche',
  priority = false,
  showChips = false,
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        role="img"
        aria-label="Vista previa de la web de Kopa Caffe en laptop y celular, un ejemplo de página para negocio"
        className="relative pb-[7%]"
      >
        <LaptopFrame className="w-[93%]">
          <KopaDesktopScreen photo={photo} priority={priority} />
        </LaptopFrame>
        <div className="absolute right-0 bottom-0 w-[23.5%]">
          <PhoneFrame>
            <KopaMobileScreen photo={photo} />
          </PhoneFrame>
        </div>
      </div>

      {showChips &&
        chips.map(({ label, Icon, pos, delay, anim }) => (
          <span
            key={label}
            aria-hidden="true"
            style={{ animationDelay: delay }}
            className={`absolute ${pos} ${anim} hidden items-center gap-1.5 rounded-full border border-white/15 bg-ink-800/70 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md sm:inline-flex`}
          >
            <Icon className="h-3.5 w-3.5 text-brand-300" />
            {label}
          </span>
        ))}
    </div>
  )
}
