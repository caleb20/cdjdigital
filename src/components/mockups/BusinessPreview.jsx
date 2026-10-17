import { Coffee, Dumbbell, Menu, Pizza, Scissors, Sparkles, Wrench } from 'lucide-react'

const ICONS = { Coffee, Scissors, Pizza, Dumbbell, Sparkles, Wrench }

/**
 * Celular con la web de ejemplo del visitante: su nombre y los colores del rubro elegido.
 * Hecho con HTML/CSS y medido en `cqw`, así escala con el ancho que le dé el hero.
 * Al cambiar de rubro el contenido se vuelve a montar (`key`) y entra con `.preview-in`;
 * al escribir el nombre solo cambia el texto, sin animación.
 */
export default function BusinessPreview({ rubro, name }) {
  const { colors } = rubro
  const Icon = ICONS[rubro.icon] ?? Sparkles

  return (
    <div className="cq w-full" role="img" aria-label={`Vista previa de la web de ${name}, ${rubro.label.toLowerCase()}`}>
      <div className="rounded-[14cqw] bg-asfalto p-[3.5cqw] shadow-[0_40px_60px_-40px_rgb(29_34_38/0.6)]">
        <div
          className="relative aspect-[9/17] overflow-hidden rounded-[11cqw] transition-colors duration-(--dur-standard)"
          style={{ background: colors.bg, color: colors.text }}
        >
          <span className="absolute top-[3.5cqw] left-1/2 z-10 h-[5cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-asfalto" />

          <div key={rubro.id} className="preview-in flex h-full flex-col">
            <div className="flex items-center justify-between gap-[3cqw] px-[7cqw] pt-[13cqw] pb-[3cqw] text-[4.8cqw] font-bold">
              <span className="flex min-w-0 items-center gap-[2cqw]">
                <Icon className="size-[5.5cqw] shrink-0" style={{ color: colors.accent }} />
                <span className="truncate">{name}</span>
              </span>
              <Menu className="size-[6cqw] shrink-0" />
            </div>

            <div className="relative flex-1 overflow-hidden px-[7cqw] pt-[9cqw]">
              <Icon
                strokeWidth={1}
                className="absolute -right-[16cqw] bottom-[2cqw] size-[62cqw] opacity-[0.13]"
                style={{ color: colors.accent }}
              />
              <p className="relative text-[4.6cqw]" style={{ color: colors.muted }}>
                {rubro.kicker}
              </p>
              <p className="display relative mt-[2.5cqw] text-[13.5cqw] [overflow-wrap:anywhere]">{name}</p>
              <p className="relative mt-[3.5cqw] text-[5.2cqw] leading-snug" style={{ color: colors.muted }}>
                {rubro.headline}
              </p>
              <span
                className="relative mt-[6cqw] inline-flex rounded-full px-[5.5cqw] py-[2.6cqw] text-[4.8cqw] font-bold"
                style={{ background: colors.accent, color: colors.onAccent }}
              >
                {rubro.cta}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-[3cqw] px-[7cqw] pt-[4cqw] pb-[9cqw]">
              {rubro.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex aspect-[4/5] items-end rounded-[4cqw] p-[3cqw] text-[4cqw] leading-tight font-semibold"
                  style={{ background: colors.bg2 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
