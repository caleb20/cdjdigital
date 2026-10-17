import SectionHeading from './ui/SectionHeading.jsx'

/** Es una secuencia de verdad: por eso, y solo aquí, los pasos van numerados. */
const steps = [
  { title: 'Nos cuentas de tu negocio', text: 'Por WhatsApp: qué haces, qué vendes y qué necesitas.' },
  { title: 'Diseñamos tu web', text: 'La armamos con tu marca, tus fotos y tus datos.' },
  { title: 'Revisamos juntos', text: 'Ajustamos textos y detalles hasta que te guste.' },
  { title: 'Publicamos', text: 'Tu web queda en línea, lista para recibir clientes.' },
]

export default function Process() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section-y border-t border-linea">
      <div className="container-x">
        <SectionHeading id="proceso-title" title="¿Cómo trabajamos?" />

        <ol className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative border-l-2 border-asfalto pb-8 pl-5 last:pb-0 sm:pb-10 lg:border-t-2 lg:border-l-0 lg:pt-5 lg:pb-0 lg:pl-0"
            >
              <span className="display block text-[3rem] tabular-nums lg:text-[3.5rem]">{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 max-w-[30ch] leading-relaxed text-muro">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
