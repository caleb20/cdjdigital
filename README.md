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
| Facebook / Instagram / TikTok | `site.social.*` (`…REEMPLAZAR…`) | **Placeholders** (se muestran en el footer; no se publican en el JSON-LD) |

Si `WHATSAPP_NUMBER` volviera a ser un placeholder, la consola avisa en desarrollo y el JSON-LD omite el teléfono.

Los mensajes de WhatsApp están en `whatsappMessages` (`site.js`) y en cada plan (`src/data/pricing.js`).
Los enlaces se generan **solo** con `getWhatsAppUrl(message)` de [`src/lib/whatsapp.js`](src/lib/whatsapp.js).

## Estructura

```
src/
  config/site.js          Nombre, dominio, WhatsApp, email, redes, SEO (única fuente de verdad)
  data/                   pricing.js · demos.js · faq.js  (JS puro)
  lib/                    whatsapp.js · kopaImages.js
  components/             Header, Hero, Services, Process, Pricing, CorporateEmail, Demos,
                          Features, SEOSection, WhyCDJ, Testimonials, FAQ, FinalCTA, Footer,
                          WhatsAppButton
    mockups/              Laptop / celular / navegador y las pantallas de Kopa y de los conceptos
    ui/                   Logo, Reveal (animación al scroll), SectionHeading, íconos de marca
  assets/kopa/            Fotos de Kopa optimizadas (WebP, 160/480/768/1152 px)
reference/                Fotos originales de Kopa Caffe (NO se modifican)
scripts/
  build-assets.mjs        npm run assets
  seoPlugin.js            Plugin de Vite: meta tags, JSON-LD, sitemap.xml y robots.txt
public/                   favicon, apple-touch-icon, og-image
```

### Cómo editar contenido

- **Planes, precios y mensajes de WhatsApp de cada plan:** `src/data/pricing.js`.
- **Demos / conceptos:** `src/data/demos.js` (los conceptos son negocios ficticios y siempre se rotulan "Concepto").
- **Preguntas frecuentes:** `src/data/faq.js`.
- **Testimonios:** la sección muestra un estado inicial ("Tu negocio puede ser el próximo."). Cuando existan clientes reales, reemplaza la tarjeta en `src/components/Testimonials.jsx`. No se inventan testimonios.
- **SEO** (título, descripción, imagen OG, JSON-LD, sitemap, robots): se generan desde `site.js` y `pricing.js` mediante `scripts/seoPlugin.js`. Cambia el dominio en `site.url` y todo se actualiza.

### `npm run assets`

Lee `reference/*.jpg` y genera: fotos WebP en `src/assets/kopa/`, el ícono blanco de Kopa, `favicon.svg`,
`favicon-48.png`, `apple-touch-icon.png` y `og-image.jpg`. Los originales de `reference/` no se tocan.

## Despliegue en Vercel

El proyecto ya incluye `vercel.json` (framework Vite, `dist/`, caché inmutable para `/assets`, cabeceras de seguridad).

1. Sube el repositorio a GitHub/GitLab/Bitbucket e impórtalo en [vercel.com/new](https://vercel.com/new)
   (Vercel detecta Vite: build `npm run build`, salida `dist`), **o** usa la CLI: `npx vercel --prod`.
2. En *Settings → Domains*, agrega `cdjdigital.pe` y configura los registros DNS que Vercel indique.
3. Verifica `https://cdjdigital.pe/sitemap.xml` y `/robots.txt`, y registra el sitio en Google Search Console.

## Accesibilidad y rendimiento

- HTML semántico, enlace "Saltar al contenido", foco visible, menú móvil y FAQ accesibles por teclado (`aria-expanded`, `aria-controls`, `Escape`).
- Respeta `prefers-reduced-motion`.
- Fuente Inter autoalojada (sin peticiones a terceros), imágenes WebP con `srcset`, `width/height` y `loading="lazy"` fuera del primer pantallazo.
- Los mockups de dispositivos son HTML/CSS (escalan con `cqw`), no imágenes pesadas.
