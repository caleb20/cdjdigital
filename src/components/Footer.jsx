import { Mail, MapPin } from 'lucide-react'
import { isPlaceholder, site, whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { navLinks } from './Header.jsx'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './ui/BrandIcons.jsx'
import Logo from './ui/Logo.jsx'

// Las redes solo aparecen cuando tienen un perfil real (no un placeholder de site.js).
const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
  { label: 'TikTok', href: site.social.tiktok, Icon: TikTokIcon },
].filter(({ href }) => href && !isPlaceholder(href))

const linkClass = 'inline-flex min-h-10 items-center gap-2 text-ceniza transition-colors hover:text-white'

/** Sigue la franja oscura del cierre; en celular deja espacio para la barra fija de WhatsApp. */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-tinta pt-12 pb-28 text-white lg:pb-12">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <a href="#inicio" aria-label="CDJ Digital, ir al inicio" className="inline-block rounded-md">
              <Logo tone="light" className="h-9" />
            </a>
            <p className="mt-4 max-w-xs text-ceniza">{site.tagline}</p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-ceniza transition-colors hover:border-white hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Pie de página" className="col-span-2 lg:col-span-1">
            <ul className="grid grid-cols-2 gap-x-6 lg:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="col-span-2 lg:col-span-1">
            <li>
              <a href={getWhatsAppUrl(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex min-h-10 items-center gap-2 text-ceniza">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.city}, {site.country}
            </li>
          </ul>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-ceniza">
          © {site.year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
