/**
 * Datos de CDJ Digital en un solo lugar.
 *
 * Este archivo es JavaScript puro (sin JSX ni APIs del navegador) porque también lo lee
 * `vite.config.js` en Node para generar meta tags, JSON-LD, sitemap.xml y robots.txt.
 *
 * ⚠️ REEMPLAZAR ANTES DE PUBLICAR: todo lo marcado con "TODO".
 */

/** Número de WhatsApp en formato internacional, sin "+" ni espacios (Perú = 51). */
export const WHATSAPP_NUMBER = '51987317731'

export const site = {
  name: 'CDJ Digital',
  domain: 'cdjdigital.pe',
  url: 'https://cdjdigital.pe',
  country: 'Perú',
  countryCode: 'PE',
  city: 'Lima',
  locale: 'es_PE',
  tagline: 'Tecnología que impulsa tu negocio.',
  headline: 'Así se vería tu negocio en internet.',
  startingPrice: 'Desde S/99/mes',
  year: 2026,

  /** TODO: confirmar que este buzón existe. */
  email: 'contacto@cdjdigital.pe',

  /**
   * TODO: reemplazar por los perfiles reales. Mientras contengan "REEMPLAZAR" se consideran
   * placeholders: NO se muestran en el footer ni se publican en el JSON-LD (`sameAs`).
   */
  social: {
    facebook: 'https://www.facebook.com/REEMPLAZAR-FACEBOOK-CDJDIGITAL',
    instagram: 'https://www.instagram.com/REEMPLAZAR-INSTAGRAM-CDJDIGITAL',
    tiktok: 'https://www.tiktok.com/@REEMPLAZAR-TIKTOK-CDJDIGITAL',
  },

  seo: {
    title: 'CDJ Digital | Páginas Web Profesionales para Negocios',
    description:
      'Creamos páginas web profesionales, rápidas y adaptadas a celulares para negocios y emprendimientos en Perú. Planes desde S/99 al mes.',
    ogImage: '/og-image.jpg',
    ogImageAlt: 'CDJ Digital: así se vería tu negocio en internet. Planes desde S/99 al mes.',
    themeColor: '#e9eae6',
  },

  /**
   * Demos reales en línea, una por plan (mismo negocio, Kopa Caffe, con las funciones de cada plan).
   * Si una demo se deja en `null`, su enlace no se muestra.
   */
  demos: {
    inicio: 'https://kopa-caffe-inicio.vercel.app/',
    negocio: 'https://kopa-caffe.vercel.app/',
    pro: 'https://kopa-caffe-pro.vercel.app/',
  },
}

/** Mensajes prearmados de WhatsApp. Los de cada plan viven en `data/pricing.js`. */
export const whatsappMessages = {
  general: 'Hola, quiero una página web para mi negocio.',
  project: 'Hola, quiero consultar un proyecto a medida con CDJ Digital.',
  corporateEmail: 'Hola, quiero contratar correo corporativo para mi negocio con CDJ Digital.',
  /**
   * Mensaje desde la vista previa del hero: la conversación empieza sabiendo qué negocio es.
   * `noun` solo llega si el visitante eligió un rubro; si no tocó nada, se usa el mensaje general.
   */
  business: ({ noun, name } = {}) => {
    if (!noun && !name) return whatsappMessages.general
    const who = name ? `${noun ?? 'un negocio'}, ${name},` : noun
    return `Hola, tengo ${who} y quiero una web como la que vi en cdjdigital.pe.`
  },
}

/** El número de WhatsApp como lo escribe una persona en Perú: 987 317 731. */
export const whatsappDisplay = WHATSAPP_NUMBER.replace(/^51/, '').replace(/(\d{3})(?=\d)/g, '$1 ')

/** ¿El valor sigue siendo un placeholder pendiente de reemplazar? */
export const isPlaceholder = (value = '') => /REEMPLAZAR|X{4,}/.test(value)
