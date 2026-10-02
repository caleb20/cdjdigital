import { ArrowRight, Clock, MapPin, Menu } from 'lucide-react'
import { KOPA_PHOTO_RATIO, kopaMarkWhite, kopaPhoto } from '../../lib/kopaImages.js'

/**
 * Pantallas de Kopa Caffe (https://kopa-caffe.vercel.app/) recreadas en HTML/CSS con las
 * fotos reales de reference/. Son decorativas: el contenedor que las usa aporta el aria-label.
 */

export function KopaPhoto({ name, alt, sizes, priority = false, className = '' }) {
  const { src, srcSet } = kopaPhoto(name)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={KOPA_PHOTO_RATIO.width}
      height={KOPA_PHOTO_RATIO.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable="false"
      className={className}
    />
  )
}

function KopaLogoMark({ className }) {
  return (
    <img
      src={kopaMarkWhite}
      alt=""
      width="160"
      height="157"
      decoding="async"
      className={className}
    />
  )
}

/** Versión escritorio (16:10). */
export function KopaDesktopScreen({ photo = 'kopa-fachada-noche', priority = false }) {
  return (
    <div className="cq relative aspect-[16/10] w-full overflow-hidden bg-[#0d0a08] text-left">
      <KopaPhoto
        name={photo}
        alt="Fachada de Kopa Caffe"
        sizes="(min-width: 1024px) 560px, 90vw"
        priority={priority}
        className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,7,5,0.92)_0%,rgba(10,7,5,0.62)_46%,rgba(10,7,5,0.1)_100%),linear-gradient(0deg,rgba(10,7,5,0.7)_0%,transparent_40%)]"
      />

      {/* Barra de navegación */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[4cqw] py-[2cqw]">
        <div className="flex items-center gap-[1cqw]">
          <KopaLogoMark className="h-[3.6cqw] w-auto" />
          <span className="text-[1.8cqw] font-bold tracking-[0.1em] text-white">KOPA CAFFE</span>
        </div>
        <div className="flex gap-[3cqw] text-[1.3cqw] text-white/80">
          <span>Inicio</span>
          <span>Carta</span>
          <span>Nosotros</span>
          <span>Locales</span>
          <span>Contacto</span>
        </div>
        <span className="rounded-full bg-[#d6a965] px-[2cqw] py-[0.85cqw] text-[1.25cqw] font-semibold text-[#20150a]">
          Pedir ahora
        </span>
      </div>

      {/* Hero */}
      <div className="absolute top-[16cqw] left-[4.5cqw] max-w-[46cqw]">
        <p className="font-serif text-[6.2cqw] leading-[1.06] text-[#f7eddf]">
          Café, comida y buenos momentos.
        </p>
        <p className="mt-[1.8cqw] max-w-[36cqw] text-[1.5cqw] leading-[1.5] text-white/75">
          Desde un buen café hasta unas alitas para compartir. Aquí siempre hay algo para disfrutar.
        </p>
        <div className="mt-[2.6cqw] flex gap-[1.4cqw] text-[1.35cqw] font-semibold">
          <span className="inline-flex items-center gap-[0.8cqw] rounded-full bg-[#d6a965] px-[2.2cqw] py-[1cqw] text-[#20150a]">
            Ver nuestra carta
            <ArrowRight className="h-[1.5cqw] w-[1.5cqw]" aria-hidden="true" />
          </span>
          <span className="inline-flex items-center rounded-full border border-white/40 px-[2.2cqw] py-[1cqw] text-white">
            Pedir ahora
          </span>
        </div>
      </div>

      <div className="absolute bottom-[2.4cqw] left-[4.5cqw] flex gap-[3cqw] text-[1.2cqw] text-white/75">
        <span className="inline-flex items-center gap-[0.6cqw]">
          <MapPin className="h-[1.5cqw] w-[1.5cqw]" aria-hidden="true" />
          Lima, Perú
        </span>
        <span className="inline-flex items-center gap-[0.6cqw]">
          <Clock className="h-[1.5cqw] w-[1.5cqw]" aria-hidden="true" />
          Martes a domingo
        </span>
      </div>
    </div>
  )
}

/** Versión móvil (9:19.5). */
export function KopaMobileScreen({ photo = 'kopa-fachada-noche' }) {
  return (
    <div className="cq relative aspect-[9/19.5] w-full overflow-hidden bg-[#0d0a08] text-left">
      <KopaPhoto
        name={photo}
        alt="Fachada de Kopa Caffe en versión celular"
        sizes="180px"
        className="absolute inset-x-0 top-0 h-[78%] w-full object-cover object-[50%_20%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,7,5,0.55)_0%,rgba(10,7,5,0.35)_30%,#0d0a08_66%)]"
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[7cqw] pt-[11cqw]">
        <div className="flex items-center gap-[2cqw]">
          <KopaLogoMark className="h-[7cqw] w-auto" />
          <span className="text-[5.4cqw] font-bold tracking-[0.06em] text-white">KOPA CAFFE</span>
        </div>
        <Menu className="h-[6.5cqw] w-[6.5cqw] text-white/90" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-[7cqw] top-[56cqw]">
        <p className="font-serif text-[12.5cqw] leading-[1.06] text-[#f7eddf]">
          Café, comida y buenos momentos.
        </p>
        <p className="mt-[4cqw] text-[4.4cqw] leading-[1.45] text-white/75">
          Desde un buen café hasta unas alitas para compartir.
        </p>
        <span className="mt-[5cqw] inline-flex items-center gap-[1.5cqw] rounded-full bg-[#d6a965] px-[5.5cqw] py-[2.8cqw] text-[4.2cqw] font-semibold text-[#20150a]">
          Ver nuestra carta
          <ArrowRight className="h-[4cqw] w-[4cqw]" aria-hidden="true" />
        </span>
      </div>

      <div className="absolute inset-x-[7cqw] bottom-[7cqw]">
        <p className="mb-[2.5cqw] text-[3.8cqw] font-semibold tracking-wide text-white/80">
          Nuestro espacio
        </p>
        <div className="grid grid-cols-3 gap-[2.5cqw]">
          {['kopa-interior-01', 'kopa-interior-02', 'kopa-interior-03'].map((name) => (
            <KopaPhoto
              key={name}
              name={name}
              alt=""
              sizes="48px"
              className="aspect-[3/4] w-full rounded-[2cqw] object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
