/** Lista las escenas, la duración total y el número de efectos de cada plan (para revisar tiempos sin renderizar).
 *  node kopa/inspect.mjs [inicio|negocio|pro] */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const plans = process.argv[2] ? [process.argv[2]] : ['inicio', 'negocio', 'pro']
const MIME = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.js': 'text/javascript' }
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]))
  if (!file.startsWith(root) || !fs.existsSync(file)) return void res.writeHead(404).end()
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' }); fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find((p) => fs.existsSync(p))
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })
for (const plan of plans) {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${server.address().port}/kopa/index.html?plan=${plan}&render`)
  await page.waitForFunction('window.__ready === true', { timeout: 30000 })
  const { d, cues } = await page.evaluate(() => ({ d: window.__duration, cues: window.__cues }))
  const sc = cues.filter((c) => c.type === 'scene')
  console.log(`\n${plan}: ${d.toFixed(1)} s · ${cues.filter((c) => c.type === 'sfx').length} efectos`)
  sc.forEach((s, i) => console.log(`  ${s.at.toFixed(1).padStart(6)} s  ${s.name.padEnd(8)} (${((sc[i + 1]?.at ?? d) - s.at).toFixed(1)} s)`))
  // Textos que no caben en su tarjeta (se cortan o salen con "…"); el tamaño no depende de las animaciones
  const over = await page.evaluate(() => {
    const scenes = [...document.querySelectorAll('.scene')]
    return [...document.querySelectorAll('.scene .item, .scene .card, .scene .cu, .scene .cap, .scene .tagreq, .scene .bubble')]
      .filter((n) => n.scrollHeight > n.clientHeight + 4 || n.scrollWidth > n.clientWidth + (n.classList.contains('cap') ? 1 : 4)) // ±3 px = adornos del borde
      .map((n) => `escena ${scenes.indexOf(n.closest('.scene'))} · .${n.className.split(' ')[0]} · ${n.scrollWidth}x${n.scrollHeight} en ${n.clientWidth}x${n.clientHeight} · «${n.textContent.trim().replace(/\s+/g, ' ').slice(0, 60)}»`)
  })
  console.log(over.length ? `  ⚠ ${over.length} textos no caben:\n    ${over.join('\n    ')}` : '  ✓ todos los textos caben')
  await page.close()
}
await browser.close(); server.close()
