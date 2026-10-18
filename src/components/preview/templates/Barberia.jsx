import { Menu, Scissors } from 'lucide-react'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter, WhatsAppFab } from '../shared.jsx'

const display = "font-['Alfa_Slab_One']"

const services = [
  ['Corte clásico', '30 min', 25],
  ['Fade o degradado', '40 min', 30],
  ['Perfilado de barba', '20 min', 15],
  ['Corte y barba', '50 min', 35],
  ['Afeitado con navaja', '30 min', 25],
]

const slots = [
  ['10:00', 'busy'],
  ['10:30', 'busy'],
  ['11:00', ''],
  ['11:30', 'selected'],
  ['12:00', ''],
  ['12:30', 'busy'],
  ['15:00', ''],
  ['15:30', ''],
]

/** Barbería: oscura, con latón y la franja del poste de barbero. Reserva de turnos y lista de precios. */
export default function Barberia({ name, mobile }) {
  return (
    <div className="min-h-full bg-[#14110f] font-sans text-[#f1e9dc]">
      <header className={`flex items-center justify-between border-b border-white/10 ${pick(mobile, 'px-5 py-4', 'px-14 py-5')}`}>
        <span className="flex min-w-0 items-center gap-3">
          <Scissors className="size-6 shrink-0 text-[#c9a24a]" />
          <span className={`${display} truncate text-[22px]`}>{name}</span>
        </span>
        {mobile ? (
          <Menu className="size-7 shrink-0" />
        ) : (
          <nav className="flex items-center gap-9 text-[15px] text-[#b3a796]">
            <span>Servicios</span>
            <span>Galería</span>
            <span>Ubicación</span>
            <span className="rounded-full bg-[#c9a24a] px-6 py-3 font-semibold text-[#14110f]">Reservar turno</span>
          </nav>
        )}
      </header>

      <section className={`relative ${pick(mobile, 'h-[600px]', 'h-[640px]')}`}>
        <Img src={photo('barberia-hero')} className="absolute inset-0 size-full object-[70%_30%]" />
        <div
          className={`absolute inset-0 ${pick(
            mobile,
            'bg-gradient-to-t from-[#14110f] via-[#14110f]/75 to-[#14110f]/10',
            'bg-gradient-to-r from-[#14110f] via-[#14110f]/80 to-transparent',
          )}`}
        />
        <div className={`relative flex h-full flex-col justify-end ${pick(mobile, 'p-6 pb-10', 'max-w-[680px] p-14')}`}>
          <p className="text-[15px] font-semibold text-[#c9a24a]">Barbería en Lima, desde 2015</p>
          <h1 className={`${display} mt-3 leading-[1.02] [overflow-wrap:anywhere] ${pick(mobile, 'text-[42px]', 'text-[70px]')}`}>
            {name}
          </h1>
          <p className={`mt-4 text-[#d8cdbd] ${pick(mobile, 'text-[17px]', 'max-w-[480px] text-[20px]')}`}>
            Cortes con estilo, sin esperar. Reserva tu turno en un minuto y llega a la hora.
          </p>
          <div className={`mt-7 flex gap-3 ${pick(mobile, 'flex-col', '')}`}>
            <span className="rounded-full bg-[#c9a24a] px-7 py-4 text-center text-[16px] font-semibold text-[#14110f]">
              Reservar turno
            </span>
            <span className="rounded-full border border-white/30 px-7 py-4 text-center text-[16px]">Ver servicios</span>
          </div>
        </div>
      </section>

      <div className="h-3 bg-[repeating-linear-gradient(135deg,#a3261b_0_18px,#f1e9dc_18px_36px,#1f3f8a_36px_54px,#f1e9dc_54px_72px)]" />

      <section className={`grid gap-12 ${pick(mobile, 'px-6 py-14', 'grid-cols-[1.1fr_0.9fr] px-14 py-20')}`}>
        <div>
          <h2 className={`${display} text-[34px]`}>Servicios</h2>
          <ul className="mt-8 space-y-6">
            {services.map(([service, time, price]) => (
              <li key={service} className="flex items-baseline gap-3">
                <span className="text-[18px] font-semibold">{service}</span>
                {!mobile && <span className="text-[14px] text-[#b3a796]">{time}</span>}
                <span className="min-w-6 flex-1 border-b border-dotted border-white/25" />
                <span className={`${display} text-[20px] text-[#c9a24a]`}>S/ {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-[#1e1a17] p-7 ring-1 ring-white/10">
          <h3 className={`${display} text-[26px]`}>Reserva tu turno</h3>
          <p className="mt-1 text-[15px] text-[#b3a796]">Hoy, sábado 18 · con Lucho</p>
          <div className="mt-6 grid grid-cols-4 gap-2 text-[15px]">
            {slots.map(([time, state]) => (
              <span
                key={time}
                className={`rounded-lg py-3 text-center ${
                  state === 'selected'
                    ? 'bg-[#c9a24a] font-semibold text-[#14110f]'
                    : state === 'busy'
                      ? 'text-white/30 line-through ring-1 ring-white/10'
                      : 'ring-1 ring-white/25'
                }`}
              >
                {time}
              </span>
            ))}
          </div>
          <span className="mt-6 block rounded-full bg-[#c9a24a] py-4 text-center text-[16px] font-semibold text-[#14110f]">
            Reservar a las 11:30
          </span>
        </div>
      </section>

      <section className={pick(mobile, 'px-6 pb-14', 'px-14 pb-20')}>
        <h2 className={`${display} text-[34px]`}>El trabajo de la casa</h2>
        <div className={`mt-8 grid gap-3 ${pick(mobile, 'grid-cols-2', 'grid-cols-4')}`}>
          {['barberia-fade', 'barberia-barba', 'barberia-local', 'barberia-herramientas'].map((key) => (
            <Img key={key} src={thumb(key)} className="aspect-[4/5] w-full rounded-xl" />
          ))}
        </div>
      </section>

      <SiteFooter
        name={name}
        address="Jr. Los Pinos 214, Surquillo · Lun a sáb, 10:00 a 21:00"
        mobile={mobile}
        className="border-t border-white/10"
        nameClass={display}
        muted="text-[#b3a796]"
      />
      <WhatsAppFab mobile={mobile} />
    </div>
  )
}
