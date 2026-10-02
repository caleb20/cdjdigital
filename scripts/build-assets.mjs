/**
 * Genera los assets derivados del proyecto. Ejecutar con: npm run assets
 *
 *  1. Fotos de Kopa Caffe (reference/*.jpg) → src/assets/kopa/*.webp en varios anchos.
 *     Los originales de reference/ NO se modifican.
 *  2. Ícono de Kopa en blanco (para el mockup oscuro).
 *  3. Favicon, apple-touch-icon e imagen Open Graph de CDJ Digital.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ref = path.join(root, 'reference')
const kopaOut = path.join(root, 'src', 'assets', 'kopa')
const publicDir = path.join(root, 'public')

await mkdir(kopaOut, { recursive: true })
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

/* ---------- 3. Marca CDJ Digital ---------- */
// Logotipo monolínea "CDJ" (mismo trazado que src/components/ui/Logo.jsx).
const letters = `
  <path d="M26.7 11 A14 14 0 1 0 26.7 29"/>
  <path d="M40 6 H48 A14 14 0 0 1 48 34 H40 Z"/>
  <path d="M86 6 V24 A9 9 0 0 1 68 24"/>`

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4c5cff"/>
      <stop offset="1" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#g)"/>
  <g transform="translate(5.65 20) scale(0.6)" fill="none" stroke="#fff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round">${letters}</g>
</svg>
`
await writeFile(path.join(publicDir, 'favicon.svg'), faviconSvg)
await sharp(Buffer.from(faviconSvg), { density: 384 }).resize(48, 48).png().toFile(path.join(publicDir, 'favicon-48.png'))
await sharp(Buffer.from(faviconSvg), { density: 384 }).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'))
console.log('  ✓ favicon.svg, favicon-48.png, apple-touch-icon.png')

// Open Graph 1200×630
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050816"/>
      <stop offset="1" stop-color="#0b1230"/>
    </linearGradient>
    <radialGradient id="glowB" cx="0.88" cy="0.1" r="0.6">
      <stop offset="0" stop-color="#4c5cff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#4c5cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowV" cx="0.95" cy="0.95" r="0.5">
      <stop offset="0" stop-color="#7c3aed" stop-opacity="0.5"/>
      <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="txt" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6c7bff"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
    <linearGradient id="btn" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4c5cff"/>
      <stop offset="1" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glowB)"/>
  <rect width="1200" height="630" fill="url(#glowV)"/>
  <g transform="translate(80 70) scale(2.6)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${letters}</g>
  <text x="84" y="192" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="9" fill="#9aa8c7">DIGITAL</text>
  <text x="80" y="342" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">Tu negocio merece</text>
  <text x="80" y="428" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">una web <tspan fill="url(#txt)">profesional.</tspan></text>
  <rect x="80" y="486" width="388" height="62" rx="31" fill="url(#btn)"/>
  <text x="274" y="527" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#fff">Desde S/99/mes</text>
  <text x="1120" y="570" text-anchor="end" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#9aa8c7">cdjdigital.pe</text>
</svg>`
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(publicDir, 'og-image.jpg'))
console.log('  ✓ og-image.jpg')

console.log('Assets listos.')
