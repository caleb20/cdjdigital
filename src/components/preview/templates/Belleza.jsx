import { Menu } from 'lucide-react'
import { photo, thumb } from '../assets.js'
import { Img, pick, SiteFooter, WhatsAppFab } from '../shared.jsx'

const display = "font-['Cormorant_Variable']"

const services = [
  ['Manicure semipermanente', '60 min', 45],
  ['Pedicure spa', '75 min', 55],
  ['Extensión de pestañas', '90 min', 120],
  ['Limpieza facial profunda', '60 min', 90],
  ['Corte y brushing', '60 min', 70],
  ['Diseño de cejas', '30 min', 35],
]

const days = [
  ['Lun', 13],
  ['Mar', 14],
  ['Mié', 15],
  ['Jue', 16],
  ['Vie', 17],
  ['Sáb', 18],
]

/** Belleza: rubor y ciruela, serif elegante en cursiva. Servicios con duración, galería y agenda de citas. */
export default function Belleza({ name, mobile }) {
  return (
    <div className="min-h-full bg-[#fbf3f1] font-sans text-[#3b1625]">
      <header className={`flex items-center ${pick(mobile, 'justify-between px-5 py-4', 'justify-between px-14 py-6')}`}>
        {!mobile && (
          <nav className="flex w-[260px] gap-8 text-[15px] text-[#7a4a5c]">
            <span>Servicios</span>
            <span>Galería</span>
            <span>Nosotras</span>
          </nav>
        )}
        <span className={`${display} truncate text-[32px] font-medium italic`}>{name}</span>
        {mobile ? (
          <Menu className="size-7 shrink-0" />
        ) : (
          <span className="flex w-[260px] justify-end">
            <span className="rounded-full bg-[#4a2233] px-6 py-3 text-[15px] font-medium text-white">Agendar cita</span>
          </span>
        )}
      </header>

      <section className={`relative ${pick(mobile, 'px-5 pb-12', 'px-14 pb-20')}`}>
        <Img src={photo('belleza-hero')} className={`w-full rounded-[28px] ${pick(mobile, 'aspect-[4/5]', 'ml-auto block aspect-[16/10] max-w-[820px]')}`} />
        <div
          className={`bg-[#f3dcd8] ${pick(
            mobile,
            'relative -mt-24 mx-3 rounded-[24px] p-6',
            'absolute top-1/2 left-14 w-[520px] -translate-y-1/2 rounded-[28px] p-10',
          )}`}
        >
          <h1 className={`${display} leading-[0.98] font-medium italic [overflow-wrap:anywhere] ${pick(mobile, 'text-[46px]', 'text-[76px]')}`}>{name}</h1>
          <p className={`mt-4 text-[#6b3a4c] ${pick(mobile, 'text-[17px]', 'text-[19px]')}`}>
            Uñas, pestañas y tratamientos faciales para que te sientas bien, a tu ritmo.
          </p>
          <span className="mt-7 inline-block rounded-full bg-[#4a2233] px-7 py-4 text-[16px] font-medium text-white">Agendar cita</span>
          <p className="mt-3 text-[14px] text-[#7a4a5c]">Atendemos con cita previa, de martes a domingo.</p>
        </div>
      </section>

      <section className={`bg-white ${pick(mobile, 'px-5 py-12', 'px-14 py-20')}`}>
        <h2 className={`${display} font-medium italic ${pick(mobile, 'text-[40px]', 'text-[56px]')}`}>Servicios</h2>
        <ul className={`mt-6 grid gap-x-14 ${pick(mobile, 'grid-cols-1', 'grid-cols-2')}`}>
          {services.map(([service, time, price]) => (
            <li key={service} className="flex items-baseline justify-between gap-4 border-b border-[#3b1625]/10 py-5">
              <span>
                <span className={`${display} block text-[25px] font-medium`}>{service}</span>
                <span className="text-[14px] text-[#7a4a5c]">{time}</span>
              </span>
              <span className="text-[18px] font-semibold">S/ {price}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={pick(mobile, 'px-5 py-12', 'px-14 py-20')}>
        <div className={`grid gap-4 ${pick(mobile, 'grid-cols-2', 'grid-cols-[1.3fr_1fr_1fr]')}`}>
          <Img src={thumb('belleza-unas')} className={`w-full rounded-[20px] ${pick(mobile, 'aspect-square', 'row-span-2 h-full')}`} />
          <Img src={thumb('belleza-pestanas')} className="aspect-square w-full rounded-[20px]" />
          <Img src={thumb('belleza-facial')} className="aspect-square w-full rounded-[20px]" />
          <Img src={thumb('belleza-cabello')} className={`aspect-square w-full rounded-[20px] ${pick(mobile, '', 'col-span-2 aspect-[2/1]')}`} />
        </div>
      </section>

      <section className={`bg-[#4a2233] text-white ${pick(mobile, 'px-5 py-12', 'px-14 py-16')}`}>
        <h2 className={`${display} font-medium italic ${pick(mobile, 'text-[38px]', 'text-[50px]')}`}>Elige tu día</h2>
        <div className={`mt-6 grid gap-2 ${pick(mobile, 'grid-cols-6', 'max-w-[640px] grid-cols-6')}`}>
          {days.map(([day, number]) => (
            <span
              key={day}
              className={`rounded-2xl py-3 text-center ${number === 16 ? 'bg-[#f3dcd8] text-[#3b1625]' : 'ring-1 ring-white/25'}`}
            >
              <span className="block text-[13px] opacity-80">{day}</span>
              <span className="text-[20px] font-semibold">{number}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[15px]">
          {['10:00', '11:30', '15:00', '16:30', '18:00'].map((time, index) => (
            <span key={time} className={`rounded-full px-5 py-2 ${index === 1 ? 'bg-white text-[#3b1625]' : 'ring-1 ring-white/25'}`}>
              {time}
            </span>
          ))}
        </div>
        <span className="mt-7 inline-block rounded-full bg-[#f3dcd8] px-7 py-4 text-[16px] font-semibold text-[#3b1625]">
          Confirmar el jueves 16 a las 11:30
        </span>
      </section>

      <SiteFooter
        name={name}
        address="Calle Las Camelias 760, San Isidro"
        mobile={mobile}
        nameClass={`${display} italic font-medium`}
        muted="text-[#7a4a5c]"
      />
      <WhatsAppFab mobile={mobile} />
    </div>
  )
}
