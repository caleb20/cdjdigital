import { Clock, MapPin, Menu, Plus, Wifi } from 'lucide-react'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter, WhatsAppFab } from '../shared.jsx'

const display = "font-['Fraunces_Variable']"

const bestSellers = [
  ['cafeteria-cappuccino', 'Cappuccino', 'Doble espresso y leche texturizada.', '9.00'],
  ['cafeteria-latte', 'Latte', 'Suave, con arte latte.', '10.00'],
  ['cafeteria-cafe-frio', 'Café frío', 'Cold brew de 18 horas.', '11.00'],
  ['cafeteria-cheesecake', 'Cheesecake', 'Con salsa de frutos rojos.', '14.00'],
]

/** Cafetería: verde botella y avena, serif cálida. Carta con fotos y precios, y cómo llegar. */
export default function Cafeteria({ name, mobile }) {
  return (
    <div className="min-h-full bg-[#fbfaf6] font-sans text-[#22201c]">
      <div className="bg-[#1e3a2f] text-[#f3ecdf]">
        <header className={`flex items-center justify-between ${pick(mobile, 'px-5 py-4', 'px-14 py-6')}`}>
          <span className={`${display} truncate text-[26px] italic`}>{name}</span>
          {mobile ? (
            <Menu className="size-7 shrink-0" />
          ) : (
            <nav className="flex items-center gap-9 text-[15px] text-[#cfd8cf]">
              <span>Carta</span>
              <span>Nuestra casa</span>
              <span>Visítanos</span>
              <span className="rounded-full bg-[#e2b04a] px-6 py-3 font-semibold text-[#1e3a2f]">Pedir por WhatsApp</span>
            </nav>
          )}
        </header>

        <section className={`grid items-center gap-10 ${pick(mobile, 'px-5 pt-4 pb-12', 'grid-cols-[1fr_1fr] px-14 pt-6 pb-20')}`}>
          <div>
            <p className="flex items-center gap-2 text-[15px] text-[#cfd8cf]">
              <span className="size-2.5 rounded-full bg-[#7bd389]" />
              Abierto hoy de 7:00 a. m. a 9:00 p. m.
            </p>
            <h1 className={`${display} mt-5 leading-[1.02] font-semibold [overflow-wrap:anywhere] ${pick(mobile, 'text-[46px]', 'text-[72px]')}`}>
              {name}
            </h1>
            <p className={`mt-4 text-[#cfd8cf] ${pick(mobile, 'text-[18px]', 'max-w-[460px] text-[21px]')}`}>
              Café de especialidad y algo rico para acompañar, en el corazón de Barranco.
            </p>
            <div className={`mt-8 flex gap-3 ${pick(mobile, 'flex-col', '')}`}>
              <span className="rounded-full bg-[#e2b04a] px-7 py-4 text-center text-[16px] font-semibold text-[#1e3a2f]">Ver la carta</span>
              <span className="rounded-full border border-[#f3ecdf]/40 px-7 py-4 text-center text-[16px]">Cómo llegar</span>
            </div>
          </div>
          <div className="relative">
            <Img src={photo('cafeteria-hero')} className={`w-full rounded-[28px] ${pick(mobile, 'aspect-[4/3]', 'aspect-[5/4]')}`} />
            <div className={`absolute flex items-center gap-3 rounded-2xl bg-[#fbfaf6] p-3 pr-5 text-[#22201c] shadow-xl ${pick(mobile, '-bottom-6 left-4', '-bottom-7 -left-8')}`}>
              <Img src={thumb('cafeteria-cappuccino')} className="size-14 rounded-xl" />
              <div>
                <p className="text-[13px] text-[#6b665c]">El más pedido</p>
                <p className="text-[17px] font-semibold">Cappuccino · S/ 9.00</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={pick(mobile, 'px-5 pt-16 pb-14', 'px-14 pt-24 pb-20')}>
        <div className="flex items-end justify-between">
          <h2 className={`${display} font-semibold ${pick(mobile, 'text-[32px]', 'text-[44px]')}`}>Lo más pedido</h2>
          {!mobile && <span className="text-[16px] font-semibold text-[#1e3a2f] underline underline-offset-4">Ver toda la carta</span>}
        </div>
        <div className={`mt-8 grid gap-5 ${pick(mobile, 'grid-cols-2', 'grid-cols-4')}`}>
          {bestSellers.map(([key, item, description, price]) => (
            <article key={key} className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
              <Img src={thumb(key)} className="aspect-square w-full" />
              <div className="p-4">
                <h3 className={`${display} text-[21px] font-semibold`}>{item}</h3>
                {!mobile && <p className="mt-1 text-[14px] text-[#6b665c]">{description}</p>}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[17px] font-semibold">S/ {price}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#1e3a2f] text-white">
                    <Plus className="size-5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`grid items-center gap-10 bg-[#efe9dc] ${pick(mobile, 'px-5 py-14', 'grid-cols-[0.9fr_1.1fr] px-14 py-20')}`}>
        <Img src={photo('cafeteria-tazas')} className="aspect-[4/3] w-full rounded-[24px]" />
        <div>
          <h2 className={`${display} font-semibold ${pick(mobile, 'text-[32px]', 'text-[44px]')}`}>Tu lugar para quedarte un rato</h2>
          <p className="mt-4 text-[18px] leading-relaxed text-[#4d483f]">
            Granos de Villa Rica tostados cada semana, postres de la casa y mesas cómodas para conversar o trabajar.
          </p>
          <ul className="mt-6 space-y-3 text-[16px]">
            <li className="flex items-center gap-3"><Wifi className="size-5 text-[#1e3a2f]" /> Wifi y enchufes en todas las mesas</li>
            <li className="flex items-center gap-3"><Clock className="size-5 text-[#1e3a2f]" /> Lunes a domingo, de 7:00 a. m. a 9:00 p. m.</li>
            <li className="flex items-center gap-3"><MapPin className="size-5 text-[#1e3a2f]" /> Av. Grau 512, Barranco</li>
          </ul>
        </div>
      </section>

      <SiteFooter
        name={name}
        address="Av. Grau 512, Barranco"
        mobile={mobile}
        className="bg-[#1e3a2f] text-[#f3ecdf]"
        nameClass={`${display} italic`}
        muted="text-[#cfd8cf]"
      />
      <WhatsAppFab mobile={mobile} />
    </div>
  )
}
