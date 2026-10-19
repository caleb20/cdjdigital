# CDJ Digital — Landing page

Landing de **CDJ Digital** (cdjdigital.pe): páginas web profesionales para negocios y emprendimientos en Perú.
El objetivo de conversión es **WhatsApp**.

**Stack:** React 19 · Vite · JavaScript · Tailwind CSS v4 · Lucide React (sin TypeScript ni librerías de UI).

## Comandos

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo → http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # sirve dist/ para probar el build
npm run assets   # regenera imágenes optimizadas, favicon y og-image (ver más abajo)
```

## ⚠️ Datos que debes reemplazar antes de publicar

Todo está centralizado en [`src/config/site.js`](src/config/site.js):

| Dato | Constante | Estado |
| --- | --- | --- |
| Número de WhatsApp | `WHATSAPP_NUMBER` (`51987317731`) | Configurado; también se publica como `contactPoint` en el JSON-LD |
| Email | `site.email` (`contacto@cdjdigital.pe`) | Por confirmar |
| Facebook / Instagram / TikTok | `site.social.*` (`…REEMPLAZAR…`) | **Placeholders** (no se muestran en el footer ni se publican en el JSON-LD hasta que tengan un perfil real) |

Si `WHATSAPP_NUMBER` volviera a ser un placeholder, la consola avisa en desarrollo y el JSON-LD omite el teléfono.

Los mensajes de WhatsApp están en `whatsappMessages` (`site.js`) y en cada plan (`src/data/pricing.js`).
Lo que el visitante escribe en el hero (nombre y rubro) entra en el mensaje: `whatsappMessages.business` y `src/lib/business.js`.
Los enlaces se generan **solo** con `getWhatsAppUrl(message)` de [`src/lib/whatsapp.js`](src/lib/whatsapp.js).

## Diseño

Concepto: la web de CDJ es un fondo neutro y frío, y el color fuerte lo ponen los negocios en las webs de ejemplo.

- **Colores** (tokens en `src/index.css`): Bruma `#eef1f8` (fondo), Papel `#ffffff` (tarjetas), Tinta `#0f172a`
  (azul marino: texto y cierre), Pizarra `#55607a` (texto secundario) y Azul `#4c5cff`, el azul de la marca, como único
  acento: botones, selecciones, checks y números del proceso. Sin degradados.
- **Tipografía**: Archivo (autoalojada, eje de ancho). Titulares con la clase `.display` (ancho 72 %, peso 800).
- **Secciones**: cada título es la pregunta del dueño: hero «Así se vería tu negocio en internet», ¿Cuánto cuesta?,
  ¿Qué incluye?, ¿Cómo trabajamos?, Otras preguntas y el cierre «¿Hablamos de …?».
- **Hero**: el visitante escribe su negocio y elige el rubro; ve una web de ejemplo completa con su nombre (navegador y
  celular en escritorio, solo celular en móvil). Cada rubro es una plantilla propia en `src/components/preview/templates/`,
  dibujada a tamaño real (1280 / 390 px) y reducida con `zoom`.
- **Movimiento**: un solo momento: al cambiar de rubro, la web de ejemplo baja sola un tramo y vuelve (se cancela al
  tocarla y no corre con movimiento reducido). Sin animaciones al hacer scroll en la página.

## Estructura

```
src/
  config/site.js          Nombre, dominio, WhatsApp, email, redes, SEO (única fuente de verdad)
  data/                   pricing.js · rubros.js · faq.js  (JS puro)
  lib/                    whatsapp.js · business.js · planImages.js
  components/             Header, Hero, Pricing, Included, Process, FAQ, FinalCTA, Footer, MobileCTA
    preview/              Showcase (navegador + celular del hero) y templates/ (una web de ejemplo por rubro)
    ui/                   Logo, SectionHeading, íconos de marca
  assets/planes/          Capturas de las demos de Kopa por plan (WebP 16:10, 480/768/1152 px)
  assets/rubros/          Fotos de las webs de ejemplo del hero (WebP 480/1200 px)
  assets/kopa/            Fotos de Kopa optimizadas (WebP, 160/480/768/1152 px)
reference/                Fotos originales de Kopa Caffe, capturas de las demos (planes/*.png) y fotos de rubros
                          (rubros/*.jpg, Unsplash: ver rubros/CREDITS.md)
scripts/
  build-assets.mjs        npm run assets
  seoPlugin.js            Plugin de Vite: meta tags, JSON-LD, sitemap.xml y robots.txt
public/                   favicon, apple-touch-icon, og-image
```

### Cómo editar contenido

- **Planes, precios y mensajes de WhatsApp de cada plan:** `src/data/pricing.js`.
- **Rubros de la vista previa del hero:** `src/data/rubros.js` (nombre de ejemplo y texto del mensaje) y una plantilla por
  rubro en `src/components/preview/templates/` (diseño, tipografía, fotos y textos). Son ejemplos, no clientes.
- **Fotos de los rubros:** guarda un JPG con la misma clave en `reference/rubros/` y corre `npm run assets`.
- **Qué incluye cada plan:** `includedInAll` (lo común) y `planComparison` (lo que cambia, valores cortos) en `src/data/pricing.js`.
- **Capturas de las demos por plan:** reemplaza `reference/planes/{inicio,negocio,pro}.png` (1920×1200) y corre `npm run assets`.
- **Preguntas frecuentes:** `src/data/faq.js`.
- **Testimonios:** no hay sección hasta tener clientes reales. No se inventan testimonios ni distintivos como «más elegido».
- **SEO** (título, descripción, imagen OG, JSON-LD, sitemap, robots): se generan desde `site.js` y `pricing.js` mediante `scripts/seoPlugin.js`. Cambia el dominio en `site.url` y todo se actualiza.

### `npm run assets`

Lee `reference/*.jpg` y `reference/planes/*.png` y genera: fotos WebP en `src/assets/kopa/`, capturas en `src/assets/planes/`, el ícono blanco de Kopa, `favicon.svg`,
`favicon-48.png`, `apple-touch-icon.png` y `og-image.jpg`. Los originales de `reference/` no se tocan.

## Despliegue en Vercel

El proyecto ya incluye `vercel.json` (framework Vite, `dist/`, caché inmutable para `/assets`, cabeceras de seguridad).

1. Sube el repositorio a GitHub/GitLab/Bitbucket e impórtalo en [vercel.com/new](https://vercel.com/new)
   (Vercel detecta Vite: build `npm run build`, salida `dist`), **o** usa la CLI: `npx vercel --prod`.
2. En *Settings → Domains*, agrega `cdjdigital.pe` y configura los registros DNS que Vercel indique.
3. Verifica `https://cdjdigital.pe/sitemap.xml` y `/robots.txt`, y registra el sitio en Google Search Console.

## Accesibilidad y rendimiento

- HTML semántico, enlace "Saltar al contenido", foco visible, menú móvil, FAQ y filas de la tabla accesibles por teclado (`aria-expanded`, `aria-controls`, `Escape`). Los rubros del hero son radios nativos.
- Respeta `prefers-reduced-motion`.
- Fuente Archivo autoalojada (sin peticiones a terceros), imágenes WebP con `srcset`, `width/height` y `loading="lazy"`.
- La vista previa del hero es HTML/CSS (escala con `cqw`), no una imagen.
- En celular, una barra fija de WhatsApp reemplaza al botón flotante y el footer reserva su alto para no tapar texto.
