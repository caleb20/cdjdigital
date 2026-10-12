/**
 * Banda sonora sintetizada (sin muestras ni bibliotecas): música de fondo tipo café + efectos sincronizados.
 *
 *   node kopa/sound.mjs --cues cues.json --duration 95.4 --out soundtrack.wav
 *
 * `cues.json` lo escribe render.mjs con lo que registra la animación:
 *   { type: 'sfx',   name, at, gain?, note?, pan?, dur? }   → efecto en el segundo exacto de la animación
 *   { type: 'scene', name, at }                              → cambio de escena (la música cambia de sección)
 *
 * Todo está en Fa mayor: los efectos con altura (pop, chime, success) usan la pentatónica de Fa,
 * así suenan "dentro" de la música. Determinista: misma entrada → mismo audio (generador pseudoaleatorio con semilla).
 */
import fs from 'node:fs'

const args = process.argv.slice(2)
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d }
const SR = 48000
const DUR = Number(opt('duration', 30))
const cues = opt('cues') ? JSON.parse(fs.readFileSync(opt('cues'), 'utf8')) : []
const OUT = opt('out', 'soundtrack.wav')
const N = Math.ceil((DUR + 2) * SR)

// ------------------------------------------------------------------ utilidades
let seed = 1234567
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
const TAU = Math.PI * 2
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12)
const NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
const nm = (s) => { const m = s.match(/^([A-G][b#]?)(-?\d)$/); return 12 * (Number(m[2]) + 1) + NOTE[m[1]] }

function bus() { return { L: new Float32Array(N), R: new Float32Array(N) } }
const music = bus(), sfx = bus(), send = bus()

function addMono(b, start, data, gain = 1, pan = 0, sendAmt = 0) {
  const i0 = Math.round(start * SR)
  const gl = gain * Math.cos((pan + 1) * Math.PI / 4), gr = gain * Math.sin((pan + 1) * Math.PI / 4)
  for (let k = 0; k < data.length; k++) {
    const i = i0 + k
    if (i < 0 || i >= N) continue
    const v = data[k]
    b.L[i] += v * gl; b.R[i] += v * gr
    if (sendAmt) { send.L[i] += v * gl * sendAmt; send.R[i] += v * gr * sendAmt }
  }
}

// Biquad RBJ (paso banda / paso bajo / paso alto) con coeficientes por bloque (para barridos)
function biquad(type, f, q) {
  const w = TAU * Math.min(f, SR * 0.45) / SR, cs = Math.cos(w), sn = Math.sin(w), a = sn / (2 * q)
  let b0, b1, b2, a0, a1, a2
  if (type === 'bp') { b0 = a; b1 = 0; b2 = -a; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a }
  else if (type === 'lp') { b0 = (1 - cs) / 2; b1 = 1 - cs; b2 = (1 - cs) / 2; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a }
  else { b0 = (1 + cs) / 2; b1 = -(1 + cs); b2 = (1 + cs) / 2; a0 = 1 + a; a1 = -2 * cs; a2 = 1 - a }
  return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0]
}
function filterSweep(x, type, f0, f1, q, curve = 'exp') {
  const y = new Float32Array(x.length)
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0, c = biquad(type, f0, q)
  for (let i = 0; i < x.length; i++) {
    if (i % 64 === 0) {
      const p = i / x.length
      const f = curve === 'exp' ? f0 * Math.pow(f1 / f0, p) : f0 + (f1 - f0) * p
      c = biquad(type, f, q)
    }
    const v = c[0] * x[i] + c[1] * x1 + c[2] * x2 - c[3] * y1 - c[4] * y2
    x2 = x1; x1 = x[i]; y2 = y1; y1 = v; y[i] = v
  }
  return y
}
const noise = (n) => { const a = new Float32Array(n); for (let i = 0; i < n; i++) a[i] = rnd() * 2 - 1; return a }
const lin = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)))

// ------------------------------------------------------------------ efectos
const PENTA = ['F5', 'G5', 'A5', 'C6', 'D6', 'F6', 'G6', 'A6', 'C7'].map(nm)

const FX = {
  // barrido de aire para cambios de escena y movimientos de cámara
  whoosh({ dur = 1.0, dir = 1 }) {
    const n = Math.round(dur * SR), x = noise(n)
    const y = filterSweep(x, 'bp', 260, 2600, 0.9)
    for (let i = 0; i < n; i++) { const t = i / n; y[i] *= Math.pow(Math.sin(Math.PI * Math.pow(t, 0.8)), 2) * 0.55 }
    return { data: y, pan: 0.5 * dir, send: 0.35, sweepPan: dir }
  },
  // trazo corto (conectores que se dibujan)
  swish({ dur = 0.5 }) {
    const n = Math.round(dur * SR), x = noise(n)
    const y = filterSweep(x, 'bp', 1400, 5200, 1.1)
    for (let i = 0; i < n; i++) { const t = i / n; y[i] *= Math.pow(Math.sin(Math.PI * t), 1.6) * 0.55 }
    return { data: y, send: 0.2 }
  },
  // aparición de una tarjeta: burbuja suave con caída de tono (afinada en Fa)
  pop({ note = 0 }) {
    const f = midi(PENTA[Math.max(0, Math.min(PENTA.length - 1, note))] - 12)
    const n = Math.round(0.22 * SR), y = new Float32Array(n)
    let ph = 0
    for (let i = 0; i < n; i++) {
      const t = i / SR
      const fr = f * (1 + 0.9 * Math.exp(-t / 0.012))
      ph += TAU * fr / SR
      const a = Math.min(1, t / 0.002) * Math.exp(-t / 0.055)
      y[i] = Math.sin(ph) * a * 0.8 + Math.sin(2 * ph) * a * 0.12
    }
    const c = noise(150); for (let i = 0; i < 150; i++) y[i] += c[i] * (1 - i / 150) * 0.12
    return { data: y, send: 0.12 }
  },
  // clic muy suave (palabras, viñetas)
  tick() {
    const n = Math.round(0.03 * SR), x = noise(n)
    const y = filterSweep(x, 'bp', 3800, 3800, 3)
    for (let i = 0; i < n; i++) y[i] *= Math.exp(-i / SR / 0.006) * 1.6
    return { data: y }
  },
  // toque de madera (decisión, botón pulsado)
  tap() {
    const n = Math.round(0.12 * SR), y = new Float32Array(n)
    for (let i = 0; i < n; i++) { const t = i / SR; y[i] = (Math.sin(TAU * 1180 * t) + 0.35 * Math.sin(TAU * 2350 * t)) * Math.exp(-t / 0.018) * 0.7 }
    const c = noise(240); for (let i = 0; i < 240; i++) y[i] += c[i] * Math.exp(-i / 50) * 0.3
    return { data: y, send: 0.15 }
  },
  // campana FM (hitos: "Paso N", "Hoy"), afinada en la pentatónica
  chime({ note = 2, len = 2.2 }) {
    const f = midi(PENTA[Math.max(0, Math.min(PENTA.length - 1, note))])
    const n = Math.round(len * SR), y = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const t = i / SR, I = 2.2 * Math.exp(-t / 0.35)
      y[i] = Math.sin(TAU * f * t + I * Math.sin(TAU * f * 3.5 * t)) * Math.min(1, t / 0.003) * Math.exp(-t / 0.55) * 0.55
    }
    return { data: y, send: 0.45 }
  },
  // "mensaje enviado" (burbuja de WhatsApp)
  send() {
    const n = Math.round(0.32 * SR), y = new Float32Array(n)
    let ph = 0
    for (let i = 0; i < n; i++) {
      const t = i / SR
      const f = t < 0.11 ? 560 * Math.pow(1250 / 560, t / 0.11) : 0
      ph += TAU * f / SR
      const a1 = t < 0.13 ? Math.sin(Math.PI * t / 0.13) : 0
      const t2 = t - 0.12, a2 = t2 > 0 ? Math.exp(-t2 / 0.05) * Math.min(1, t2 / 0.003) : 0
      y[i] = Math.sin(ph) * a1 * 0.5 + Math.sin(TAU * 1568 * t) * a2 * 0.45
    }
    return { data: y, send: 0.25 }
  },
  // éxito: arpegio de campanas Fa–La–Do–Fa
  success() {
    const notes = ['F5', 'A5', 'C6', 'F6'].map(nm), n = Math.round(2.6 * SR), y = new Float32Array(n)
    notes.forEach((m, k) => {
      const f = midi(m), off = Math.round(k * 0.09 * SR)
      for (let i = 0; i + off < n; i++) {
        const t = i / SR, I = 1.8 * Math.exp(-t / 0.3)
        y[i + off] += Math.sin(TAU * f * t + I * Math.sin(TAU * f * 2 * t)) * Math.min(1, t / 0.003) * Math.exp(-t / 0.7) * 0.32
      }
    })
    return { data: y, send: 0.5 }
  },
  // aviso de pedido nuevo (ding-dong)
  notify() {
    const n = Math.round(1.8 * SR), y = new Float32Array(n)
    ;[['A6', 0], ['F6', 0.16]].forEach(([s, d]) => {
      const f = midi(nm(s)), off = Math.round(d * SR)
      for (let i = 0; i + off < n; i++) { const t = i / SR; y[i + off] += Math.sin(TAU * f * t + 1.2 * Math.exp(-t / 0.2) * Math.sin(TAU * f * 2.01 * t)) * Math.min(1, t / 0.002) * Math.exp(-t / 0.45) * 0.42 }
    })
    return { data: y, send: 0.4 }
  },
  // lápiz escribiendo (letra manuscrita)
  pencil({ dur = 1.2 }) {
    const n = Math.round(dur * SR), x = noise(n)
    const y = filterSweep(x, 'bp', 2600, 3400, 1.4, 'lin')
    let t = 0, env = new Float32Array(n)
    while (t < dur) {
      const len = 0.05 + rnd() * 0.09, s = Math.round(t * SR), e = Math.min(n, Math.round((t + len) * SR))
      for (let i = s; i < e; i++) env[i] = Math.sin(Math.PI * (i - s) / (e - s)) * (0.6 + rnd() * 0.4)
      t += len + rnd() * 0.04
    }
    for (let i = 0; i < n; i++) y[i] *= env[i] * 0.5
    return { data: y }
  },
}

// ------------------------------------------------------------------ música
const BPM = 84, BEAT = 60 / BPM, BAR = BEAT * 4
// Fa mayor, acordes con novenas: Fmaj9 – Dm9 – Bbmaj9 – C9sus4 (2 compases cada uno)
const CHORDS = [
  { root: 'F2', notes: ['A3', 'C4', 'E4', 'G4'] },
  { root: 'D2', notes: ['F3', 'A3', 'C4', 'E4'] },
  { root: 'Bb1', notes: ['A3', 'D4', 'F4', 'C5'] },
  { root: 'C2', notes: ['Bb3', 'D4', 'F4', 'G4'] },
].map((c) => ({ root: nm(c.root), notes: c.notes.map(nm) }))

function ep(f, len, vel) { // piano eléctrico (FM 1:1 con "ladrido" de campana en el ataque)
  const n = Math.round(len * SR), y = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const t = i / SR, I = 1.4 * Math.exp(-t / 0.4) + 0.3
    const tine = 0.12 * Math.exp(-t / 0.04) * Math.sin(TAU * f * 14 * t)
    const a = Math.min(1, t / 0.004) * Math.exp(-t / 1.6) * Math.min(1, (len - t) / 0.08)
    y[i] = (Math.sin(TAU * f * t + I * Math.sin(TAU * f * t)) + tine) * a * vel
  }
  return y
}
function pad(f, len) { // colchón cálido: sierras desafinadas filtradas, ataque lento
  const n = Math.round(len * SR), raw = new Float32Array(n)
  const det = [0.995, 1, 1.005]
  for (const d of det) { let ph = rnd(); const inc = f * d / SR; for (let i = 0; i < n; i++) { ph += inc; ph -= Math.floor(ph); raw[i] += (2 * ph - 1) / 3 } }
  const y = filterSweep(raw, 'lp', 700, 900, 0.7, 'lin')
  for (let i = 0; i < n; i++) { const t = i / SR; y[i] *= Math.min(1, t / 1.2) * Math.min(1, (len - t) / 1.4) * 0.35 }
  return y
}
function bassNote(f, len) {
  const n = Math.round(len * SR), y = new Float32Array(n)
  for (let i = 0; i < n; i++) { const t = i / SR; y[i] = (Math.sin(TAU * f * t) + 0.25 * Math.sin(TAU * 2 * f * t)) * Math.min(1, t / 0.01) * Math.exp(-t / 1.2) * Math.min(1, (len - t) / 0.06) }
  return y
}
function kick() {
  const n = Math.round(0.35 * SR), y = new Float32Array(n); let ph = 0
  for (let i = 0; i < n; i++) { const t = i / SR, f = 46 + 70 * Math.exp(-t / 0.03); ph += TAU * f / SR; y[i] = Math.sin(ph) * Math.exp(-t / 0.16) }
  return y
}
function hat(len = 0.05) {
  const n = Math.round(len * SR), y = filterSweep(noise(n), 'hp', 7000, 7000, 0.7)
  for (let i = 0; i < n; i++) y[i] *= Math.exp(-i / SR / (len / 3))
  return y
}
function brush() {
  const n = Math.round(0.22 * SR), y = filterSweep(noise(n), 'bp', 1800, 1500, 0.6, 'lin')
  for (let i = 0; i < n; i++) { const t = i / SR; y[i] *= Math.min(1, t / 0.01) * Math.exp(-t / 0.07) }
  return y
}

// Secciones según las escenas: intro y cierre sin batería; el resto con groove suave
const scenes = cues.filter((c) => c.type === 'scene').sort((a, b) => a.at - b.at)
function sectionAt(t) {
  let s = scenes[0]?.name ?? 'intro'
  for (const c of scenes) if (c.at <= t + 0.01) s = c.name
  return s
}
const QUIET = new Set(['intro', 'outro'])
const LIGHT = new Set(['cases', 'special'])

const KICK = kick(), HAT = hat(), HAT_OPEN = hat(0.18), BRUSH = brush()
const musicEnd = DUR - 0.2
for (let bar = 0; bar * BAR < musicEnd; bar++) {
  const t0 = bar * BAR
  const chord = CHORDS[Math.floor(bar / 2) % CHORDS.length]
  const sec = sectionAt(t0 + 0.1)
  const quiet = QUIET.has(sec), light = LIGHT.has(sec)
  const last = (bar + 1) * BAR >= musicEnd
  // colchón cada 2 compases
  if (bar % 2 === 0) for (const m of chord.notes) addMono(music, t0, pad(midi(m), Math.min(BAR * 2 + 0.6, musicEnd - t0 + 0.2)), 0.16, (m % 2 ? -0.3 : 0.3), 0.5)
  // piano eléctrico: acorde en el 1, recuerdo suave en el "y" del 2, y una nota suelta al final del compás
  const vel = quiet ? 0.11 : 0.15
  chord.notes.forEach((m, k) => addMono(music, t0 + k * 0.012 + (rnd() - 0.5) * 0.01, ep(midi(m), BEAT * 2.6, vel * (0.9 + rnd() * 0.2)), 1, (k - 1.5) * 0.25, 0.35))
  if (!quiet) chord.notes.slice(1).forEach((m, k) => addMono(music, t0 + BEAT * 1.5 + k * 0.01, ep(midi(m), BEAT * 1.4, vel * 0.55), 1, (k - 1) * 0.3, 0.35))
  if (!last && rnd() < 0.7) { const m = chord.notes[Math.floor(rnd() * chord.notes.length)] + 12; addMono(music, t0 + BEAT * 3.5, ep(midi(m), BEAT * 1.2, vel * 0.45), 1, 0.35, 0.5) }
  // bajo
  if (!quiet) { addMono(music, t0, bassNote(midi(chord.root), BEAT * 2.4), 0.15, 0); addMono(music, t0 + BEAT * 2.5, bassNote(midi(chord.root + 7), BEAT * 1.3), 0.10, 0) }
  // batería suave (nada en intro/cierre; en casos de uso solo platillos)
  if (!quiet) {
    for (let b = 0; b < 4; b++) {
      const tb = t0 + b * BEAT
      if (!light && (b === 0 || b === 2)) addMono(music, tb, KICK, 0.20, 0)
      if (b === 1 || b === 3) addMono(music, tb, BRUSH, light ? 0.06 : 0.09, 0.1, 0.2)
      addMono(music, tb + BEAT / 2 + 0.012, (b === 3 && bar % 2 === 1) ? HAT_OPEN : HAT, 0.05 + rnd() * 0.02, 0.35)
      addMono(music, tb, HAT, 0.025, -0.3)
    }
  }
}
// acorde final del cierre, largo
addMono(music, Math.max(0, musicEnd - 4.5), pad(midi(nm('F3')), 4.6), 0.12, -0.2, 0.6)
CHORDS[0].notes.forEach((m, k) => addMono(music, Math.max(0, musicEnd - 4.4) + k * 0.03, ep(midi(m), 4.2, 0.12), 1, (k - 1.5) * 0.25, 0.6))

// ------------------------------------------------------------------ efectos en sus segundos
const fxCues = cues.filter((c) => c.type === 'sfx')
for (const c of fxCues) {
  const make = FX[c.name]
  if (!make) { console.warn('efecto desconocido:', c.name); continue }
  const r = make(c)
  const gain = (c.gain ?? 1) * 0.9
  if (r.sweepPan) {
    // paneo que acompaña el movimiento (izquierda → derecha o al revés)
    const i0 = Math.round(c.at * SR)
    for (let k = 0; k < r.data.length; k++) {
      const i = i0 + k; if (i < 0 || i >= N) continue
      const p = (-1 + 2 * (k / r.data.length)) * 0.7 * r.sweepPan, v = r.data[k] * gain
      const l = v * Math.cos((p + 1) * Math.PI / 4), rr = v * Math.sin((p + 1) * Math.PI / 4)
      sfx.L[i] += l; sfx.R[i] += rr; send.L[i] += l * r.send; send.R[i] += rr * r.send
    }
  } else addMono(sfx, c.at, r.data, gain, c.pan ?? r.pan ?? 0, r.send ?? 0)
}

// ------------------------------------------------------------------ reverberación (Freeverb simplificado)
function reverb(x, spread) {
  const k = SR / 44100
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * k)), i: 0, f: 0 }))
  const aps = [556, 441, 341, 225].map((d) => ({ buf: new Float32Array(Math.round((d + spread) * k)), i: 0 }))
  const fb = 0.86, damp = 0.25, y = new Float32Array(x.length)
  for (let n = 0; n < x.length; n++) {
    let out = 0; const inp = x[n] * 0.015
    for (const c of combs) { const v = c.buf[c.i]; c.f = v * (1 - damp) + c.f * damp; c.buf[c.i] = inp + c.f * fb; c.i = (c.i + 1) % c.buf.length; out += v }
    for (const a of aps) { const v = a.buf[a.i]; a.buf[a.i] = out + v * 0.5; a.i = (a.i + 1) % a.buf.length; out = v - out }
    y[n] = out
  }
  return y
}
const wetL = reverb(send.L, 0), wetR = reverb(send.R, 23)

// ------------------------------------------------------------------ mezcla y exportación
const MUSIC = 0.55, SFXG = 0.9, WET = 1.0
const L = new Float32Array(N), R = new Float32Array(N)
// paso alto a 32 Hz en la música: los graves que un parlante de laptop no reproduce solo restan volumen
const hpL = filterSweep(music.L, 'hp', 32, 32, 0.7), hpR = filterSweep(music.R, 'hp', 32, 32, 0.7)
music.L.set(hpL); music.R.set(hpR)
const fadeIn = 1.5 * SR, fadeOut = 2.5 * SR, endS = Math.round(DUR * SR)
for (let i = 0; i < N; i++) {
  const fm = Math.min(1, i / fadeIn) * Math.min(1, Math.max(0, (endS - i) / fadeOut))
  L[i] = Math.tanh((music.L[i] * MUSIC * fm + sfx.L[i] * SFXG + wetL[i] * WET) * 1.1)
  R[i] = Math.tanh((music.R[i] * MUSIC * fm + sfx.R[i] * SFXG + wetR[i] * WET) * 1.1)
}
let peak = 0; for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]))
const norm = peak > 0 ? 0.891 / peak : 1 // pico a −1 dBFS
const len = endS
const wav = Buffer.alloc(44 + len * 4)
wav.write('RIFF', 0); wav.writeUInt32LE(36 + len * 4, 4); wav.write('WAVE', 8); wav.write('fmt ', 12)
wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22); wav.writeUInt32LE(SR, 24)
wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(len * 4, 40)
for (let i = 0; i < len; i++) {
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * norm)) * 32767), 44 + i * 4)
  wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * norm)) * 32767), 46 + i * 4)
}
fs.writeFileSync(OUT, wav)
console.log(`Banda sonora: ${OUT} · ${DUR.toFixed(1)} s · ${fxCues.length} efectos · ${scenes.length} secciones · pico normalizado (×${norm.toFixed(2)})`)
