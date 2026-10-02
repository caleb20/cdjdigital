import { useState } from 'react'
import { Plus } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { faqs } from '../data/faq.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import Reveal from './ui/Reveal.jsx'
import SectionHeading from './ui/SectionHeading.jsx'

/** Accordion accesible: botón con aria-expanded/aria-controls y panel con role="region". */
function FAQItem({ item, index, open, onToggle }) {
  const buttonId = `faq-button-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div
      className={`rounded-2xl border bg-white transition-colors duration-300 ${
        open ? 'border-brand-300 shadow-card-hover' : 'border-line shadow-card hover:border-brand-200'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-semibold text-ink-800 sm:px-6 sm:py-5"
        >
          {item.question}
          <span
            aria-hidden="true"
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
              open ? 'rotate-45 bg-brand-500 text-white' : 'bg-brand-50 text-brand-600'
            }`}
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} data-open={open} className="accordion-panel">
        <div>
          <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-slate-600 sm:px-6 sm:pb-6">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-white">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
            description="Si tienes otra pregunta, escríbenos por WhatsApp."
          />
          <Reveal delay={100}>
            <a
              href={getWhatsAppUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Escribir por WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>

        <Reveal className="space-y-3">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
