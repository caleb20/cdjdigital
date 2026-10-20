# Video de casos de uso · CDJ Digital

Animación HTML (1920×1080, ~70 s) que recorre el flujo principal «Del interés al WhatsApp», los 10 casos de
uso, los recorridos secundarios y la versión celular. Usa las capturas reales del documento
`public/casos-de-uso.html` (copiadas en `assets/`).

Todo se anima con la Web Animations API sobre una sola línea de tiempo: `window.__seek(t)` posiciona la
animación en el segundo `t`. Por eso el render es exacto, fotograma a fotograma, sin depender de la
velocidad del equipo.

## Ver la animación

```bash
cd video
npm install
npm run preview   # http://127.0.0.1:5188/  (Espacio: pausa · ← →: ±2 s · R: reiniciar)
```

## Generar el MP4

Necesita Chrome o Edge instalado (o la variable `CHROME_PATH`) y `ffmpeg` en el PATH.

```bash
npm run render                       # casos-de-uso-cdj.mp4, 30 fps
npm run render -- --fps 60           # más fluido
npm run render -- --still 6,18.5,40  # solo imágenes PNG de esos segundos (carpeta stills/)
```

## Narración (voz generada con IA)

La voz se genera en local con [VoiceStudio](https://github.com/debpalash/VoiceStudio) y el motor **VoxCPM2**
(Apache-2.0, español; su ficha pide indicar que la voz es generada por IA, por eso el cierre del video lo dice).
No se usa el motor por defecto (OmniVoice) porque sus pesos son CC-BY-NC, no comerciales. No se clona la voz de ninguna persona:
la voz se diseña con una descripción y una de sus tomas (`assets/voice/anchor.wav`) queda como **voz ancla**.

**Una sola voz:** con solo una descripción, VoxCPM2 sortea una voz distinta en cada frase (parecido entre frases ≈ 0.2).
`narrate.mjs` crea un perfil a partir de la voz ancla y lo usa en todas las frases (parecido ≈ 0.84, medido con huella de hablante).
Para cambiar el timbre, sustituye `assets/voice/anchor.wav` (y su texto en `narration-script.json`) y ejecuta `npm run narrate -- --new-profile`.

1. Edita el guion en `narration-script.json` (`text` = lo que se lee, `tts` = lo que se envía al sintetizador).
2. Con la app de VoiceStudio abierta (su servidor escucha en `127.0.0.1:3900`) y VoxCPM2 instalado y seleccionado: `npm run narrate`
   (`-- --only f0,s1` regenera solo esas frases; `-- --seed 7` prueba otra toma).
3. `npm run render`: las escenas se alargan para que cada frase quepa y el audio se mezcla en el segundo exacto
   que registra la animación (`window.__cues`). Sin `narration.json` el video sale mudo y con los tiempos base.

## Dónde cambiar cosas

Todo está en `index.html`:

- **Textos y tiempos**: cada escena es una función (`S1` … `S7`); `plan` al final define cuándo empieza cada una.
- **Identidad de movimiento**: constantes `E` (curvas) y duraciones al inicio del script. Entradas con frenado largo
  (0.9 s), salidas rápidas (0.55 s), cámara suave (≈1 s), y tres capas: nodos, conectores/luz viajera y fondo que respira.
- **Capturas**: `assets/shot-*.jpg` y `assets/phone-*.jpg`. Para otra marca (por ejemplo las webs de Kopa Caffe),
  cambia las capturas y los textos de cada escena.

# Videos de casos de uso · Kopa Caffe (`kopa/`)

Tres videos, uno por plan, sin narración: el texto se anima palabra por palabra y la banda sonora (música y
efectos) se sintetiza en código, sincronizada con cada animación.

| Plan | Web | Video |
| --- | --- | --- |
| Inicio (S/ 99) | kopa-caffe-inicio | `kopa/out/kopa-inicio-casos-de-uso.mp4` |
| Negocio (S/ 150) | kopa-caffe | `kopa/out/kopa-negocio-casos-de-uso.mp4` |
| Pro (S/ 249) | kopa-caffe-pro | `kopa/out/kopa-pro-casos-de-uso.mp4` |

```bash
node render.mjs --page "kopa/index.html?plan=pro" --soundtrack kopa/sound.mjs --out kopa/out/kopa-pro-casos-de-uso.mp4
node render.mjs --page "kopa/index.html?plan=pro" --still 30,60 --stills-dir kopa/stills   # fotogramas sueltos
node kopa/inspect.mjs            # escenas, duración, efectos y textos que no caben en su tarjeta, sin renderizar
```

Para ver la animación en el navegador: `npm run preview` y abre `/kopa/index.html?plan=inicio` (o `negocio`, `pro`).

- **Textos y escenas**: `kopa/plans.js`. Cada plan es una lista de escenas (`intro`, `why`, `actors`, `roles`, `flow`,
  `chains`, `phones`, `cases`, `special`, `roadmap`, `outro`). `roles` es la matriz de permisos: cada fila es una acción
  y cada celda `'y'` (✓), `'n'` (—) o un texto corto («Solo los que toma»); `focus` es la columna que se ilumina al final. `*palabra*` marca la palabra destacada del título. Las duraciones
  se calculan solas según la cantidad de texto.
- **Diseño y animación**: `kopa/index.html`, con la paleta, las tipografías (Playfair Display, Inter, Caveat) y las curvas de
  movimiento de la marca Kopa.
- **Capturas**: `kopa/assets/<plan>/` (capturas reales de cada web, las mismas de su `public/casos-de-uso.html`) y
  `kopa/assets/shared/` (logo, fotos del local, fuentes). En el Pro, `mr-*.jpg` son las pantallas del motorizado.
- **Sonido**: `kopa/sound.mjs`, sin dependencias. Cada animación registra su efecto en `window.__cues`: entra una tarjeta
  (pop afinado), escribe una palabra (tic), se pinta una etiqueta (brochazo) o cambia de escena (whoosh). La música
  (piano eléctrico, pad, bajo y percusión suave en Fa mayor, 84 BPM) se calma en la portada y el cierre. El render
  la nivela a −16 LUFS. Con `--keep-silent` se guarda el video mudo, y `--mux-only` rehace solo el audio sin volver
  a renderizar la imagen.
