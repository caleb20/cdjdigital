import { Check, X } from 'lucide-react'
import { minorChanges, planComparison, plans } from '../data/pricing.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/** Celda de la tabla: texto, o «No incluido» cuando el valor es null. */
function Value({ value }) {
  if (value === null) {
    return (
      <>
        <span aria-hidden="true" className="text-slate-400">—</span>
        <span className="sr-only">No incluido</span>
      </>
    )
  }
  return value
}

function ListBlock({ title, items, Icon, tone }) {
  const included = tone === 'included'
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
      <h4 className="text-base font-bold text-ink-800">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-[0.92rem] text-slate-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                included ? 'bg-brand-50 text-brand-600 ring-1 ring-brand-100' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Icon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PlanDetails() {
  return (
    <section id="detalle" aria-labelledby="detalle-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeading
          id="detalle-title"
          eyebrow="El detalle"
          title="Qué incluye cada plan, sin letra chica"
          description="Lo que significa cada punto de los planes, para que sepas exactamente qué recibes."
        />

        <Reveal className="mt-12">
          <h3 className="text-2xl font-bold tracking-tight text-ink-800">¿Cuál me conviene?</h3>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className={`rounded-2xl border bg-white p-5 shadow-card ${plan.featured ? 'border-brand-300 ring-1 ring-brand-200' : 'border-line'}`}
              >
                <p className="text-sm font-semibold text-brand-700">
                  Elige {plan.name} <span className="font-medium text-slate-500">· S/{plan.price} al mes</span>
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-700">{plan.chooseIf}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card max-md:border-0 max-md:bg-transparent max-md:shadow-none">
            <table className="w-full text-left text-[0.92rem] max-md:block">
              <caption className="sr-only">Comparación detallada de los planes Inicio, Negocio y Pro</caption>
              <thead className="max-md:sr-only">
                <tr className="border-b border-line bg-mist/70">
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-slate-500">
                    Qué
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className={`px-5 py-4 text-base font-bold text-ink-800 ${plan.featured ? 'bg-brand-50' : ''}`}
                    >
                      {plan.name}
                      <span className="ml-1.5 text-sm font-medium text-slate-500">S/{plan.price}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-md:block max-md:space-y-3">
                {planComparison.map((row) => (
                  <tr
                    key={row.label}
                    className="align-top md:border-b md:border-line md:last:border-b-0 max-md:block max-md:rounded-2xl max-md:border max-md:border-line max-md:bg-white max-md:p-4 max-md:shadow-card"
                  >
                    <th scope="row" className="px-6 py-4 font-semibold text-ink-800 max-md:block max-md:px-0 max-md:pt-0 max-md:pb-3 md:w-[26%]">
                      {row.label}
                      <span className="mt-1 block text-[0.8rem] leading-snug font-normal text-slate-500">{row.hint}</span>
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        data-label={plan.name}
                        className={`px-5 py-4 leading-snug text-slate-700 md:w-[24.6%] ${plan.featured ? 'md:bg-brand-50/60' : ''} max-md:grid max-md:grid-cols-[5rem_1fr] max-md:gap-3 max-md:border-t max-md:border-line max-md:px-0 max-md:py-2.5 max-md:before:font-semibold max-md:before:text-ink-800 max-md:before:content-[attr(data-label)]`}
                      >
                        <span>
                          <Value value={row[plan.id]} />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h3 className="text-2xl font-bold tracking-tight text-ink-800">¿Qué es un «cambio menor»?</h3>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">{minorChanges.definition}</p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <ListBlock title="Incluido en tu mensualidad" items={minorChanges.included} Icon={Check} tone="included" />
            <ListBlock title="Se cotiza aparte" items={minorChanges.extra} Icon={X} tone="extra" />
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-500">{minorChanges.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
