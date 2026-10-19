import { useState } from 'react'
import { Check, ExternalLink } from 'lucide-react'
import { site } from '../config/site.js'
import { plans } from '../data/pricing.js'
import { PLAN_SHOT_RATIO, planShot } from '../lib/planImages.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import SectionHeading from './ui/SectionHeading.jsx'

function PlanCard({ plan, selected }) {
  const demoUrl = site.demos[plan.id]
  const shot = planShot(plan.id)

  return (
    <article
      id={`plan-${plan.id}`}
      aria-labelledby={`plan-${plan.id}-title`}
      className={`relative flex h-full flex-col rounded-2xl bg-papel p-3 ${
        plan.featured ? 'ring-2 ring-azul' : 'ring-1 ring-linea'
      } ${selected ? '' : 'max-md:hidden'}`}
    >
      <a
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-xl ring-1 ring-linea"
      >
        <img
          src={shot.src}
          srcSet={shot.srcSet}
          sizes="(min-width: 1200px) 372px, (min-width: 768px) 31vw, 92vw"
          width={PLAN_SHOT_RATIO.width}
          height={PLAN_SHOT_RATIO.height}
          alt={plan.demoShot}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-(--dur-slow) group-hover:scale-[1.03]"
        />
        <span className="sr-only">Abrir la demo del plan {plan.name} (se abre en una pestaña nueva)</span>
      </a>

      <div className="flex flex-1 flex-col px-3 pt-5 pb-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 id={`plan-${plan.id}-title`} className="text-[1.3rem] font-bold">
            {plan.name}
          </h3>
          {plan.badge && (
            <span className="rounded-full bg-azul px-3 py-1 text-sm font-semibold text-white">{plan.badge}</span>
          )}
        </div>

        <p className="mt-2 flex items-baseline gap-2">
          <span className="display text-[3.25rem] tabular-nums">S/{plan.price}</span>
          <span className="text-pizarra">al mes</span>
        </p>

        <p className="mt-4 font-semibold">{plan.promise}</p>
        <p className="mt-1 text-[0.95rem] leading-relaxed text-pizarra">{plan.chooseIf}</p>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-linea pt-5 text-[0.95rem]">
          {plan.highlights.map((item) => (
            <li key={item} className="flex gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-azul" strokeWidth={2.6} aria-hidden="true" />
              {item}
            </li>
          ))}
          <li className="pl-[1.6rem] text-pizarra">{plan.domainNote}</li>
        </ul>

        <a
          href={getWhatsAppUrl(plan.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn mt-7 w-full ${plan.featured ? 'btn-primary' : 'btn-outline'}`}
        >
          Pedir el plan {plan.name}
        </a>
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex min-h-11 items-center justify-center gap-1.5 text-[0.95rem] font-semibold underline decoration-azul/40 decoration-2 underline-offset-4 hover:decoration-azul"
        >
          Ver la demo
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">del plan {plan.name} (se abre en una pestaña nueva)</span>
        </a>
      </div>
    </article>
  )
}

/**
 * ¿Cuánto cuesta? Los tres planes con la misma cafetería real (Kopa Caffe) hecha en cada uno.
 * En celular se ve una tarjeta a la vez, elegida con el selector; desde tablet, las tres.
 */
export default function Pricing() {
  const [selectedId, setSelectedId] = useState(plans.find((plan) => plan.featured)?.id ?? plans[0].id)

  return (
    <section id="planes" aria-labelledby="planes-title" className="section-y border-t border-linea">
      <div className="container-x">
        <SectionHeading
          id="planes-title"
          title="¿Cuánto cuesta?"
          description="Kopa Caffe, una cafetería de Pachacamac, hecha en los tres planes. Entra a cada demo y compara."
        />

        <div role="group" aria-label="Ver plan" className="mt-8 grid grid-cols-3 rounded-full bg-papel p-1 ring-1 ring-linea md:hidden">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              aria-pressed={selectedId === plan.id}
              aria-controls={`plan-${plan.id}`}
              onClick={() => setSelectedId(plan.id)}
              className="min-h-11 rounded-full text-[0.95rem] font-semibold transition-colors duration-(--dur-quick) aria-pressed:bg-azul aria-pressed:text-white"
            >
              {plan.name}
              <span className="block text-xs font-normal opacity-80">S/{plan.price}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} selected={selectedId === plan.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
