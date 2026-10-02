import { WHATSAPP_NUMBER, isPlaceholder } from '../config/site.js'

/**
 * Enlace de WhatsApp con mensaje prearmado.
 * Es la única función que construye URLs de wa.me: ningún componente toca el número.
 */
export function getWhatsAppUrl(message = '') {
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${WHATSAPP_NUMBER}${text}`
}

if (import.meta.env?.DEV && isPlaceholder(WHATSAPP_NUMBER)) {
  console.warn(
    '[CDJ Digital] WHATSAPP_NUMBER sigue siendo un placeholder. Edita src/config/site.js antes de publicar.',
  )
}
