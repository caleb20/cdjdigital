/**
 * Genera la narración del video con VoiceStudio (API local compatible con OpenAI).
 *
 *   npm run narrate                 → genera todas las frases de narration-script.json
 *   npm run narrate -- --only f0,s1 → solo esas frases
 *   npm run narrate -- --seed 7     → otra toma de la misma voz
 *   npm run narrate -- --import     → no usa el servidor: toma los audios que ya dejaste en assets/audio/<clave>.wav
 *
 * Requiere el servidor de VoiceStudio en http://127.0.0.1:3900 con el motor VoxCPM2 instalado
 * (Apache-2.0; la ficha del modelo pide indicar que la voz es generada por IA).
 * Escribe assets/audio/<frase>.wav y narration.json (duraciones), que index.html y render.mjs usan.
 */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 ? args[i + 1] : fallback
}
const BASE = process.env.VOICESTUDIO_URL ?? 'http://127.0.0.1:3900'
const MODEL = opt('model', 'voxcpm2')
const SEED = Number(opt('seed', 42))
const only = opt('only', '')?.split(',').filter(Boolean)

const script = JSON.parse(fs.readFileSync(path.join(root, 'narration-script.json'), 'utf8'))
const outDir = path.join(root, 'assets', 'audio')
fs.mkdirSync(outDir, { recursive: true })
const jsonPath = path.join(root, 'narration.json')
const previous = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : { lines: {} }

const duration = (file) => {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' })
  return Number(r.stdout.trim())
}

// fetch() de Node corta a los 5 min sin respuesta; la primera síntesis puede tardar más (descarga los pesos).
const postJson = (url, payload) =>
  new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, timeout: 0 }, (res) => {
      const chunks = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => resolve({ ok: res.statusCode < 300, status: res.statusCode, body: Buffer.concat(chunks) }))
    })
    req.setTimeout(0)
    req.on('error', reject)
    req.end(JSON.stringify(payload))
  })

// Modo manual: las frases se grabaron a mano (por ejemplo en la app de VoiceStudio), sin pasar por el servidor.
// Basta con dejar assets/audio/<clave>.wav (o .mp3/.m4a/.flac/.ogg); aquí solo se miden las duraciones.
if (args.includes('--import')) {
  const found = {}
  const missing = []
  for (const [key, line] of Object.entries(script.lines)) {
    const ext = ['wav', 'mp3', 'm4a', 'flac', 'ogg'].find((e) => fs.existsSync(path.join(outDir, `${key}.${e}`)))
    if (!ext) { missing.push(key); continue }
    const dur = +duration(path.join(outDir, `${key}.${ext}`)).toFixed(2)
    found[key] = { file: `assets/audio/${key}.${ext}`, dur, text: line.text }
    console.log(`  ${key.padEnd(4)} ${String(dur).padStart(5)} s  ${line.text.slice(0, 60)}`)
  }
  if (missing.length) console.log(`\nFaltan ${missing.length} frases (se verán sin narración): ${missing.join(', ')}`)
  fs.writeFileSync(jsonPath, JSON.stringify({ model: 'manual', voice: script.voice.design, lines: found }, null, 2) + '\n')
  console.log(`\nListo: ${jsonPath} (${Object.keys(found).length} de ${Object.keys(script.lines).length} frases)`)
  process.exit(0)
}

const health = await fetch(`${BASE}/health`).then((r) => r.json()).catch(() => null)
if (!health) throw new Error(`No hay servidor de VoiceStudio en ${BASE}. Arráncalo primero.`)
console.log(`VoiceStudio ${health.version} · ${health.device} · motor ${MODEL} · semilla ${SEED}`)

// Explorar voces: N tomas de la frase ancla generadas solo con la descripción. Cada semilla da una voz distinta;
// se escuchan, se elige la mejor y se copia a assets/voice/anchor.wav (luego: npm run narrate -- --new-profile).
const nCandidates = Number(opt('candidates', 0))
if (nCandidates) {
  const dir = path.join(root, 'assets', 'voice', 'candidates')
  fs.mkdirSync(dir, { recursive: true })
  const text = script.voice.anchor?.text ?? script.lines.s1.tts
  for (let seed = 1; seed <= nCandidates; seed++) {
    const res = await postJson(`${BASE}/v1/audio/speech`, {
      model: MODEL, input: text, voice: 'default', description: script.voice.design,
      language: script.voice.language, response_format: 'wav', seed,
    })
    if (!res.ok) throw new Error(`Toma ${seed} falló (${res.status}): ${res.body.toString('utf8').slice(0, 300)}`)
    const file = path.join(dir, `toma-${seed}.wav`)
    fs.writeFileSync(file, res.body)
    console.log(`  toma-${seed}.wav  ${duration(file).toFixed(1)} s`)
  }
  console.log(`\nTomas en ${dir}\nEscúchalas, copia la mejor a assets/voice/anchor.wav y ejecuta: npm run narrate -- --new-profile`)
  process.exit(0)
}

// Una sola voz para todo el video. Con solo una descripción, VoxCPM2 sortea una voz distinta en cada frase
// (similitud entre frases ≈ 0.2 de 1.0), así que se fija un clip de referencia ("voz ancla") como perfil
// y todas las frases se sintetizan con ese perfil.
async function ensureProfile() {
  const anchor = script.voice.anchor
  if (!anchor) return null
  if (previous.profile_id && !args.includes('--new-profile')) {
    const r = await fetch(`${BASE}/profiles/${previous.profile_id}`).catch(() => null)
    if (r?.ok) return previous.profile_id
  }
  const form = new FormData()
  form.set('name', script.voice.profile_name ?? 'Narración')
  form.set('kind', 'clone')
  form.set('language', script.voice.language)
  form.set('ref_text', anchor.text)
  form.set('seed', String(SEED))
  form.set('ref_audio', new Blob([fs.readFileSync(path.join(root, anchor.file))], { type: 'audio/wav' }), path.basename(anchor.file))
  const r = await fetch(`${BASE}/profiles`, { method: 'POST', body: form })
  const body = await r.text()
  if (!r.ok) throw new Error(`No se pudo crear el perfil de voz (${r.status}): ${body.slice(0, 400)}`)
  const j = JSON.parse(body)
  const id = j.id ?? j.profile_id ?? j.profile?.id
  if (!id) throw new Error(`Respuesta inesperada al crear el perfil: ${body.slice(0, 400)}`)
  console.log(`Perfil de voz creado: ${id}`)
  return id
}
const profileId = await ensureProfile()
console.log(profileId ? `Voz única: perfil ${profileId} (ancla ${script.voice.anchor.file})` : 'Sin voz ancla: cada frase puede sonar distinta')

const lines = { ...previous.lines }
for (const [key, line] of Object.entries(script.lines)) {
  if (only?.length && !only.includes(key)) continue
  const started = Date.now()
  const res = await postJson(`${BASE}/v1/audio/speech`, {
    model: MODEL,
    input: line.tts,
    voice: profileId ?? 'default',
    ...(profileId ? {} : { description: script.voice.design }),
    language: script.voice.language,
    response_format: 'wav',
    seed: SEED,
  })
  if (!res.ok) throw new Error(`"${key}" falló (${res.status}): ${res.body.toString('utf8').slice(0, 300)}`)
  const file = path.join(outDir, `${key}.wav`)
  fs.writeFileSync(file, res.body)
  const dur = +duration(file).toFixed(2)
  lines[key] = { file: `assets/audio/${key}.wav`, dur, text: line.text }
  console.log(`  ${key.padEnd(4)} ${String(dur).padStart(5)} s  (${((Date.now() - started) / 1000).toFixed(1)} s de síntesis)  ${line.text.slice(0, 60)}`)
}

fs.writeFileSync(jsonPath, JSON.stringify({ model: MODEL, seed: SEED, voice: script.voice.design, profile_id: profileId, lines }, null, 2) + '\n')
console.log(`\nListo: ${jsonPath}`)
