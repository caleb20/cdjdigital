import { useId } from 'react'

/**
 * Logotipo CDJ DIGITAL (según el modelo `landing.png`):
 *  · «C» abierta cuyo trazo baja y gira en diagonal hacia la «D» (efecto de lazo entrelazado),
 *  · «D» abierta por la izquierda, «J» con barra superior,
 *  · «DIGITAL» en mayúsculas muy espaciadas, centrado debajo.
 * `tone="light"` = trazo blanco/plata (fondos oscuros) · `tone="dark"` = trazo azul marino (fondos claros).
 * Es un SVG: se ve nítido a cualquier tamaño. Se dimensiona con `className` (por defecto, alto de 2.5rem).
 */
export default function Logo({ tone = 'light', className = '' }) {
  const gradientId = useId()
  const [from, to] = tone === 'light' ? ['#ffffff', '#c7cde6'] : ['#0f1a46', '#2a3585']

  return (
    <svg
      viewBox="45 76 855 462"
      role="img"
      aria-label="CDJ Digital"
      className={`h-10 w-auto shrink-0 ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradientId})`} strokeWidth="62" strokeLinejoin="round">
        {/* C: arco abierto que termina en una diagonal hacia la D */}
        <path d="M326 162 A132 132 0 1 0 270 371 L428 238" strokeLinecap="round" />
        {/* D: abierta por la izquierda */}
        <path d="M396 118 H505 A130 130 0 0 1 505 378 H390" strokeLinecap="butt" />
        {/* J: barra superior, tallo y gancho */}
        <path d="M766 118 H858 V288 A92 92 0 0 1 766 380 H728" strokeLinecap="butt" />
      </g>
      <text
        x="135"
        y="527"
        fill={`url(#${gradientId})`}
        fontFamily="inherit"
        fontWeight="600"
        fontSize="92"
        textLength="662"
        lengthAdjust="spacing"
      >
        DIGITAL
      </text>
    </svg>
  )
}
