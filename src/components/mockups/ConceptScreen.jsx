import { Dumbbell, Pizza, Scissors, Sparkles, Wrench } from 'lucide-react'

const ICONS = { Scissors, Pizza, Dumbbell, Sparkles, Wrench }

/**
 * Pantalla de un CONCEPTO de demo (negocio ficticio) hecha solo con HTML/CSS.
 * Sirve para mostrar variedad de rubros sin usar imágenes ni marcas reales.
 */
export default function ConceptScreen({ demo }) {
  const { colors, tags, headline, cta, name } = demo
  const Icon = ICONS[demo.icon] ?? Sparkles

  return (
    <div
      className="cq relative aspect-[16/10] w-full overflow-hidden text-left"
      style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg2} 100%)`,
        color: colors.text,
      }}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1}
        className="absolute -right-[5cqw] -bottom-[8cqw] h-[62cqw] w-[62cqw] opacity-[0.12]"
        style={{ color: colors.accent }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[6cqw] py-[4.4cqw]">
        <span className="flex items-center gap-[1.6cqw] text-[4.2cqw] font-bold">
          <Icon className="h-[5cqw] w-[5cqw]" style={{ color: colors.accent }} aria-hidden="true" />
          {name}
        </span>
        <span className="flex gap-[3cqw] text-[2.8cqw] opacity-75">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </div>

      <div className="absolute top-[17cqw] left-[6cqw] max-w-[68cqw]">
        <p className="text-[8.6cqw] leading-[1.05] font-extrabold tracking-tight">{headline}</p>
        <span
          className="mt-[3.6cqw] inline-flex rounded-full px-[4.2cqw] py-[1.9cqw] text-[3.2cqw] font-semibold"
          style={{ background: colors.accent, color: colors.onAccent }}
        >
          {cta}
        </span>
      </div>

      <div className="absolute inset-x-[6cqw] bottom-[4.5cqw] grid grid-cols-3 gap-[2.4cqw]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-[6cqw] rounded-[1.4cqw]"
            style={{ background: `${colors.text}14`, boxShadow: `inset 0 0 0 1px ${colors.text}1f` }}
          />
        ))}
      </div>
    </div>
  )
}
