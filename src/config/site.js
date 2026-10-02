/**
 * Datos de CDJ Digital en un solo lugar.
 *
 * Este archivo es JavaScript puro (sin JSX ni APIs del navegador) porque también lo lee
 * `vite.config.js` en Node para generar meta tags, JSON-LD, sitemap.xml y robots.txt.
 *
 * ⚠️ REEMPLAZAR ANTES DE PUBLICAR: todo lo marcado con "TODO".
 */

/** TODO: número real de WhatsApp en formato internacional, sin "+" ni espacios (Perú = 51). */
export const WHATSAPP_NUMBER = '519XXXXXXXX'

export const site = {
  name: 'CDJ Digital',
  domain: 'cdjdigital.pe',
  url: 'https://cdjdigital.pe',
  country: 'Perú',
  countryCode: 'PE',
  city: 'Lima',
  locale: 'es_PE',
  tagline: 'Tecnología que impulsa tu negocio.',
  headline: 'Tu negocio merece una web profesional.',
  startingPrice: 'Desde S/99/mes',
  year: 2026,

  /** TODO: confirmar que este buzón existe. */
  email: 'contacto@cdjdigital.pe',

  /**
   * TODO: reemplazar por los perfiles reales. Mientras contengan "REEMPLAZAR" se consideran
   * placeholders: se muestran en el footer pero NO se publican en el JSON-LD (`sameAs`).
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
    ogImageAlt: 'CDJ Digital — Tu negocio merece una web profesional.',
    themeColor: '#050816',
  },

  /** Demo real que ya está en línea (primer proyecto de CDJ Digital). */
  kopaUrl: 'https://kopa-caffe.vercel.app/',
}

/** Mensajes prearmados de WhatsApp. Los de cada plan viven en `data/pricing.js`. */
export const whatsappMessages = {
  general: 'Hola, quiero una página web para mi negocio.',
  project: 'Hola, quiero consultar un proyecto a medida con CDJ Digital.',
  corporateEmail: 'Hola, quiero contratar correo corporativo para mi negocio con CDJ Digital.',
  demo: (name) => `Hola, quiero una web como la demo de ${name} para mi negocio.`,
}

/** ¿El valor sigue siendo un placeholder pendiente de reemplazar? */
export const isPlaceholder = (value = '') => /REEMPLAZAR|X{4,}/.test(value)
