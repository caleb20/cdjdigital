/** Planes y servicios adicionales. JS puro: también lo usa `vite.config.js` para el JSON-LD. */

/** Cambios de contenido que CDJ hace cada mes, y tiempo máximo de respuesta (días hábiles), por plan. */
const monthlyChanges = { inicio: 2, negocio: 4, pro: 8 }
const supportHours = { inicio: 72, negocio: 48, pro: 24 }

export const plans = [
  {
    id: 'inicio',
    name: 'Inicio',
    price: 99,
    promise: 'Que tus clientes te encuentren y te escriban',
    description:
      'Pasas de tener solo redes sociales a tener tu propia página: tu WhatsApp, tu ubicación y tus datos en un solo lugar, siempre en línea.',
    chooseIf: 'Hoy solo tienes redes sociales, o recién empiezas, y quieres verte profesional y que te escriban por WhatsApp.',
    featured: false,
    monthlyChanges: monthlyChanges.inicio,
    supportHours: supportHours.inicio,
    features: [
      'Landing page profesional',
      'Diseño responsive',
      'Botón de WhatsApp',
      'Redes sociales',
      'Formulario de contacto',
      'Google Maps',
      'SEO básico',
      'HTTPS',
      'Hosting',
      'Soporte por WhatsApp',
      `Hasta ${monthlyChanges.inicio} cambios de contenido al mes`,
      'Dominio obligatorio (se paga aparte)',
    ],
    whatsappMessage: 'Hola, estoy interesado en el plan Inicio de CDJ Digital de S/99/mes.',
  },
  {
    id: 'negocio',
    name: 'Negocio',
    price: 150,
    badge: 'MÁS ELEGIDO',
    promise: 'Que vean lo que vendes y te elijan',
    description:
      'Muestras tu carta o catálogo con fotos, generas confianza con reseñas y ves cuánta gente visita tu web.',
    chooseIf: 'Ya vendes y quieres mostrar tus productos o servicios con fotos, ganar confianza con reseñas y medir tus visitas.',
    featured: true,
    monthlyChanges: monthlyChanges.negocio,
    supportHours: supportHours.negocio,
    features: [
      'Todo lo del plan Inicio',
      'Hasta 5 páginas/secciones',
      'Galería de imágenes',
      'Catálogo o menú',
      'Integración con WhatsApp',
      'Google Maps',
      'Reseñas',
      'Google Analytics',
      'SEO mejorado',
      'Hosting',
      'Mantenimiento',
      'Soporte',
      `Hasta ${monthlyChanges.negocio} cambios de contenido al mes`,
      'Dominio incluido el primer año',
    ],
    whatsappMessage: 'Hola, estoy interesado en el plan Negocio de CDJ Digital de S/150/mes.',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 249,
    promise: 'Que tu web trabaje por tu negocio',
    description:
      'Recibes reservas ordenadas, publicas promociones y novedades tú mismo y atraes clientes desde Google con tu propio blog.',
    chooseIf: 'Necesitas reservas, promociones o novedades que cambias seguido, y quieres atraer clientes desde Google.',
    featured: false,
    monthlyChanges: monthlyChanges.pro,
    supportHours: supportHours.pro,
    features: [
      'Todo lo del plan Negocio',
      'Hasta 10 páginas',
      'Catálogo avanzado',
      'Blog',
      'Reservas',
      'Formularios avanzados',
      'Panel básico de contenido',
      'Promociones',
      'SEO avanzado',
      'Mantenimiento',
      'Soporte prioritario',
      'Hosting',
      `Hasta ${monthlyChanges.pro} cambios de contenido al mes`,
      'Dominio incluido el primer año',
    ],
    whatsappMessage: 'Hola, estoy interesado en el plan Pro de CDJ Digital de S/249/mes.',
  },
]

export const corporateEmail = {
  price: 25,
  example: 'contacto@tunegocio.pe',
}

/**
 * Detalle por plan: qué significa cada punto de las tarjetas. `null` = no incluido.
 * Es la única fuente de la tabla «Qué incluye cada plan, en detalle».
 */
export const planComparison = [
  {
    label: 'Páginas',
    hint: 'Cuántas pantallas distintas tiene tu web.',
    inicio: '1 página (landing)',
    negocio: 'Hasta 5 páginas o secciones',
    pro: 'Hasta 10 páginas',
  },
  {
    label: 'Dominio propio',
    hint: 'La dirección de tu web, por ejemplo tunegocio.pe.',
    inicio: 'No incluido: es obligatorio para publicar tu web y se paga aparte',
    negocio: 'Incluido el primer año',
    pro: 'Incluido el primer año',
  },
  {
    label: 'Hosting y HTTPS',
    hint: 'Dónde vive tu web y el candado de seguridad del navegador.',
    inicio: 'Incluidos',
    negocio: 'Incluidos',
    pro: 'Incluidos',
  },
  {
    label: 'Cambios de contenido al mes',
    hint: 'Textos, precios, horarios o fotos que nos pides cambiar (ver abajo qué cuenta como cambio).',
    inicio: `Hasta ${monthlyChanges.inicio}`,
    negocio: `Hasta ${monthlyChanges.negocio}`,
    pro: `Hasta ${monthlyChanges.pro}, además de lo que edites tú en el panel`,
  },
  {
    label: 'Respuesta de soporte',
    hint: 'Tiempo máximo para atender tu mensaje de WhatsApp, en días hábiles.',
    inicio: `Hasta ${supportHours.inicio} horas`,
    negocio: `Hasta ${supportHours.negocio} horas`,
    pro: `Hasta ${supportHours.pro} horas (prioritario)`,
  },
  {
    label: 'SEO',
    hint: 'Preparar tu web para que Google la entienda y la muestre. No garantiza posiciones.',
    inicio: 'Básico: títulos y descripciones, URLs amigables, sitemap, imágenes optimizadas y Google Search Console',
    negocio: 'Mejorado: lo básico, más textos pensados en lo que buscan tus clientes y optimización local',
    pro: 'Avanzado: lo mejorado, más SEO para el blog y para tus productos',
  },
  {
    label: 'Mantenimiento',
    hint: 'Que tu web siga funcionando bien con el paso del tiempo.',
    inicio: 'Corrección de fallos',
    negocio: 'Corrección de fallos, actualizaciones técnicas y copias de seguridad',
    pro: 'Lo del plan Negocio, con atención prioritaria',
  },
  {
    label: 'Estadísticas de visitas',
    hint: 'Cuánta gente entra a tu web y de dónde viene (Google Analytics).',
    inicio: null,
    negocio: 'Incluidas',
    pro: 'Incluidas',
  },
  {
    label: 'Panel de contenido',
    hint: 'Una pantalla privada donde tú mismo cambias contenido sin pedírnoslo.',
    inicio: null,
    negocio: null,
    pro: 'Editas productos, promociones y blog tú mismo',
  },
]

/** Qué es un «cambio menor» (el que está incluido en la mensualidad) y qué se cotiza aparte. */
export const minorChanges = {
  definition:
    'Un cambio es una solicitud que nos envías por WhatsApp. Puede juntar varios ajustes pequeños del mismo tipo, por ejemplo actualizar 5 precios o cambiar 3 fotos.',
  included: [
    'Cambiar textos, precios, horarios, dirección o teléfono',
    'Cambiar fotos por otras que tú nos envías',
    'Actualizar enlaces de redes sociales y el número de WhatsApp',
    'Mostrar u ocultar una sección que ya existe',
    'Corregir errores o fallos de tu web',
  ],
  extra: [
    'Páginas o secciones nuevas',
    'Rediseño: nueva estructura, colores o estilo',
    'Funciones nuevas: reservas, pagos en línea, tienda o cuentas de usuario',
    'Integraciones y automatizaciones',
    'Redactar textos, crear logos o tomar fotografías',
  ],
  note: 'Los cambios que no uses en el mes no se acumulan. Si necesitas algo de «Se cotiza aparte», te enviamos una cotización antes de empezar, sin compromiso.',
}
