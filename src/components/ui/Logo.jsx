import { useId } from 'react'

/**
 * Logotipo CDJ DIGITAL: "CDJ" monolínea (la J lleva el degradado de marca) y "DIGITAL" espaciado.
 * `tone="light"` = letras blancas (fondos oscuros) · `tone="dark"` = letras navy (fondos claros).
 */
export default function Logo({ tone = 'light', className = '' }) {
  const gradientId = useId()
  const letters = tone === 'light' ? 'text-white' : 'text-ink-800'
  const sub = tone === 'light' ? 'text-slate-400' : 'text-slate-500'

  return (
    <span className={`inline-flex flex-col items-start leading-none ${className}`}>
      <svg
        viewBox="-3 3 96 34"
        className={`h-7 w-auto ${letters}`}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6c7bff" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <g stroke="currentColor">
          <path d="M26.7 11 A14 14 0 1 0 26.7 29" />
          <path d="M40 6 H48 A14 14 0 0 1 48 34 H40 Z" />
        </g>
        <path d="M86 6 V24 A9 9 0 0 1 68 24" stroke={`url(#${gradientId})`} />
      </svg>
      <span className={`mt-1 pl-0.5 text-[0.5rem] font-semibold tracking-[0.5em] ${sub}`}>
        DIGITAL
      </span>
    </span>
  )
}
