import { BadgeCheck, ChevronDown, Droplets, Hammer, KeyRound, Menu, PaintRoller, ShieldCheck, Sparkles, Star, Timer, Wrench, Zap } from 'lucide-react'
import { WhatsAppIcon } from '../../ui/BrandIcons.jsx'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter, WhatsAppFab } from '../shared.jsx'

const display = "font-['Rubik_Variable']"

const services = [
  [Droplets, 'Gasfitería', 60],
  [Zap, 'Electricidad', 70],
  [PaintRoller, 'Pintura', 250],
  [KeyRound, 'Cerrajería', 50],
  [Hammer, 'Drywall', 180],
  [Sparkles, 'Limpieza de tanques', 120],
]

const works = [
  ['hogar-bano', 'Baño renovado en Surco'],
  ['hogar-electricidad', 'Tablero eléctrico nuevo'],
  ['hogar-pintura', 'Fachada pintada en 2 días'],
]

/** Hogar: azul marino y amarillo de seguridad, letra robusta. Servicios con precio desde, trabajos y cotizador. */
export default function Hogar({ name, mobile }) {
  return (
    <div className={`min-h-full bg-[#eef2f6] text-[#0d2240] ${display}`}>
      <p className="bg-[#ffd23f] px-4 py-2.5 text-center text-[15px] font-semibold">Emergencias de gasfitería y electricidad, las 24 horas</p>
      <header className={`flex items-center justify-between bg-white ${pick(mobile, 'px-5 py-4', 'px-14 py-5')}`}>
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0d2240] text-[#ffd23f]">
            <Wrench className="size-5" />
          </span>
          <span className="truncate text-[22px] font-bold">{name}</span>
        </span>
        {mobile ? (
          <Menu className="size-7 shrink-0" />
        ) : (
          <nav className="flex items-center gap-9 text-[15px] font-medium text-[#41546c]">
            <span>Servicios</span>
            <span>Trabajos</span>
            <span>Opiniones</span>
            <span className="rounded-lg bg-[#0d2240] px-6 py-3 font-semibold text-white">Cotizar gratis</span>
          </nav>
        )}
      </header>

      <section className={`grid items-center gap-10 bg-[#0d2240] text-white ${pick(mobile, 'px-5 py-10', 'grid-cols-[1.05fr_0.95fr] px-14 py-16')}`}>
        <div>
          <h1 className={`leading-[1.02] font-bold [overflow-wrap:anywhere] ${pick(mobile, 'text-[42px]', 'text-[64px]')}`}>{name}</h1>
          <p className={`mt-4 text-[#c9d6e6] ${pick(mobile, 'text-[18px]', 'text-[21px]')}`}>Arreglamos tu casa, rápido y bien.</p>
          <ul className="mt-6 space-y-3 text-[17px]">
            <li className="flex items-center gap-3"><BadgeCheck className="size-6 text-[#ffd23f]" /> Técnicos verificados</li>
            <li className="flex items-center gap-3"><ShieldCheck className="size-6 text-[#ffd23f]" /> Garantía de 90 días</li>
            <li className="flex items-center gap-3"><Timer className="size-6 text-[#ffd23f]" /> Llegamos en 2 horas en Lima</li>
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#ffd23f] px-7 py-4 text-[17px] font-bold text-[#0d2240]">
            <WhatsAppIcon className="size-5" /> Cotizar por WhatsApp
          </span>
        </div>
        <div className="relative">
          <Img src={photo('hogar-hero')} className="aspect-[4/3] w-full rounded-2xl" />
          <span className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-[15px] font-semibold text-[#0d2240] shadow-lg">
            <Star className="size-5 fill-[#ffb400] text-[#ffb400]" /> 4.9 · 230 opiniones
          </span>
        </div>
      </section>

      <section className={pick(mobile, 'px-5 pt-14 pb-12', 'px-14 py-20')}>
        <h2 className={`font-bold ${pick(mobile, 'text-[32px]', 'text-[42px]')}`}>¿Qué necesitas arreglar?</h2>
        <div className={`mt-8 grid gap-4 ${pick(mobile, 'grid-cols-2', 'grid-cols-6')}`}>
          {services.map(([Icon, title, from]) => (
            <article key={title} className="rounded-xl bg-white p-5">
              <span className="flex size-12 items-center justify-center rounded-lg bg-[#ffd23f]/40">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 text-[17px] font-semibold">{title}</h3>
              <p className="mt-1 text-[14px] text-[#5b6b80]">Desde S/ {from}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`bg-white ${pick(mobile, 'px-5 py-12', 'px-14 py-20')}`}>
        <h2 className={`font-bold ${pick(mobile, 'text-[32px]', 'text-[42px]')}`}>Trabajos recientes</h2>
        <div className={`mt-8 grid gap-5 ${pick(mobile, 'grid-cols-1', 'grid-cols-3')}`}>
          {works.map(([key, caption]) => (
            <figure key={key}>
              <Img src={thumb(key)} className="aspect-[4/3] w-full rounded-xl" />
              <figcaption className="mt-3 text-[16px] font-medium">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={pick(mobile, 'px-5 py-12', 'px-14 py-20')}>
        <div className={`rounded-2xl bg-[#0d2240] text-white ${pick(mobile, 'p-6', 'grid grid-cols-[0.9fr_1.1fr] gap-12 p-12')}`}>
          <div>
            <h2 className={`font-bold ${pick(mobile, 'text-[30px]', 'text-[40px]')}`}>Cotiza en un minuto</h2>
            <p className="mt-3 text-[17px] text-[#c9d6e6]">Cuéntanos qué pasa y te enviamos el precio por WhatsApp. Sin compromiso.</p>
          </div>
          <div className={`space-y-3 text-[16px] ${pick(mobile, 'mt-6', '')}`}>
            <span className="flex items-center justify-between rounded-lg bg-white px-4 py-3.5 text-[#0d2240]">
              Gasfitería <ChevronDown className="size-5" />
            </span>
            <span className="flex items-center justify-between rounded-lg bg-white px-4 py-3.5 text-[#0d2240]">
              Santiago de Surco <ChevronDown className="size-5" />
            </span>
            <span className="block h-24 rounded-lg bg-white px-4 py-3.5 text-[#5b6b80]">Gotea el caño de la cocina desde ayer…</span>
            <span className="flex items-center justify-center gap-2 rounded-lg bg-[#ffd23f] py-4 font-bold text-[#0d2240]">
              <WhatsAppIcon className="size-5" /> Enviar por WhatsApp
            </span>
          </div>
        </div>
      </section>

      <SiteFooter
        name={name}
        address="Atendemos en toda Lima Metropolitana"
        mobile={mobile}
        className="bg-white"
        nameClass="font-bold"
        muted="text-[#5b6b80]"
      />
      <WhatsAppFab mobile={mobile} />
    </div>
  )
}
