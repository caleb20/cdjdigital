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
    chooseIf: 'Para ti si hoy solo tienes redes sociales, o recién empiezas, y quieres verte profesional.',
    featured: false,
    monthlyChanges: monthlyChanges.inicio,
    supportHours: supportHours.inicio,
    /** Lo que distingue al plan en su tarjeta; el detalle completo está en `planComparison`. */
    highlights: [
      'Una página con todo lo de tu negocio',
      'Botón de WhatsApp, mapa y formulario',
      `Hasta ${monthlyChanges.inicio} cambios de contenido al mes`,
    ],
    domainNote: 'Dominio obligatorio, se paga aparte',
    demoShot: 'Portada de la demo del plan Inicio: foto de la fachada de Kopa Caffe y botón de WhatsApp',
    whatsappMessage: 'Hola, estoy interesado en el plan Inicio de CDJ Digital de S/99/mes.',
  },
  {
    id: 'negocio',
    name: 'Negocio',
    price: 150,
    badge: 'Recomendado',
    promise: 'Que vean lo que vendes y te elijan',
    description:
      'Muestras tu carta o catálogo con fotos, generas confianza con reseñas y ves cuánta gente visita tu web.',
    chooseIf: 'Para ti si ya vendes y quieres mostrar tus productos con fotos y ganar confianza.',
    featured: true,
    monthlyChanges: monthlyChanges.negocio,
    supportHours: supportHours.negocio,
    highlights: [
      'Hasta 5 páginas o secciones',
      'Carta o catálogo con fotos',
      'Galería y reseñas de tus clientes',
      'Sabes cuánta gente visita tu web',
    ],
    domainNote: 'Dominio incluido el primer año',
    demoShot: 'Carta de la demo del plan Negocio: cafés, hamburguesas, alitas y postres con fotos',
    whatsappMessage: 'Hola, estoy interesado en el plan Negocio de CDJ Digital de S/150/mes.',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 249,
    promise: 'Que tu web trabaje por tu negocio',
    description:
      'Recibes reservas ordenadas, publicas promociones y novedades tú mismo y atraes clientes desde Google con tu propio blog.',
    chooseIf: 'Para ti si necesitas reservas o promociones que cambias seguido.',
    featured: false,
    monthlyChanges: monthlyChanges.pro,
    supportHours: supportHours.pro,
    highlights: [
      'Hasta 10 páginas',
      'Reservas que te llegan ordenadas',
      'Promociones y blog que publicas tú',
      'Tu propio panel para editar',
    ],
    domainNote: 'Dominio incluido el primer año',
    demoShot: 'Página de promociones de la demo del plan Pro, con un cupón de descuento',
    whatsappMessage: 'Hola, estoy interesado en el plan Pro de CDJ Digital de S/249/mes.',
  },
]

export const corporateEmail = {
  price: 25,
  example: 'contacto@tunegocio.pe',
}

/** Lo que va en los tres planes: se muestra una sola vez, encima de la tabla. */
export const includedInAll = [
  'Diseño adaptado al celular',
  'Botón de WhatsApp',
  'Enlaces a tus redes',
  'Google Maps',
  'Formulario de contacto',
  'HTTPS (candado de seguridad)',
  'Hosting',
  'SEO básico',
  'Soporte por WhatsApp',
]

/**
 * Lo que CAMBIA entre planes. Valores cortos para que quepan 3 columnas también en celular;
 * `hint` explica la fila (se despliega). `null` = no incluido, `true` = incluido.
 */
export const planComparison = [
  {
    label: 'Páginas',
    hint: 'Cuántas páginas o secciones distintas tiene tu web.',
    inicio: '1',
    negocio: 'Hasta 5',
    pro: 'Hasta 10',
  },
  {
    label: 'Dominio propio',
    hint: 'La dirección de tu web, por ejemplo tunegocio.pe. En Inicio es obligatorio para publicar y se paga aparte (si ya tienes uno, lo conectamos). En Negocio y Pro va incluido el primer año; la renovación se cotiza según el dominio.',
    inicio: 'Aparte',
    negocio: '1er año',
    pro: '1er año',
  },
  {
    label: 'Cambios al mes',
    hint: 'Textos, precios, horarios o fotos que nos pides cambiar. En Pro, además, editas tú mismo desde tu panel.',
    inicio: String(monthlyChanges.inicio),
    negocio: String(monthlyChanges.negocio),
    pro: `${monthlyChanges.pro} + panel`,
  },
  {
    label: 'Respuesta de soporte',
    hint: 'Tiempo máximo para atender tu mensaje de WhatsApp, en días hábiles. En Pro, con prioridad.',
    inicio: `${supportHours.inicio} h`,
    negocio: `${supportHours.negocio} h`,
    pro: `${supportHours.pro} h`,
  },
  {
    label: 'SEO',
    hint: 'Preparar tu web para que Google la entienda y la muestre; no garantiza posiciones. Básico: títulos y descripciones, URLs amigables, sitemap, imágenes optimizadas y Google Search Console. Mejorado: además, textos pensados en lo que buscan tus clientes y optimización local. Avanzado: además, SEO para tu blog y tus productos.',
    inicio: 'Básico',
    negocio: 'Mejorado',
    pro: 'Avanzado',
  },
  {
    label: 'Mantenimiento',
    hint: 'Que tu web siga funcionando bien con el tiempo. Básico: corrección de fallos. Completo: además, actualizaciones técnicas y copias de seguridad. Prioritario: lo completo, con atención prioritaria.',
    inicio: 'Básico',
    negocio: 'Completo',
    pro: 'Prioritario',
  },
  {
    label: 'Carta o catálogo',
    hint: 'Tus productos o servicios con fotos y precios, por categorías. En Pro, cada producto puede tener opciones, como tamaños o extras.',
    inicio: null,
    negocio: true,
    pro: 'Con opciones',
  },
  {
    label: 'Galería y reseñas',
    hint: 'Fotos de tu local y opiniones de tus clientes, para dar confianza.',
    inicio: null,
    negocio: true,
    pro: true,
  },
  {
    label: 'Estadísticas de visitas',
    hint: 'Cuánta gente entra a tu web y de dónde viene (Google Analytics).',
    inicio: null,
    negocio: true,
    pro: true,
  },
  {
    label: 'Reservas',
    hint: 'Tus clientes piden mesa o cita desde la web y te llegan ordenadas.',
    inicio: null,
    negocio: null,
    pro: true,
  },
  {
    label: 'Promociones y blog',
    hint: 'Publicas ofertas y artículos tú mismo; el blog ayuda a que te encuentren en Google.',
    inicio: null,
    negocio: null,
    pro: true,
  },
  {
    label: 'Panel de contenido',
    hint: 'Una pantalla privada donde tú mismo cambias productos, promociones y artículos, sin pedírnoslo.',
    inicio: null,
    negocio: null,
    pro: true,
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
