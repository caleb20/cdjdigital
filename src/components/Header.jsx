import { useEffect, useRef, useState } from 'react'
import { whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'
import Logo from './ui/Logo.jsx'

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Planes', href: '#planes' },
  { label: 'Demos', href: '#demos' },
  { label: '¿Qué incluye?', href: '#incluye' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  // Glassmorphism al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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

  const cta = getWhatsAppUrl(whatsappMessages.general)
  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-white/10 bg-ink-950/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-[4.25rem] items-center justify-between gap-6">
        <a href="#inicio" aria-label="CDJ Digital — ir al inicio" className="shrink-0 rounded-md py-1">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hidden min-h-11 px-5 py-2.5 text-sm lg:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Quiero mi web
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition-colors hover:bg-white/10 lg:hidden"
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
        className="menu-panel absolute inset-x-0 top-full border-b border-white/10 bg-ink-950 shadow-2xl shadow-black/50 lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-x py-4">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-1 py-3.5 text-base font-medium text-slate-200 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-3 w-full"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Quiero mi web
          </a>
        </nav>
      </div>
    </header>
  )
}
