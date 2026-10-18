/**
 * Rubros de la vista previa del hero. Cada uno tiene su propia web de ejemplo en
 * src/components/preview/templates/ (diseño, fotos y textos); aquí solo va lo que usa el hero.
 * Son ejemplos de diseño, no clientes: el nombre que se ve es el que escribe el visitante o,
 * si no escribe nada, uno de ejemplo (`sampleName`). `noun` arma el mensaje de WhatsApp.
 */
export const rubros = [
  { id: 'cafeteria', label: 'Cafetería', noun: 'una cafetería', sampleName: 'Café Aurora' },
  { id: 'barberia', label: 'Barbería', noun: 'una barbería', sampleName: 'Barbería Don Lucho' },
  { id: 'pizzeria', label: 'Pizzería', noun: 'una pizzería', sampleName: 'Pizzería Nonna' },
  { id: 'gimnasio', label: 'Gimnasio', noun: 'un gimnasio', sampleName: 'Gimnasio Fuerza' },
  { id: 'belleza', label: 'Belleza', noun: 'un estudio de belleza', sampleName: 'Studio Bella' },
  { id: 'hogar', label: 'Hogar', noun: 'un servicio para el hogar', sampleName: 'Maestro Fix' },
]

export const defaultRubro = rubros[1]
