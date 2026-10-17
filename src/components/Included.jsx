import { Fragment, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { corporateEmail, includedInAll, minorChanges, planComparison, plans } from '../data/pricing.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import SectionHeading from './ui/SectionHeading.jsx'

/** Celda de la tabla: texto, «Incluido» (true) o «No incluido» (null). */
function Value({ value }) {
  if (value === null) {
    return (
      <>
        <span aria-hidden="true" className="text-muro">—</span>
        <span className="sr-only">No incluido</span>
      </>
    )
  }
  if (value === true) {
    return (
      <>
        <Check className="mx-auto h-5 w-5" strokeWidth={2.6} aria-hidden="true" />
        <span className="sr-only">Incluido</span>
      </>
    )
  }
  return value
}

/** Fila de la tabla. La explicación ocupa todo el ancho debajo, para que se lea bien en celular. */
function ComparisonRow({ row, index }) {
  const [open, setOpen] = useState(false)
  const hintId = `fila-${index}`

  return (
    <Fragment>
      <tr className="align-top">
        <th scope="row" className="py-3 pr-2 pl-4 text-left font-normal sm:pl-6">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={hintId}
            onClick={() => setOpen((value) => !value)}
            className="w-full text-left font-semibold"
          >
            {row.label}
            <ChevronDown
              className={`ml-1 inline h-4 w-4 align-[-0.15em] text-muro transition-transform duration-(--dur-standard) ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        </th>
        {plans.map((plan) => (
          <td
            key={plan.id}
            className={`px-1 py-3 text-center text-[0.9rem] sm:px-3 sm:text-base ${plan.featured ? 'bg-neblina/60' : ''}`}
          >
            <Value value={row[plan.id]} />
          </td>
        ))}
      </tr>
      <tr className="border-b border-linea last:border-b-0">
        <td colSpan={plans.length + 1} className="p-0">
          <div id={hintId} data-open={open} className="accordion-panel">
            <div>
              <p className="max-w-[60ch] px-4 pb-4 text-[0.95rem] leading-relaxed text-muro sm:px-6">{row.hint}</p>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  )
}

function ChangesDisclosure() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-6 border-y border-linea">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="cambio-menor"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-lg font-semibold"
      >
        ¿Qué cuenta como un cambio?
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-(--dur-standard) ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <div id="cambio-menor" data-open={open} className="accordion-panel">
        <div>
          <div className="pb-6">
            <p className="max-w-[60ch] leading-relaxed text-muro">{minorChanges.definition}</p>
            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { title: 'Incluido en tu mensualidad', items: minorChanges.included, Icon: Check },
                { title: 'Se cotiza aparte', items: minorChanges.extra, Icon: X },
              ].map(({ title, items, Icon }) => (
                <div key={title}>
                  <h4 className="font-semibold">{title}</h4>
                  <ul className="mt-3 space-y-2 text-[0.95rem]">
                    {items.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muro" strokeWidth={2.6} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-[60ch] text-[0.95rem] leading-relaxed text-muro">{minorChanges.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** ¿Qué incluye? Lo común una sola vez, y en la tabla solo lo que cambia entre planes. */
export default function Included() {
  return (
    <section id="incluye" aria-labelledby="incluye-title" className="section-y border-t border-linea">
      <div className="container-x">
        <SectionHeading
          id="incluye-title"
          title="¿Qué incluye?"
          description="Lo técnico corre por nuestra cuenta. Esto es lo que recibes en cada plan, sin letra chica."
        />

        <h3 className="mt-10 text-lg font-semibold">En los tres planes</h3>
        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {includedInAll.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-lg font-semibold">Lo que cambia entre planes</h3>
        <p className="mt-1 text-[0.95rem] text-muro">Toca cada fila para ver qué significa.</p>
        <div className="mt-4 overflow-hidden rounded-2xl bg-papel ring-1 ring-linea">
          <table className="w-full table-fixed">
            <caption className="sr-only">Lo que cambia entre los planes Inicio, Negocio y Pro</caption>
            <colgroup>
              <col className="w-[40%] sm:w-[46%]" />
              {plans.map((plan) => (
                <col key={plan.id} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-linea">
                <td className="py-4 pl-4 sm:pl-6" />
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={`px-1 py-4 text-center font-bold sm:px-3 ${plan.featured ? 'bg-neblina/60' : ''}`}
                  >
                    {plan.name}
                    <span className="block text-sm font-normal text-muro">S/{plan.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planComparison.map((row, index) => (
                <ComparisonRow key={row.label} row={row} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <ChangesDisclosure />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Correo con tu dominio</h3>
            <p className="mt-1 leading-relaxed text-muro">
              Un correo como {corporateEmail.example}, para verte más formal. S/{corporateEmail.price} por cuenta al mes.
            </p>
            <a
              href={getWhatsAppUrl(whatsappMessages.corporateEmail)}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-3 inline-flex min-h-11 items-center"
            >
              Pedir correo con tu dominio
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Algo a medida</h3>
            <p className="mt-1 leading-relaxed text-muro">
              Pagos en línea, un sistema interno o una integración: lo cotizamos antes de empezar, sin compromiso.
            </p>
            <a
              href={getWhatsAppUrl(whatsappMessages.project)}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-3 inline-flex min-h-11 items-center"
            >
              Consultar un proyecto
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
