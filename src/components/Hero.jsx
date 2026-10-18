import { rubros } from '../data/rubros.js'
import Showcase from './preview/Showcase.jsx'
import { WhatsAppIcon } from './ui/BrandIcons.jsx'

/**
 * Hero: el visitante escribe el nombre de su negocio, elige el rubro y ve una web completa de ejemplo
 * con su nombre (navegador y celular en escritorio). Lo que escribe viaja al mensaje de WhatsApp.
 * En celular la vista previa va ARRIBA del campo, para que el teclado no la tape mientras escribe.
 */
export default function Hero({ business, details, onChange }) {
  const { rubro, displayName, domain, message, whatsappUrl } = details

  return (
    <section id="inicio" aria-labelledby="hero-title" className="pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      <div className="container-x grid grid-cols-1 gap-x-14 gap-y-6 sm:gap-y-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <h1 id="hero-title" className="display text-[2.75rem] sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
            Así se vería tu negocio en internet.
          </h1>
          <p className="mt-5 hidden max-w-[34rem] text-lg leading-relaxed text-muro lg:block">
            Escribe el nombre de tu negocio y elige el rubro. Si te gusta, nos escribes por WhatsApp y
            la hacemos de verdad.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <Showcase rubro={rubro} name={displayName} domain={domain} />
          <p className="mt-4 hidden text-sm text-muro lg:block">
            Es una web de ejemplo: desliza dentro de la ventana para recorrerla.
          </p>
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <label htmlFor="negocio" className="text-sm font-semibold">
            Nombre de tu negocio
          </label>
          <input
            id="negocio"
            type="text"
            value={business.name}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder={rubro.sampleName}
            maxLength={40}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="done"
            className="mt-2 block h-13 w-full max-w-[28rem] rounded-xl border border-linea bg-papel px-4 text-[1.05rem] text-asfalto transition-colors placeholder:text-muro/70 hover:border-asfalto/40 focus:border-asfalto"
          />

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">Rubro</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {rubros.map((item) => (
                <label key={item.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rubro"
                    value={item.id}
                    checked={business.rubroId === item.id}
                    onChange={() => onChange({ rubroId: item.id, rubroChosen: true })}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-10 items-center rounded-full border border-linea bg-papel px-4 text-[0.95rem] transition-colors duration-(--dur-quick) peer-checked:border-asfalto peer-checked:bg-asfalto peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-asfalto hover:border-asfalto/40">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-7 w-full px-7 text-[1.05rem] sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedir esta web por WhatsApp
          </a>
          <p className="mt-4 text-[0.95rem] text-muro">Desde S/99 al mes, sin pago de instalación.</p>
          <p className="mt-1 max-w-[28rem] text-sm text-muro">
            Te abre WhatsApp con este mensaje: «{message}»
          </p>
        </div>
      </div>
    </section>
  )
}
