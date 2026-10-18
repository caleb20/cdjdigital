/**
 * Genera los assets derivados del proyecto. Ejecutar con: npm run assets
 *
 *  1. Fotos de Kopa Caffe (reference/*.jpg) → src/assets/kopa/*.webp en varios anchos.
 *     Los originales de reference/ NO se modifican.
 *  2. Ícono de Kopa en blanco (para el mockup oscuro).
 *  3. Capturas de las demos de Kopa por plan (reference/planes/*.png, 16:10) → src/assets/planes/*.webp.
 *     Fotos de los rubros de la vista previa del hero (reference/rubros/*.jpg) → src/assets/rubros/*.webp.
 *  4. Favicon, apple-touch-icon e imagen Open Graph de CDJ Digital.
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ref = path.join(root, 'reference')
const kopaOut = path.join(root, 'src', 'assets', 'kopa')
const planesOut = path.join(root, 'src', 'assets', 'planes')
const rubrosOut = path.join(root, 'src', 'assets', 'rubros')
const publicDir = path.join(root, 'public')

await mkdir(kopaOut, { recursive: true })
await mkdir(planesOut, { recursive: true })
await mkdir(rubrosOut, { recursive: true })
await mkdir(publicDir, { recursive: true })

/* ---------- 1. Fotos de Kopa ---------- */
const photos = [
  'kopa-cafe',
  'kopa-fachada-dia',
  'kopa-fachada-noche',
  'kopa-interior-01',
  'kopa-interior-02',
  'kopa-interior-03',
  'kopa-interior-04',
]
const widths = [160, 480, 768, 1152]

for (const name of photos) {
  const src = path.join(ref, `${name}.jpg`)
  if (!existsSync(src)) {
    console.warn(`  ! falta reference/${name}.jpg`)
    continue
  }
  for (const w of widths) {
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toFile(path.join(kopaOut, `${name}-${w}.webp`))
  }
  console.log(`  ✓ ${name} (${widths.join('/')})`)
}

/* ---------- 2. Ícono de Kopa en blanco ---------- */
const logoSrc = path.join(ref, 'kopa-logo.png')
if (existsSync(logoSrc)) {
  // Recorte del círculo del logo (sin la palabra "KOPA CAFFE"), medido sobre el original 1254×1254.
  const box = { left: 355, top: 173, width: 540, height: 531 }
  const size = 160
  const height = Math.round((size * box.height) / box.width)
  const alpha = await sharp(logoSrc)
    .extract(box)
    .resize(size, height)
    .ensureAlpha()
    .extractChannel('alpha')
    .raw()
    .toBuffer()
  await sharp({ create: { width: size, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha, { raw: { width: size, height, channels: 1 } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(path.join(kopaOut, 'kopa-mark-white.webp'))
  console.log('  ✓ kopa-mark-white')
}

/* ---------- 3. Capturas de las demos por plan ---------- */
// Capturas de pantalla de escritorio (1280×800 a 1.5x) de cada demo de Kopa: la tarjeta de cada plan las muestra.
for (const plan of ['inicio', 'negocio', 'pro']) {
  const src = path.join(ref, 'planes', `${plan}.png`)
  if (!existsSync(src)) {
    console.warn(`  ! falta reference/planes/${plan}.png`)
    continue
  }
  for (const w of [480, 768, 1152]) {
    await sharp(src)
      .resize({ width: w, height: Math.round((w * 10) / 16), fit: 'cover', position: 'top' })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(planesOut, `${plan}-${w}.webp`))
  }
  console.log(`  ✓ captura del plan ${plan}`)
}

// Fotos de los rubros: 1200 px para portadas (la web de ejemplo se ve a ~50 % en pantallas 2x) y 480 px para miniaturas.
const rubroPhotos = (await readdir(path.join(ref, 'rubros'))).filter((file) => file.endsWith('.jpg'))
for (const file of rubroPhotos) {
  const key = file.replace(/.jpg$/, '')
  for (const w of [480, 1200]) {
    await sharp(path.join(ref, 'rubros', file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72, effort: 5 })
      .toFile(path.join(rubrosOut, `${key}-${w}.webp`))
  }
}
console.log(`  ✓ ${rubroPhotos.length} fotos de rubros (480/1200)`)

/* ---------- 4. Marca CDJ Digital ---------- */
// Logotipo monolínea "CDJ" (mismo trazado que src/components/ui/Logo.jsx).
const letters = `
  <path d="M26.7 11 A14 14 0 1 0 26.7 29"/>
  <path d="M40 6 H48 A14 14 0 0 1 48 34 H40 Z"/>
  <path d="M86 6 V24 A9 9 0 0 1 68 24"/>`

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="15" fill="#1d2226"/>
  <g transform="translate(5.65 20) scale(0.6)" fill="none" stroke="#ffc629" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">${letters}</g>
</svg>
`
await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg)
await sharp(Buffer.from(faviconSvg), { density: 384 }).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48.png'))
await sharp(Buffer.from(faviconSvg), { density: 384 }).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('  ✓ favicon.svg, favicon-48.png, apple-touch-icon.png')

// Open Graph 1200×630
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#e9eae6"/>
  <g transform="translate(80 70) scale(2.6)" fill="none" stroke="#1d2226" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${letters}</g>
  <text x="84" y="192" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="9" fill="#5a6168">DIGITAL</text>
  <text x="80" y="342" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="78" font-weight="800" fill="#1d2226">Así se vería tu negocio</text>
  <text x="80" y="430" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="78" font-weight="800" fill="#1d2226">en internet.</text>
  <rect x="80" y="486" width="388" height="62" rx="31" fill="#ffc629"/>
  <text x="274" y="527" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#1d2226">Desde S/99 al mes</text>
  <text x="1120" y="570" text-anchor="end" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#5a6168">cdjdigital.pe</text>
</svg>`
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(publicDir, 'og-image.jpg'))
console.log('  ✓ og-image.jpg')

console.log('Assets listos.')
