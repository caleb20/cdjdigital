import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import Barberia from './templates/Barberia.jsx'
import Belleza from './templates/Belleza.jsx'
import Cafeteria from './templates/Cafeteria.jsx'
import Gimnasio from './templates/Gimnasio.jsx'
import Hogar from './templates/Hogar.jsx'
import Pizzeria from './templates/Pizzeria.jsx'

const templates = {
  cafeteria: Cafeteria,
  barberia: Barberia,
  pizzeria: Pizzeria,
  gimnasio: Gimnasio,
  belleza: Belleza,
  hogar: Hogar,
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/**
 * La web de ejemplo se dibuja a tamaño real (1280 o 390 px) y se reduce con `zoom` al ancho del marco,
 * así se ve como una captura de una web de verdad y el scroll funciona sin cálculos extra.
 */
function ScaledViewport({ designWidth, scrollable, viewportRef, children }) {
  const outerRef = useRef(null)
  const [zoom, setZoom] = useState(null)

  useLayoutEffect(() => {
    const el = outerRef.current
    const update = () => setZoom(el.clientWidth / designWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [designWidth])

  return (
    <div
      ref={(node) => {
        outerRef.current = node
        viewportRef.current = node
      }}
      tabIndex={-1}
      className={`absolute inset-0 ${scrollable ? 'overflow-y-auto [scrollbar-width:thin]' : 'overflow-hidden'}`}
    >
      <div inert style={{ width: designWidth, zoom: zoom ?? 1, visibility: zoom ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </div>
  )
}

/**
 * Al cambiar de rubro (una acción del visitante), la página de ejemplo baja sola un tramo y vuelve arriba,
 * para mostrar que es una web completa. Se cancela si el visitante toca o usa la rueda; no corre con
 * movimiento reducido ni la primera vez que se pinta.
 */
function useTour(ref, trigger, enabled) {
  const firstRun = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (!el || !enabled) return
    el.scrollTop = 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame
    const stop = () => cancelAnimationFrame(frame)
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
    const DOWN = 1600
    const HOLD = 600
    const UP = 900
    let start

    const step = (now) => {
      start ??= now
      const t = now - start
      const target = Math.min(el.scrollHeight - el.clientHeight, el.clientHeight * 1.6)
      if (t < DOWN) el.scrollTop = target * ease(t / DOWN)
      else if (t < DOWN + HOLD) el.scrollTop = target
      else if (t < DOWN + HOLD + UP) el.scrollTop = target * (1 - ease((t - DOWN - HOLD) / UP))
      else {
        el.scrollTop = 0
        return
      }
      frame = requestAnimationFrame(step)
    }
    // Un instante para que la plantilla nueva tenga su alto antes de recorrerla.
    const delay = setTimeout(() => (frame = requestAnimationFrame(step)), 250)

    el.addEventListener('wheel', stop, { passive: true })
    el.addEventListener('pointerdown', stop)
    el.addEventListener('touchstart', stop, { passive: true })
    return () => {
      clearTimeout(delay)
      stop()
      el.removeEventListener('wheel', stop)
      el.removeEventListener('pointerdown', stop)
      el.removeEventListener('touchstart', stop)
    }
  }, [ref, trigger, enabled])
}

function BrowserBar({ domain }) {
  return (
    <div className="flex items-center gap-3 border-b border-linea bg-[#f3f5fa] px-3 py-2">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-linea" />
        <span className="size-2.5 rounded-full bg-linea" />
        <span className="size-2.5 rounded-full bg-linea" />
      </span>
      <span className="mx-auto flex min-w-0 max-w-[60%] flex-1 items-center justify-center gap-1.5 rounded-md bg-papel px-3 py-1 text-xs text-pizarra ring-1 ring-linea">
        <Lock className="size-3 shrink-0" aria-hidden="true" />
        <span className="truncate">{domain}</span>
      </span>
      <span className="w-10" aria-hidden="true" />
    </div>
  )
}

function Phone({ children, className = '' }) {
  return (
    <div className={`rounded-[2.4rem] bg-tinta p-[0.45rem] shadow-[0_40px_60px_-40px_rgb(15_23_42/0.6)] ${className}`}>
      <div className="relative aspect-[9/18] overflow-hidden rounded-[2rem] bg-white">
        {/* Barra de estado: la isla no tapa la cabecera de la web */}
        <span className="absolute inset-x-0 top-0 h-6 bg-tinta" aria-hidden="true">
          <span className="absolute top-1.5 left-1/2 h-3 w-[30%] -translate-x-1/2 rounded-full bg-black" />
        </span>
        <div className="absolute inset-x-0 top-6 bottom-0">{children}</div>
      </div>
    </div>
  )
}

/**
 * La web de ejemplo del visitante: en escritorio, una ventana de navegador (se puede recorrer con la rueda)
 * y un celular encima; en celular y tablet, solo el celular. Cada rubro tiene su propia plantilla.
 */
export default function Showcase({ rubro, name, domain }) {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const browserRef = useRef(null)
  const phoneRef = useRef(null)
  useTour(browserRef, rubro.id, desktop)
  useTour(phoneRef, rubro.id, true)

  const Template = templates[rubro.id]
  const label = `Vista previa de la web de ${name}, ${rubro.label.toLowerCase()}, en computadora y celular`

  return (
    <figure role="img" aria-label={label} className={desktop ? 'relative pr-8 pb-10' : 'relative'}>
      {desktop && (
        <div aria-hidden="true" className="overflow-hidden rounded-xl bg-papel shadow-[0_40px_80px_-50px_rgb(15_23_42/0.6)] ring-1 ring-linea">
          <BrowserBar domain={domain} />
          <div className="relative aspect-[16/10.5]">
            <ScaledViewport designWidth={1280} scrollable viewportRef={browserRef}>
              <div key={rubro.id} className="preview-in">
                <Template name={name} mobile={false} />
              </div>
            </ScaledViewport>
          </div>
        </div>
      )}

      <div aria-hidden="true" className={desktop ? 'absolute right-0 bottom-0 w-[27%]' : 'mx-auto w-[11.5rem] sm:w-[13rem]'}>
        <Phone>
          <ScaledViewport designWidth={390} viewportRef={phoneRef}>
            <div key={rubro.id} className="preview-in">
              <Template name={name} mobile />
            </div>
          </ScaledViewport>
        </Phone>
      </div>
    </figure>
  )
}
