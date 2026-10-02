import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import preloadFontPlugin from './scripts/preloadFontPlugin.js'
import seoPlugin from './scripts/seoPlugin.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin(), preloadFontPlugin()],
  build: {
    // Imágenes pequeñas (íconos) se quedan como archivos para poder cachearlas por separado.
    assetsInlineLimit: 2048,
  },
})
