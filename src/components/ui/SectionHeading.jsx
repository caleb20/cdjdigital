/**
 * Encabezado de sección: el título es la pregunta que se hace el dueño del negocio
 * («¿Cuánto cuesta?») y la descripción la responde en una línea. `tone` según el fondo.
 */
export default function SectionHeading({ id, title, description, tone = 'light', className = '', children }) {
  const dark = tone === 'dark'

  return (
    <div className={`max-w-[40rem] ${className}`}>
      <h2 id={id} className={`display text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] ${dark ? 'text-white' : ''}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[1.05rem] leading-relaxed sm:text-lg ${dark ? 'text-ceniza' : 'text-pizarra'}`}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
