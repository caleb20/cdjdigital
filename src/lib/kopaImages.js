/**
 * Fotos de Kopa Caffe optimizadas por `npm run assets` (a partir de reference/*.jpg).
 * Todas son 3:4 (vertical), disponibles en 160 / 480 / 768 / 1152 px de ancho.
 */
const files = import.meta.glob('../assets/kopa/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const WIDTHS = [160, 480, 768, 1152]
export const KOPA_PHOTO_RATIO = { width: 768, height: 1024 }

export function kopaPhoto(name) {
  return {
    src: files[`../assets/kopa/${name}-768.webp`],
    srcSet: WIDTHS.map((w) => `${files[`../assets/kopa/${name}-${w}.webp`]} ${w}w`).join(', '),
  }
}

export const kopaMarkWhite = files['../assets/kopa/kopa-mark-white.webp']
