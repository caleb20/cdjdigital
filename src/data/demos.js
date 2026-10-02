/**
 * Demos. `kopa` es un proyecto real (https://kopa-caffe.vercel.app/).
 * El resto son CONCEPTOS visuales: negocios ficticios para mostrar variedad de rubros.
 * Se renderizan con HTML/CSS (sin imágenes externas) y siempre se rotulan como "Concepto".
 */

export const kopaDemo = {
  id: 'kopa',
  name: 'Kopa Caffe',
  category: 'Cafetería / Restaurante',
  description: 'Carta digital, galería de fotos, ubicación con mapa y contacto por WhatsApp.',
  features: ['Carta digital', 'Galería de fotos', 'Ubicación con mapa', 'WhatsApp'],
}

export const conceptDemos = [
  {
    id: 'barber-studio',
    name: 'Barber Studio',
    category: 'Barbería',
    tags: ['Cortes', 'Barba', 'Reservas'],
    icon: 'Scissors',
    headline: 'Cortes con estilo.',
    cta: 'Reservar',
    colors: { bg: '#14110f', bg2: '#2a211a', accent: '#d9a441', text: '#f7efe2', onAccent: '#1a1208' },
  },
  {
    id: 'la-casa-pizza',
    name: 'La Casa Pizza',
    category: 'Pizzería',
    tags: ['Pizzas', 'Pastas', 'Delivery'],
    icon: 'Pizza',
    headline: 'Pizza artesanal.',
    cta: 'Pedir ahora',
    colors: { bg: '#3a0d0a', bg2: '#8a1c12', accent: '#ffc857', text: '#fff4e6', onAccent: '#3a0d0a' },
  },
  {
    id: 'power-fitness',
    name: 'Power Fitness',
    category: 'Gimnasio',
    tags: ['Entrenamiento', 'Planes', 'Contacto'],
    icon: 'Dumbbell',
    headline: 'Entrena sin excusas.',
    cta: 'Probar clase',
    colors: { bg: '#0b0f14', bg2: '#16202c', accent: '#ff6b2c', text: '#f3f6fa', onAccent: '#1a0b02' },
  },
  {
    id: 'beauty-studio',
    name: 'Beauty Studio',
    category: 'Belleza y spa',
    tags: ['Servicios', 'Galería', 'Reservas'],
    icon: 'Sparkles',
    headline: 'Realza tu belleza.',
    cta: 'Agendar cita',
    colors: { bg: '#fbe9ee', bg2: '#f4c9d6', accent: '#a8325a', text: '#3b1625', onAccent: '#ffffff' },
  },
  {
    id: 'homefix',
    name: 'HomeFix',
    category: 'Servicios del hogar',
    tags: ['Reparaciones', 'Servicios', 'WhatsApp'],
    icon: 'Wrench',
    headline: 'Arreglamos tu hogar.',
    cta: 'Cotizar',
    colors: { bg: '#0d2240', bg2: '#17406f', accent: '#ffd23f', text: '#f2f7ff', onAccent: '#0d2240' },
  },
]
