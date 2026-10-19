import { useEffect, useRef, useState } from 'react'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'
import Logo from './ui/Logo.jsx'

export const navLinks = [
  { label: 'Precios', href: '#planes' },
  { label: 'Qué incluye', href: '#incluye' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Preguntas', href: '#faq' },
]

/** `whatsappUrl` llega armado desde App: si el visitante ya escribió su negocio, el mensaje lo incluye. */
export default function Header({ whatsappUrl }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape cierra el menú móvil y devuelve el foco al botón; si se agranda la ventana, se cierra.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => event.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bruma/95 backdrop-blur-md transition-[border-color] duration-(--dur-standard) ${
        scrolled || open ? 'border-linea' : 'border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a href="#inicio" aria-label="CDJ Digital, ir al inicio" className="shrink-0 rounded-md py-1">
          <Logo className="h-9" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-[0.95rem] text-pizarra transition-colors hover:text-tinta">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary min-h-11 px-5 py-2 text-[0.95rem] max-sm:px-4"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Escríbenos
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-tinta transition-colors hover:bg-tinta/5 lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-0.5 w-5 rounded bg-current transition-all duration-200 ${
                  open ? 'scale-x-0 opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        data-open={open}
        className="menu-panel absolute inset-x-0 top-full border-b border-linea bg-bruma lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-x py-2">
          <ul className="flex flex-col divide-y divide-linea">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-[1.75rem] text-tinta"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
