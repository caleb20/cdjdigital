import { useState } from 'react'
import { Plus } from 'lucide-react'
import { whatsappMessages } from '../config/site.js'
import { faqs } from '../data/faq.js'
import { getWhatsAppUrl } from '../lib/whatsapp.js'
import SectionHeading from './ui/SectionHeading.jsx'

/** Accordion accesible: botón con aria-expanded/aria-controls y panel con role="region". */
function FAQItem({ item, index, open, onToggle }) {
  const buttonId = `faq-button-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-linea">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left text-[1.05rem] font-semibold sm:text-lg"
        >
          {item.question}
          <Plus
            className={`h-5 w-5 shrink-0 transition-transform duration-(--dur-standard) ${open ? 'rotate-45' : ''}`}
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} data-open={open} className="accordion-panel">
        <div>
          <p className="max-w-[62ch] pb-5 leading-relaxed text-pizarra">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y border-t border-linea">
      <div className="container-x grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" title="Otras preguntas" description="Si tienes otra, escríbenos por WhatsApp.">
            <a
              href={getWhatsAppUrl(whatsappMessages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-4 inline-flex min-h-11 items-center"
            >
              Escribir por WhatsApp
            </a>
          </SectionHeading>
        </div>

        <div className="border-t border-linea">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
