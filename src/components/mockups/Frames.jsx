import { Lock } from 'lucide-react'

/**
 * Marcos de dispositivos hechos con CSS. Todo se mide en `cqw` (ancho del contenedor),
 * así los mockups escalan perfecto desde 320px hasta 1920px sin JavaScript.
 */

export function LaptopFrame({ children, className = '' }) {
  return (
    <div className={`cq relative w-full ${className}`}>
      <div className="mx-auto w-[88%] rounded-[2.2cqw_2.2cqw_0.6cqw_0.6cqw] bg-[#0a0d15] p-[1cqw_1cqw_1.3cqw] shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_30px_80px_-20px_rgba(76,92,255,0.45)]">
        <span
          aria-hidden="true"
          className="absolute top-[0.45cqw] left-1/2 h-[0.5cqw] w-[0.5cqw] -translate-x-1/2 rounded-full bg-[#222a3d]"
        />
        <div className="overflow-hidden rounded-[0.7cqw] bg-black">{children}</div>
      </div>
      <div
        aria-hidden="true"
        className="relative h-[1.7cqw] w-full rounded-b-[2cqw] rounded-t-[0.3cqw] bg-gradient-to-b from-[#dfe3ea] via-[#b3b9c6] to-[#7d8494] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)]"
      >
        <span className="absolute top-0 left-1/2 h-[0.65cqw] w-[13cqw] -translate-x-1/2 rounded-b-[1cqw] bg-[#8b92a2]" />
      </div>
    </div>
  )
}

export function PhoneFrame({ children, className = '' }) {
  return (
    <div className={`cq w-full ${className}`}>
      <div className="relative rounded-[14cqw] bg-[#0a0d15] p-[3.4cqw] shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_24px_50px_-16px_rgba(0,0,0,0.7)]">
        <span
          aria-hidden="true"
          className="absolute top-[5.8cqw] left-1/2 z-10 h-[4.6cqw] w-[27cqw] -translate-x-1/2 rounded-full bg-black"
        />
        <span
          aria-hidden="true"
          className="absolute top-[26cqw] -right-[0.9cqw] h-[15cqw] w-[1cqw] rounded-r bg-[#222a3d]"
        />
        <div className="overflow-hidden rounded-[11cqw] bg-black">{children}</div>
      </div>
    </div>
  )
}

/** Marco de navegador con barra de direcciones. */
export function BrowserFrame({ url, children, size = 'md', className = '' }) {
  const small = size === 'sm'
  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#0e1527] ring-1 ring-white/12 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className={`flex items-center gap-2 border-b border-white/10 bg-[#141c33] ${small ? 'px-2.5 py-1.5' : 'px-3.5 py-2.5'}`}>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className={`rounded-full bg-[#ff5f57] ${small ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5'}`} />
          <span className={`rounded-full bg-[#febc2e] ${small ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5'}`} />
          <span className={`rounded-full bg-[#28c840] ${small ? 'h-1.5 w-1.5' : 'h-2.5 w-2.5'}`} />
        </span>
        <span
          className={`mx-auto flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-white/[0.06] text-slate-400 ${
            small ? 'max-w-[70%] px-2 py-0.5 text-[0.55rem]' : 'max-w-[60%] px-3 py-1 text-xs'
          }`}
        >
          <Lock className={small ? 'h-2 w-2 shrink-0' : 'h-3 w-3 shrink-0'} aria-hidden="true" />
          <span className="truncate">{url}</span>
        </span>
        <span className={small ? 'w-6' : 'w-10'} aria-hidden="true" />
      </div>
      {children}
    </div>
  )
}
