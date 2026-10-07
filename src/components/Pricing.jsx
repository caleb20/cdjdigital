import { ArrowRight, Check, Crown, ExternalLink, Plus, Send, Star, Zap } from 'lucide-react'
import { site, whatsappMessages } from '../config/site.js'
import { plans } from '../data/pricing.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

const planIcons = { inicio: Send, negocio: Crown, pro: Zap }

function PlanCard({ plan }) {
  const Icon = planIcons[plan.id]
  const { featured } = plan
  const demoUrl = site.demos[plan.id]

  const card = (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={`relative flex h-full flex-col p-7 sm:p-8 ${
        featured
          ? 'rounded-[1.4rem] bg-white lg:py-10'
          : 'rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover'
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            featured ? 'bg-gradient-to-br from-brand-500 to-violet-brand text-white' : 'bg-brand-50 text-brand-600 ring-1 ring-brand-100'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 id={`plan-${plan.id}`} className="text-2xl font-bold text-ink-800">
          {plan.name}
        </h3>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">{plan.description}</p>

      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-5xl font-extrabold tracking-tight text-ink-800">S/{plan.price}</span>
        <span className="text-base font-medium text-slate-500">/ mes</span>
      </p>

      <ul className="mt-7 flex-1 space-y-2.5 border-t border-line pt-6 text-[0.92rem] text-slate-700">
        {plan.features.map((feature, index) => {
          const addon = feature.includes('se paga aparte')
          const Mark = addon ? Plus : Check
          return (
            <li key={feature} className="flex gap-2.5">
              <Mark
                className={`mt-0.5 h-4 w-4 shrink-0 ${addon ? 'text-slate-400' : 'text-brand-600'}`}
                strokeWidth={2.6}
                aria-hidden="true"
              />
              <span className={index === 0 && feature.startsWith('Todo lo del') ? 'font-semibold text-ink-800' : addon ? 'text-slate-500' : ''}>
                {feature}
              </span>
            </li>
          )
        })}
      </ul>

      <a
        href={getWhatsAppUrl(plan.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Quiero este plan: ${plan.name}, S/${plan.price} al mes`}
        className={`btn mt-9 w-full ${featured ? 'btn-primary' : 'btn-outline-light'}`}
      >
        Quiero este plan
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
        >
          Ver la demo del plan {plan.name}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      )}
    </article>
  )

  if (!featured) return card

  // Plan destacado: borde en degradado + glow
  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-brand-500 to-violet-brand p-[2px] shadow-glow lg:-my-5">
      <span className="absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-500 to-violet-brand px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.12em] whitespace-nowrap text-white shadow-lg">
        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
        {plan.badge}
      </span>
      {card}
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="planes" aria-labelledby="planes-title" className="relative section-y bg-white">
      <div className="container-x">
        <SectionHeading
          id="planes-title"
          align="center"
          eyebrow="Planes"
          title="Planes simples y sin complicaciones"
          description="Elige el plan que mejor se adapte a tu negocio."
        />

        <div className="mx-auto mt-14 grid grid-cols-1 max-w-xl gap-6 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 100} className="h-full">
              <PlanCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-xl font-semibold text-ink-800">¿Necesitas una funcionalidad especial?</p>
          <p className="mt-1.5 text-slate-600">Podemos desarrollar soluciones a medida.</p>
          <a
            href={getWhatsAppUrl(whatsappMessages.project)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light mt-6"
          >
            Consultar proyecto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
            Cada plan incluye una cantidad de cambios de contenido al mes. Nuevas funcionalidades o
            sistemas personalizados se cotizan por separado.{' '}
            <a href="#detalle" className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-600">
              Ver qué incluye cada plan
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
