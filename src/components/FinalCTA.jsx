import { whatsappDisplay } from '../config/site.js'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'

/** Cierre: si el visitante escribió su negocio en el hero, la pregunta lo nombra. */
export default function FinalCTA({ details }) {
  const { typedName, whatsappUrl } = details

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-tinta py-20 text-white sm:py-24 lg:py-28">
      <div className="container-x">
        <h2 id="contacto-title" className="display max-w-[16ch] text-[2.75rem] [overflow-wrap:anywhere] sm:text-6xl lg:text-[4.5rem]">
          ¿Hablamos de {typedName || 'tu negocio'}?
        </h2>
        <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-ceniza">
          Cuéntanos qué haces y te mostramos cómo se vería tu web. Sin compromiso.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-7 text-[1.05rem]">
            <WhatsAppIcon className="h-5 w-5" />
            Escribir por WhatsApp
          </a>
          <p className="text-ceniza">
            o al{' '}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold whitespace-nowrap text-white underline decoration-white/30 decoration-2 underline-offset-4 hover:decoration-white"
            >
              {whatsappDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
