/**
 * Fotos y tipografías de las webs de ejemplo del hero.
 * Las fotos salen de reference/rubros/*.jpg (Unsplash, ver CREDITS.md) vía `npm run assets`.
 * Las fuentes solo declaran @font-face: el navegador descarga cada archivo cuando su rubro se muestra.
 */
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import '@fontsource/alfa-slab-one/latin.css'
import '@fontsource/shrikhand/latin.css'
import '@fontsource/anton/latin.css'
import '@fontsource-variable/cormorant/wght.css'
import '@fontsource-variable/cormorant/wght-italic.css'
import '@fontsource-variable/rubik/wght.css'

const files = import.meta.glob('../../assets/rubros/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Foto grande (1200 px), para portadas y franjas a todo el ancho. */
export const photo = (key) => files[`../../assets/rubros/${key}-1200.webp`]

/** Foto chica (480 px), para tarjetas y galerías. */
export const thumb = (key) => files[`../../assets/rubros/${key}-480.webp`]
