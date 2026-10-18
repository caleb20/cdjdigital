import { Dumbbell, Menu } from 'lucide-react'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter, WhatsAppFab } from '../shared.jsx'

const display = "font-['Anton'] uppercase"

const classes = [
  ['gimnasio-spinning', 'Spinning', '7:00 a. m.', 'Quedan 4 cupos'],
  ['gimnasio-funcional', 'Funcional', '6:00 p. m.', 'Quedan 6 cupos'],
  ['gimnasio-box', 'Box', '7:30 p. m.', 'Quedan 2 cupos'],
]

const plans = [
  ['Mensual', 99, 'Sala de pesas y todas las clases'],
  ['Trimestral', 269, 'Ahorras S/ 28'],
  ['Anual', 899, 'Ahorras S/ 289 y una evaluación al mes'],
]

/** Gimnasio: negro y naranja, letra condensada en mayúsculas. Clases del día con cupos y planes. */
export default function Gimnasio({ name, mobile }) {
  return (
    <div className="min-h-full bg-[#0b0d10] font-sans text-white">
      <header className={`flex items-center justify-between ${pick(mobile, 'px-5 py-4', 'px-14 py-5')}`}>
        <span className="flex min-w-0 items-center gap-2.5">
          <Dumbbell className="size-7 shrink-0 text-[#ff5a1f]" />
          <span className={`${display} truncate text-[24px] tracking-wide`}>{name}</span>
        </span>
        {mobile ? (
          <Menu className="size-7 shrink-0" />
        ) : (
          <nav className="flex items-center gap-9 text-[15px] font-semibold text-[#c4ccd5]">
            <span>Clases</span>
            <span>Planes</span>
            <span>Horarios</span>
            <span className="rounded-md bg-[#ff5a1f] px-6 py-3 text-white">Prueba gratis</span>
          </nav>
        )}
      </header>

      <section className={`relative ${pick(mobile, 'h-[600px]', 'h-[620px]')}`}>
        <Img src={photo('gimnasio-hero')} className="absolute inset-0 size-full object-[50%_60%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/60 to-[#0b0d10]/20" />
        <div className={`relative flex h-full flex-col justify-end ${pick(mobile, 'p-6 pb-10', 'p-14')}`}>
          <h1 className={`${display} leading-[0.95] [overflow-wrap:anywhere] ${pick(mobile, 'text-[56px]', 'text-[104px]')}`}>{name}</h1>
          <span className="mt-4 block h-2 w-28 bg-[#ff5a1f]" />
          <p className={`mt-5 text-[#c4ccd5] ${pick(mobile, 'text-[18px]', 'max-w-[520px] text-[21px]')}`}>
            Entrena sin excusas: abierto de 5 a. m. a 11 p. m., de lunes a sábado.
          </p>
          <div className={`mt-7 flex gap-3 ${pick(mobile, 'flex-col', '')}`}>
            <span className="rounded-md bg-[#ff5a1f] px-7 py-4 text-center text-[17px] font-bold">Tu primera clase gratis</span>
            <span className="rounded-md border border-white/30 px-7 py-4 text-center text-[17px] font-semibold">Ver planes</span>
          </div>
        </div>
      </section>

      <section className={`grid border-y border-white/10 ${pick(mobile, 'grid-cols-3 px-3 py-6 text-center', 'grid-cols-3 px-14 py-10')}`}>
        {[
          ['+20', 'clases por semana'],
          ['8', 'entrenadores'],
          ['500 m²', 'de sala'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className={`${display} text-[#ff5a1f] ${pick(mobile, 'text-[30px]', 'text-[48px]')}`}>{value}</p>
            <p className={`text-[#c4ccd5] ${pick(mobile, 'text-[13px]', 'text-[16px]')}`}>{label}</p>
          </div>
        ))}
      </section>

      <section className={pick(mobile, 'px-5 py-12', 'px-14 py-20')}>
        <h2 className={`${display} ${pick(mobile, 'text-[38px]', 'text-[56px]')}`}>Clases de hoy</h2>
        <div className={`mt-8 grid gap-5 ${pick(mobile, 'grid-cols-1', 'grid-cols-3')}`}>
          {classes.map(([key, title, time, spots]) => (
            <article key={key} className="relative overflow-hidden rounded-xl">
              <Img src={thumb(key)} className={`w-full ${pick(mobile, 'aspect-[16/9]', 'aspect-[4/3]')}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-[14px] font-semibold text-[#ff5a1f]">{time}</p>
                  <h3 className={`${display} text-[30px]`}>{title}</h3>
                  <p className="text-[14px] text-[#c4ccd5]">{spots}</p>
                </div>
                <span className="rounded-md bg-white px-4 py-2 text-[14px] font-bold text-[#0b0d10]">Reservar</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`bg-[#15191e] ${pick(mobile, 'px-5 py-12', 'px-14 py-20')}`}>
        <h2 className={`${display} ${pick(mobile, 'text-[38px]', 'text-[56px]')}`}>Planes</h2>
        <div className={`mt-8 grid gap-5 ${pick(mobile, 'grid-cols-1', 'grid-cols-3')}`}>
          {plans.map(([title, price, note], index) => (
            <article
              key={title}
              className={`rounded-xl p-7 ${index === 2 ? 'bg-[#ff5a1f]' : 'bg-[#0b0d10] ring-1 ring-white/10'}`}
            >
              <h3 className={`${display} text-[26px]`}>{title}</h3>
              <p className="mt-3">
                <span className={`${display} text-[52px]`}>S/ {price}</span>
              </p>
              <p className={`mt-2 text-[15px] ${index === 2 ? 'text-white' : 'text-[#c4ccd5]'}`}>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter
        name={name}
        address="Av. Aviación 2950, San Borja · Lun a sáb, 5:00 a. m. a 11:00 p. m."
        mobile={mobile}
        nameClass={display}
        muted="text-[#c4ccd5]"
      />
      <WhatsAppFab mobile={mobile} />
    </div>
  )
}
