import Reveal from './Reveal.jsx'

/** Encabezado de sección: etiqueta + título + descripción. `tone` según el fondo de la sección. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  className = '',
}) {
  const dark = tone === 'dark'
  const center = align === 'center'

  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.16em] uppercase ${
            dark ? 'text-brand-300' : 'text-brand-600'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-[1.875rem] leading-[1.12] font-bold tracking-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? 'text-white' : 'text-ink-800'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
