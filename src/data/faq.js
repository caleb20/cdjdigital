import { plans } from './pricing.js'

const changesByPlan = plans.map((plan) => `${plan.monthlyChanges} en ${plan.name}`).join(', ')

export const faqs = [
  {
    question: '¿Tengo que pagar una instalación?',
    answer:
      'Nuestros planes funcionan con una mensualidad y no requieren un pago inicial en la modalidad estándar.',
  },
  {
    question: '¿El dominio está incluido?',
    answer:
      'En los planes Negocio y Pro el dominio va incluido el primer año; la renovación se cotiza según el dominio elegido. En el plan Inicio el dominio es obligatorio para publicar tu web, pero no está incluido: se paga aparte (si ya tienes uno, lo conectamos).',
  },
  {
    question: '¿Incluyen hosting?',
    answer: 'Sí. El hosting está incluido mientras el servicio web se encuentre activo.',
  },
  {
    question: '¿Puedo cambiar los productos o precios?',
    answer:
      `Sí. Cada plan incluye cambios de contenido al mes (${changesByPlan}): textos, precios, horarios, fotos y enlaces. Páginas nuevas, rediseños o funciones nuevas se cotizan aparte. El detalle está en «¿Qué es un cambio menor?».`,
  },
  {
    question: '¿Incluyen correo corporativo?',
    answer: 'El correo corporativo es un servicio adicional y se contrata por cuenta.',
  },
  {
    question: '¿Puedo cancelar el servicio?',
    answer:
      'Sí, revisaremos las condiciones del plan contratado y la vigencia mínima acordada.',
  },
  {
    question: '¿Pueden agregar funciones personalizadas?',
    answer:
      'Sí. Podemos desarrollar funcionalidades adicionales como reservas, sistemas internos, catálogos avanzados, integraciones y automatizaciones. Estas se cotizan aparte.',
  },
  {
    question: '¿Trabajan solo con negocios en Lima?',
    answer: 'Podemos trabajar con negocios de todo Perú de manera remota.',
  },
]
