import { whatsappMessages } from '../config/site.js'
import { defaultRubro, rubros } from '../data/rubros.js'
import { getWhatsAppUrl } from './whatsapp.js'

/** Lo que el visitante escribe en el hero. Vive en App para que el cierre y los botones lo usen. */
export const initialBusiness = { name: '', rubroId: defaultRubro.id, rubroChosen: false }

/**
 * Deriva todo lo que la página muestra a partir de lo que escribió el visitante:
 * el rubro, el nombre visible (el suyo o uno de ejemplo) y el enlace de WhatsApp.
 * El rubro solo entra en el mensaje si lo eligió: el que viene marcado de inicio no cuenta.
 */
export function describeBusiness({ name, rubroId, rubroChosen }) {
  const rubro = rubros.find((item) => item.id === rubroId) ?? defaultRubro
  const typedName = name.trim().replace(/\s+/g, ' ')
  const message = whatsappMessages.business({
    noun: rubroChosen ? rubro.noun : undefined,
    name: typedName || undefined,
  })
  const displayName = typedName || rubro.sampleName
  return {
    rubro,
    typedName,
    displayName,
    domain: toDomain(displayName),
    message,
    whatsappUrl: getWhatsAppUrl(message),
  }
}

/** La dirección que tendría su web: «Barbería Don Lucho» → barberiadonlucho.pe */
function toDomain(name) {
  const slug = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 28)
  return `${slug || 'tunegocio'}.pe`
}
