# Guía: narrar cualquier video con VoiceStudio (manual)

Para hacer la narración **a mano en la app de VoiceStudio** y unirla a un video, sea cual sea. Los comandos de `ffmpeg` de esta guía están
probados. Los nombres de botones de la app salen de la documentación y de las capturas oficiales (versión 0.3.9; tu app es la 0.5.6 y puede
variar un poco): si algo se llama distinto, busca el equivalente.

## 0. Una vez: motor y licencia

- Instala el motor **VoxCPM2**: *Model Catalogue* → VoxCPM2 → instalar. Luego elígelo como motor de voz (*Settings → Engines*).
  La primera vez que generes audio descarga unos 4.5 GB de pesos (≈10 min).
- **No uses el motor por defecto (OmniVoice) para videos comerciales**: sus pesos son CC-BY-NC (no comerciales). VoxCPM2 y CosyVoice 3 son Apache-2.0.
- No clones la voz de una persona sin su permiso. Si publicas el video, indica que la voz es generada por IA (lo pide la ficha de VoxCPM2).

## 1. Preparar el texto

Escribe la narración **por tramos**, uno por escena o idea, de 10 a 25 segundos (unas 25–60 palabras). Un texto muy largo pierde naturalidad
y el motor limita a 4096 caracteres.

- Frases cortas, una idea cada una (8–20 palabras). La **puntuación son las pausas**: coma = pausa corta, punto = pausa larga.
- **Siglas como se dicen** («CDJ» → «ce de jota») y **números en palabras** («S/99» → «noventa y nueve soles»).
- No empieces un tramo con «Y» (se oyó como «Sí»). Evita listas con «quien… quien…» (suenan a pregunta).
- Pon el idioma en **Spanish/es**, no en *Auto*.

## 2. Elegir la mejor voz (lo que más pesa)

Una voz descrita solo con texto **cambia en cada generación**. Para tener una sola voz en todo el video:

1. Abre el espacio de voz (*Studio → Voice*). En **VOICE** elige **By design** (no *From audio*).
2. Describe la voz: *«Voz femenina adulta, cálida y segura, tono profesional pero cercano, ritmo pausado y claro, español latinoamericano neutro.»*
   También puedes partir de un preset y pulsar **Use this design**. El campo **Style** admite indicaciones de tono («cálido, pausado»).
3. Escribe una frase de prueba representativa (la de apertura sirve) y pulsa **Synthesize Audio**. Repite **8–10 veces**: cada toma trae su
   propia **seed** (se ve en el *History*), o usa **New seed**.
4. Escucha con auriculares y quédate con **una**: sin zumbido ni cortes, ritmo tranquilo, buena pronunciación, que inspire confianza.
5. **Guárdala** (*Save as voice profile* o añadir a *Voice Clones*) y a partir de ahí genera **siempre con ese perfil**; no vuelvas a escribir la descripción,
   porque saldría otra voz.

Si ya tienes una toma que te gusta, súbela como referencia (**From audio**) con su transcripción: así todo imita ese mismo timbre.

## 3. Generar y exportar

1. Con el perfil activo, pega un tramo en **SCRIPT** y pulsa **Synthesize Audio**.
2. Escúchalo en el *History* (panel derecho). Si algo falla (pronunciación, ritmo), cambia el texto o genera otra toma con el mismo perfil.
3. **Exporta** la que sirva desde el menú ⋮ de esa entrada del *History*. Si no encuentras la opción, los WAV quedan en
   `C:\Users\intel\AppData\Roaming\OmniVoice\outputs\` con nombres como `32cb6e18.wav` (ordénalos por hora).
4. Renómbralos **en orden de escena**: `01-intro.wav`, `02-flujo.wav`, `03-cierre.wav`…

## 4. Revisar antes de unir

- A oído: pronunciación de siglas, nombres y precios; que no suene apurado ni arrastrado; que no haya clics o ruidos al inicio o al final.
- **Una sola voz**: pon dos tramos seguidos y confirma que parece la misma persona (si no, no se generó con el perfil).
- Opcional, con medidas: `tools\check_narration.py` analiza cualquier carpeta de audios (niveles, qué se entiende y si es la misma voz).
  Necesita un Python con `faster-whisper`, `speechbrain` y `torchaudio` (`pip install faster-whisper speechbrain torchaudio`; Whisper usa la GPU
  y descarga su modelo la primera vez):

  ```bash
  python tools\check_narration.py --carpeta "C:\ruta\a\mis\wavs"
  ```

## 5. Unirla al video

Cada tramo trae casi medio segundo de silencio al inicio y al final; consérvalo como respiro o recórtalo (comando 1).

### Opción A: con un editor (CapCut, DaVinci Resolve, Clipchamp)

1. Importa el video y los WAV. Coloca cada tramo en su escena y deja que **la imagen siga a la voz**, no al revés (alarga o acorta la escena).
2. Añade fundidos de 50–100 ms al inicio y al final de cada audio para evitar clics.
3. Nivela la voz a **−16 LUFS** (video web/redes) o usa el normalizador del editor; que el pico no pase de −1 dB.
4. Si pones música, mantenla ~12 dB por debajo de la voz y baja su volumen mientras se habla (*ducking*).
5. Exporta **H.264 + AAC a 48 kHz**.

### Opción B: con `ffmpeg` (rápido y exacto)

1. Recortar el silencio sobrante de un tramo:

   ```bash
   ffmpeg -i frase.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse" frase_corte.wav
   ```

2. Unir varios tramos en una sola pista, con 0.5 s de pausa entre ellos (cambia `n=3` y añade `apad` por cada tramo extra):

   ```bash
   ffmpeg -i 01.wav -i 02.wav -i 03.wav -filter_complex "[0:a]apad=pad_dur=0.5[a0];[1:a]apad=pad_dur=0.5[a1];[a0][a1][2:a]concat=n=3:v=0:a=1[out]" -map "[out]" narracion.wav
   ```

3. Poner la pista al video (la imagen no se recodifica) y nivelar el volumen a −16 LUFS:

   ```bash
   ffmpeg -i video.mp4 -i narracion.wav -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -ar 48000 -b:a 192k -shortest salida.mp4
   ```

4. Si el audio dura más o menos que el video, acelera o frena la voz sin cambiar el tono (1.10 = 10 % más rápida; admite 0.5–2.0):

   ```bash
   ffmpeg -i narracion.wav -af atempo=1.10 narracion_ajustada.wav
   ```

5. Poner **un tramo en un segundo exacto** (por ejemplo, a los 12.5 s = 12500 ms):

   ```bash
   ffmpeg -i video.mp4 -i frase.wav -filter_complex "[1:a]adelay=12500:all=1[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -ar 48000 salida.mp4
   ```

Compruébalo: `ffprobe -v error -show_entries stream=codec_name,sample_rate -show_entries format=duration salida.mp4` debe mostrar `h264`, `aac`, `48000`.

---

# Automático para el video de casos de uso (`video/`)

Todo lo anterior se hace por comandos en este proyecto (la voz ancla vive en `assets/voice/anchor.wav`; la usé yo):

```bash
npm run narrate:candidates
```

genera 6 tomas para elegir la voz (`assets/voice/candidates/`); copia la mejor a `assets/voice/anchor.wav` y:

```bash
npm run narrate -- --new-profile
```

crea el perfil y genera todas las frases de `narration-script.json`. Si las grabas a mano en la app, déjalas como `assets/audio/<clave>.wav` y usa
`npm run narrate:import`. Luego `npm run render` alarga cada escena lo que dure su frase, pone cada audio en su segundo y nivela a −16 LUFS.
Los comandos de `narrate` hablan con el servidor de **tu app de VoiceStudio** (`http://127.0.0.1:3900`): la app debe estar abierta y con VoxCPM2
seleccionado. Para apuntar a otro servidor usa la variable `VOICESTUDIO_URL`.
