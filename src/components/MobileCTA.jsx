import { useEffect, useState } from 'react'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'

/**
 * Barra fija de WhatsApp en celular y tablet (reemplaza al botón flotante, que tapaba texto).
 * Aparece cuando el hero sale de la pantalla y se oculta en el cierre, que ya tiene su botón.
 * El footer reserva su alto con padding inferior.
 */
export default function MobileCTA({ whatsappUrl }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('inicio')
    const closing = document.getElementById('contacto')
    if (!hero || !closing || !('IntersectionObserver' in window)) return

    const state = { hero: true, closing: false }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.hero = entry.isIntersecting
        if (entry.target === closing) state.closing = entry.isIntersecting
      }
      setVisible(!state.hero && !state.closing)
    })
    observer.observe(hero)
    observer.observe(closing)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      data-visible={visible}
      className="mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-neblina/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
        <WhatsAppIcon className="h-5 w-5" />
        Pedir mi web por WhatsApp
      </a>
    </div>
  )
}
