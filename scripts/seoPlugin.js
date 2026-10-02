/**
 * Plugin de Vite: toma los datos de `src/config/site.js` y `src/data/pricing.js` (única fuente
 * de verdad) para completar index.html, generar el JSON-LD y emitir sitemap.xml y robots.txt.
 */
import { site, isPlaceholder } from '../src/config/site.js'
import { plans, corporateEmail } from '../src/data/pricing.js'

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function buildJsonLd() {
  // Solo datos reales: no se inventan dirección, teléfono ni redes. Los placeholders se omiten.
  const sameAs = Object.values(site.social).filter((url) => url && !isPlaceholder(url))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/apple-touch-icon.png`,
        slogan: site.tagline,
        description: site.seo.description,
        areaServed: { '@type': 'Country', name: site.country },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: 'es-PE',
        publisher: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${site.url}/#service`,
        serviceType: 'Diseño y desarrollo de páginas web',
        name: 'Páginas web profesionales para negocios',
        description: site.seo.description,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: site.country },
        offers: [
          ...plans.map((plan) => ({
            '@type': 'Offer',
            name: `Plan ${plan.name}`,
            description: plan.description,
            price: String(plan.price),
            priceCurrency: 'PEN',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(plan.price),
              priceCurrency: 'PEN',
              unitText: 'MON',
            },
            url: `${site.url}/#planes`,
          })),
          {
            '@type': 'Offer',
            name: 'Correo corporativo (por cuenta)',
            price: String(corporateEmail.price),
            priceCurrency: 'PEN',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: String(corporateEmail.price),
              priceCurrency: 'PEN',
              unitText: 'MON',
            },
            url: `${site.url}/#planes`,
          },
        ],
      },
    ],
  }
}

const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${site.url}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

const robotsTxt = () => `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`

export default function seoPlugin() {
  const tokens = {
    SITE_NAME: site.name,
    SITE_URL: site.url,
    SITE_LOCALE: site.locale,
    SEO_TITLE: site.seo.title,
    SEO_DESCRIPTION: site.seo.description,
    SEO_THEME_COLOR: site.seo.themeColor,
    OG_IMAGE: `${site.url}${site.seo.ogImage}`,
    OG_IMAGE_ALT: site.seo.ogImageAlt,
    HEADLINE: site.headline,
    STARTING_PRICE: site.startingPrice,
    WEB_DOMAIN: site.domain,
  }

  return {
    name: 'cdj-seo',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const filled = html.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) =>
          key in tokens ? escapeAttr(tokens[key]) : match,
        )
        return {
          html: filled,
          tags: [
            {
              tag: 'script',
              attrs: { type: 'application/ld+json' },
              children: JSON.stringify(buildJsonLd()),
              injectTo: 'head',
            },
          ],
        }
      },
    },

    // sitemap.xml y robots.txt: se sirven en dev y se emiten en el build.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8')
          res.end(sitemapXml())
        } else if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.end(robotsTxt())
        } else {
          next()
        }
      })
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
    },
  }
}
