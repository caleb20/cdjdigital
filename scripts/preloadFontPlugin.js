/**
 * Plugin de Vite: precarga la fuente Archivo (subset latin, ejes de ancho y peso) en el build.
 * Sin esto el navegador solo descubre la fuente después de descargar y parsear el CSS,
 * lo que retrasa el LCP (el título del hero) en conexiones lentas.
 */
export default function preloadFontPlugin() {
  return {
    name: 'cdj-preload-font',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html // en dev no hay bundle
        const font = Object.keys(ctx.bundle).find((file) => /archivo-latin-wdth-normal.*\.woff2$/.test(file))
        if (!font) return html
        return [
          {
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' },
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}
