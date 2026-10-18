import { Bike, Menu, Plus, ShoppingBag, Store } from 'lucide-react'
import { WhatsAppIcon } from '../../ui/BrandIcons.jsx'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter } from '../shared.jsx'

const display = "font-['Shrikhand']"

const menu = [
  ['pizzeria-margarita', 'Margarita', 'Tomate San Marzano, mozzarella y albahaca.', ['Personal S/ 22', 'Familiar S/ 39']],
  ['pizzeria-pepperoni', 'Pepperoni', 'Doble pepperoni y orégano.', ['Personal S/ 25', 'Familiar S/ 45']],
  ['pizzeria-suprema', 'Suprema', 'Salchicha, champiñones y aceitunas.', ['Personal S/ 28', 'Familiar S/ 49']],
  ['pizzeria-lasana', 'Lasaña de la nonna', 'Boloñesa, bechamel y parmesano.', ['Porción S/ 26']],
]

/** Pizzería: rojo tomate y crema, letra redonda de rótulo. Carta con tamaños, promo y carrito de pedido. */
export default function Pizzeria({ name, mobile }) {
  return (
    <div className="min-h-full bg-[#fff6e5] font-sans text-[#2a1410]">
      <p className="bg-[#c8311c] px-4 py-2.5 text-center text-[15px] font-semibold text-[#fff6e5]">
        Martes de 2x1 en pizzas familiares
      </p>
      <header className={`flex items-center justify-between ${pick(mobile, 'px-5 py-4', 'px-14 py-5')}`}>
        <span className={`${display} truncate text-[26px] text-[#c8311c]`}>{name}</span>
        {mobile ? (
          <Menu className="size-7 shrink-0" />
        ) : (
          <nav className="flex items-center gap-9 text-[15px] font-medium">
            <span>Carta</span>
            <span>Promos</span>
            <span>Delivery</span>
            <span className="flex items-center gap-2 rounded-full bg-[#c8311c] px-6 py-3 font-semibold text-white">
              <ShoppingBag className="size-4" /> Pedir ahora
            </span>
          </nav>
        )}
      </header>

      <section className={`grid items-center gap-10 ${pick(mobile, 'px-5 pt-2 pb-12', 'grid-cols-[1fr_1.05fr] px-14 pt-6 pb-20')}`}>
        <div>
          <h1 className={`${display} leading-[1.05] text-[#c8311c] [overflow-wrap:anywhere] ${pick(mobile, 'text-[44px]', 'text-[68px]')}`}>
            {name}
          </h1>
          <p className={`mt-5 text-[#5a3b30] ${pick(mobile, 'text-[17px]', 'text-[20px]')}`}>
            Pizza artesanal, recién salida del horno a leña. Masa de 48 horas y delivery caliente en 35 minutos.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[15px] font-medium">
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-[#2a1410]/10"><Bike className="size-4 text-[#c8311c]" /> Delivery</span>
            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-[#2a1410]/10"><Store className="size-4 text-[#c8311c]" /> Recojo en tienda</span>
          </div>
          <span className="mt-8 inline-block rounded-full bg-[#c8311c] px-8 py-4 text-[17px] font-semibold text-white">Ver la carta</span>
        </div>
        <Img src={photo('pizzeria-hero')} className={`w-full rounded-[32px] ${pick(mobile, 'aspect-[4/3]', 'aspect-[6/5]')}`} />
      </section>

      <section className={`bg-white ${pick(mobile, 'px-5 py-12', 'px-14 py-20')}`}>
        <h2 className={`${display} text-[#c8311c] ${pick(mobile, 'text-[32px]', 'text-[44px]')}`}>Nuestra carta</h2>
        <div className="mt-5 flex gap-2 text-[15px] font-semibold">
          <span className="rounded-full bg-[#2a1410] px-5 py-2 text-white">Pizzas</span>
          <span className="rounded-full px-5 py-2 ring-1 ring-[#2a1410]/15">Pastas</span>
          <span className="rounded-full px-5 py-2 ring-1 ring-[#2a1410]/15">Bebidas</span>
        </div>
        <div className={`mt-8 grid gap-5 ${pick(mobile, 'grid-cols-1', 'grid-cols-4')}`}>
          {menu.map(([key, item, description, sizes]) => (
            <article key={key} className={`overflow-hidden rounded-2xl bg-[#fff6e5] ${pick(mobile, 'flex', '')}`}>
              <Img src={thumb(key)} className={pick(mobile, 'w-32 shrink-0', 'aspect-[4/3] w-full')} />
              <div className="flex-1 p-4">
                <h3 className="text-[19px] font-bold">{item}</h3>
                <p className="mt-1 text-[14px] text-[#5a3b30]">{description}</p>
                <p className="mt-2 text-[14px] font-semibold text-[#c8311c]">{sizes.join(' · ')}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#2e6b3a] px-4 py-2 text-[14px] font-semibold text-white">
                  <Plus className="size-4" /> Agregar
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`relative ${pick(mobile, 'h-[340px]', 'h-[380px]')}`}>
        <Img src={photo('pizzeria-horno')} className="absolute inset-0 size-full" />
        <div className="absolute inset-0 bg-[#2a1410]/55" />
        <div className={`relative flex h-full flex-col justify-center text-[#fff6e5] ${pick(mobile, 'px-6', 'px-14')}`}>
          <h2 className={`${display} ${pick(mobile, 'text-[34px]', 'text-[52px]')}`}>Horno a leña</h2>
          <p className="mt-2 max-w-[520px] text-[18px]">Encendemos el horno a las 6 p. m. y no lo apagamos hasta la última pizza.</p>
        </div>
      </section>

      <SiteFooter
        name={name}
        address="Av. Benavides 1180, Miraflores · Delivery hasta las 11 p. m."
        mobile={mobile}
        className="pb-28"
        nameClass={`${display} text-[#c8311c]`}
        muted="text-[#5a3b30]"
      />

      <div className={`sticky bottom-0 flex items-center justify-between gap-4 bg-[#2a1410] text-white ${pick(mobile, 'px-5 py-4', 'px-14 py-5')}`}>
        <span className="text-[16px] whitespace-nowrap">
          <span className="font-semibold">2 pizzas</span> · S/ 84.00
        </span>
        <span className="flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-[15px] font-semibold whitespace-nowrap">
          <WhatsAppIcon className="size-5" /> {mobile ? 'Pedir' : 'Pedir por WhatsApp'}
        </span>
      </div>
    </div>
  )
}
