/**
 * Capturas de las demos de Kopa por plan, optimizadas por `npm run assets`
 * (a partir de reference/planes/*.png). Todas son 16:10, en 480 / 768 / 1152 px de ancho.
 */
const files = import.meta.glob('../assets/planes/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const WIDTHS = [480, 768, 1152]
export const PLAN_SHOT_RATIO = { width: 768, height: 480 }

export function planShot(planId) {
  return {
    src: files[`../assets/planes/${planId}-768.webp`],
    srcSet: WIDTHS.map((w) => `${files[`../assets/planes/${planId}-${w}.webp`]} ${w}w`).join(', '),
  }
}
