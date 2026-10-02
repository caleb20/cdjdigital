import { Mail, MapPin } from 'lucide-react'
import { site, whatsappMessages } from '../config/site.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from './ui/BrandIcons.jsx'
import Logo from './ui/Logo.jsx'

const company = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Planes', href: '#planes' },
  { label: 'Demos', href: '#demos' },
  { label: 'FAQ', href: '#faq' },
]

const services = [
  { label: 'Diseño web', href: '#servicios' },
  { label: 'Landing pages', href: '#planes' },
  { label: 'SEO básico', href: '#seo' },
  { label: 'Mantenimiento', href: '#incluye' },
  { label: 'Correo corporativo', href: '#correo' },
]

const socials = [
  { label: 'Facebook', href: site.social.facebook, Icon: FacebookIcon },
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
  { label: 'TikTok', href: site.social.tiktok, Icon: TikTokIcon },
]

const linkClass = 'text-sm text-slate-400 transition-colors hover:text-white'

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950 pt-14 pb-28 sm:pb-10">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#inicio" aria-label="CDJ Digital — ir al inicio" className="inline-block rounded-md">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{site.tagline}</p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-slate-300 transition duration-200 hover:scale-105 hover:border-brand-400/50 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-[1.15rem] w-[1.15rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Empresa">
            {company.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Servicios">
            {services.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contacto">
            <li>
              <a
                href={getWhatsAppUrl(whatsappMessages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {site.city}, {site.country}
            </li>
          </FooterColumn>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
          © {site.year} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
