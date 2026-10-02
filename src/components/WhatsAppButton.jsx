import { whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'

/** Botón flotante de WhatsApp, visible en toda la página (desktop y mobile). */
export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-ink-800/95 px-4 py-2 text-sm font-medium whitespace-nowrap text-white opacity-0 shadow-lg ring-1 ring-white/10 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        ¿Hablamos por WhatsApp?
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-[0_10px_30px_-8px_rgba(31,168,85,0.7)] ring-1 ring-white/20 transition duration-200 group-hover:scale-110 sm:h-16 sm:w-16">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping-soft rounded-full bg-[#1fa855]"
        />
        <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
      </span>
    </a>
  )
}
