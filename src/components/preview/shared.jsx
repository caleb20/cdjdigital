import { WhatsAppIcon } from '../ui/BrandIcons.jsx'

/**
 * Piezas comunes de las webs de ejemplo. Todas se dibujan a tamaño real (1280 px de ancho en
 * escritorio, 390 en celular) y el marco las reduce con `zoom`: por eso las medidas son de una web real.
 */

/** Clases según el ancho: `pick(mobile, 'en celular', 'en escritorio')`. */
export const pick = (mobile, small, large) => (mobile ? small : large)

/** Botón de WhatsApp pegado abajo a la derecha mientras se recorre la página (sticky al final). */
export function WhatsAppFab({ mobile }) {
  return (
    <div className={`pointer-events-none sticky flex justify-end ${pick(mobile, 'bottom-4 -mt-16 h-16 pr-4', 'bottom-6 -mt-20 h-20 pr-8')}`}>
      <span className={`flex items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg ${pick(mobile, 'size-14', 'size-16')}`}>
        <WhatsAppIcon className={pick(mobile, 'size-7', 'size-8')} />
      </span>
    </div>
  )
}

/** Pie de página: nombre, dirección y la firma de CDJ, como en las webs reales. */
export function SiteFooter({ name, address, mobile, className = '', nameClass = '', muted = 'opacity-70' }) {
  return (
    <footer className={`${pick(mobile, 'px-6 py-10', 'flex items-end justify-between px-14 py-12')} ${className}`}>
      <div>
        <p className={`text-[24px] ${nameClass}`}>{name}</p>
        <p className={`mt-2 text-[15px] ${muted}`}>{address}</p>
      </div>
      <p className={`text-[14px] ${muted} ${pick(mobile, 'mt-6', '')}`}>
        © 2026 {name}. Web hecha por CDJ Digital.
      </p>
    </footer>
  )
}

/** Foto de relleno de una sección: cubre su caja y nunca se puede arrastrar ni seleccionar. */
export function Img({ src, className = '' }) {
  return <img src={src} alt="" draggable={false} loading="lazy" decoding="async" className={`object-cover select-none ${className}`} />
}
