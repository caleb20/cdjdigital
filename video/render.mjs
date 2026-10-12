/**
 * Renderiza video/index.html a MP4.
 *
 *   npm run render                          → casos-de-uso-cdj.mp4 (1920x1080, 30 fps)
 *   npm run render -- --fps 60              → más fluido (el doble de fotogramas)
 *   npm run render -- --still 6,18.5,40     → solo imágenes PNG de esos segundos (carpeta stills/)
 *
 *   Otras animaciones con banda sonora sintetizada (videos de Kopa Caffe):
 *   node render.mjs --page "kopa/index.html?plan=pro" --soundtrack kopa/sound.mjs --out kopa/out/kopa-pro.mp4
 *   --keep-silent guarda también el video mudo; --mux-only lo reutiliza y solo rehace el audio.
 *
 * Usa el Chrome o Edge ya instalado (variable CHROME_PATH para indicar otro) y ffmpeg del PATH.
 * La animación expone window.__seek(t): se posiciona en el segundo t y se captura, así que el
 * resultado es exacto y no depende de la velocidad del equipo.
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : fallback
}
const fps = Number(opt('fps', 30))
const finalOut = path.resolve(root, opt('out', 'casos-de-uso-cdj.mp4'))
const stills = opt('still', '')
const pagePath = opt('page', 'index.html')
const soundtrack = opt('soundtrack', '')
const muxOnly = args.includes('--mux-only')
let out = finalOut // con narración, el video sin audio va a un temporal y luego se mezcla

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].find((p) => p && fs.existsSync(p))
if (!CHROME) throw new Error('No encontré Chrome ni Edge. Define CHROME_PATH con la ruta del ejecutable.')

const MIME = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.js': 'text/javascript' }
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'))
  if (!file.startsWith(root) || !fs.existsSync(file)) return void res.writeHead(404).end()
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const url = `http://127.0.0.1:${server.address().port}/${pagePath}${pagePath.includes('?') ? '&' : '?'}render`

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--force-device-scale-factor=1', '--hide-scrollbars', '--font-render-hinting=none', '--disable-lcd-text'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'load' })
await page.waitForFunction('window.__ready === true', { timeout: 30000 })
const duration = await page.evaluate('window.__duration')
const allCues = await page.evaluate('window.__cues') // marcas de audio que registra la animación
const cues = allCues.filter((c) => c.file) // frases de narración (archivos) y el segundo en que suena cada una
const synthCues = allCues.filter((c) => !c.file) // efectos y secciones para la banda sonora sintetizada

const run = (cmd, a) => new Promise((resolve, reject) => {
  const p = spawn(cmd, a, { stdio: 'inherit' })
  p.on('error', reject)
  p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} terminó con código ${code}`))))
})

const capture = async (t) => {
  await page.evaluate(async (time) => {
    window.__seek(time)
    await new Promise((r) => requestAnimationFrame(() => r()))
  }, t)
  return page.screenshot({ type: 'png', optimizeForSpeed: true })
}

try {
  if (stills) {
    const dir = path.join(root, opt('stills-dir', 'stills'))
    fs.mkdirSync(dir, { recursive: true })
    for (const s of stills.split(',').map(Number)) {
      const file = path.join(dir, `t${String(s).replace('.', '_')}.png`)
      fs.writeFileSync(file, await capture(s))
      console.log('→', file)
    }
  } else {
    if (cues.length || soundtrack) out = finalOut.replace(/\.mp4$/, '.silent.mp4')
    fs.mkdirSync(path.dirname(finalOut), { recursive: true })
    if (muxOnly && !fs.existsSync(out)) throw new Error(`--mux-only necesita el video mudo ${out} (renderiza antes con --keep-silent)`)
    const total = Math.round(duration * fps)
    console.log(`Duración ${duration.toFixed(1)} s · ${total} fotogramas a ${fps} fps → ${out}${muxOnly ? ' (reutilizado: solo audio)' : ''}`)
    if (!muxOnly) {
    const ff = spawn(
      'ffmpeg',
      [
        '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
        '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '16',
        '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
        '-movflags', '+faststart', out,
      ],
      { stdio: ['pipe', 'inherit', 'inherit'] },
    )
    const done = new Promise((resolve, reject) => {
      ff.on('error', reject)
      ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg terminó con código ${code}`))))
    })
    const started = Date.now()
    for (let i = 0; i < total; i++) {
      const png = await capture(i / fps)
      if (!ff.stdin.write(png)) await new Promise((r) => ff.stdin.once('drain', r))
      if (i % 60 === 0) {
        const eta = ((Date.now() - started) / (i + 1)) * (total - i) / 1000
        process.stdout.write(`\r  fotograma ${i}/${total} (~${Math.round(eta)} s restantes)   `)
      }
    }
    ff.stdin.end()
    await done
    }
    if (soundtrack) {
      // Banda sonora sintetizada con las marcas de la animación, nivelada a −16 LUFS y añadida sin recodificar la imagen
      const cuesFile = finalOut.replace(/\.mp4$/, '.cues.json')
      const wavFile = finalOut.replace(/\.mp4$/, '.soundtrack.wav')
      fs.writeFileSync(cuesFile, JSON.stringify(synthCues))
      await run('node', [path.resolve(root, soundtrack), '--cues', cuesFile, '--duration', String(duration), '--out', wavFile])
      await run('ffmpeg', [
        '-y', '-loglevel', 'error', '-i', out, '-i', wavFile, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
        '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k',
        '-t', String(duration), '-movflags', '+faststart', finalOut,
      ])
      fs.rmSync(cuesFile)
      if (!args.includes('--keep-wav')) fs.rmSync(wavFile)
      if (!args.includes('--keep-silent') && !muxOnly) fs.rmSync(out)
      out = finalOut
    } else if (cues.length) {
      // Mezcla de la narración: cada frase se retrasa hasta su segundo, se normaliza el volumen
      // y se añade al video sin recodificarlo.
      const inputs = cues.flatMap((c) => ['-i', path.resolve(root, c.file)])
      const delays = cues.map(
        (c, i) => `[${i + 1}:a]aresample=48000,aformat=channel_layouts=mono,adelay=${Math.round(c.at * 1000)}:all=1[a${i}]`,
      )
      const mix = `${cues.map((_, i) => `[a${i}]`).join('')}amix=inputs=${cues.length}:normalize=0:duration=longest,apad,loudnorm=I=-16:TP=-1.5:LRA=11[aout]`
      await new Promise((resolve, reject) => {
        const mux = spawn(
          'ffmpeg',
          [
            '-y', '-loglevel', 'error', '-i', out, ...inputs,
            '-filter_complex', [...delays, mix].join(';'),
            '-map', '0:v', '-map', '[aout]', '-c:v', 'copy', '-c:a', 'aac', '-ar', '48000', '-b:a', '192k',
            '-t', String(duration), '-movflags', '+faststart', finalOut,
          ],
          { stdio: 'inherit' },
        )
        mux.on('error', reject)
        mux.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg (audio) terminó con código ${code}`))))
      })
      fs.rmSync(out)
      out = finalOut
    }
    console.log(`\nListo: ${out} (${(fs.statSync(out).size / 1048576).toFixed(1)} MB)${soundtrack ? ` con banda sonora (${synthCues.filter((c) => c.type === 'sfx').length} efectos)` : cues.length ? ` con ${cues.length} frases de narración` : ''}`)
  }
} finally {
  await browser.close()
  server.close()
}
