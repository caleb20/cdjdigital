"""Comprueba la narración antes de renderizar. Se ejecuta con el Python del entorno de VoiceStudio
(el que tiene faster-whisper y speechbrain), desde la carpeta video/:

    C:\\Users\\intel\\voicestudio-runtime\\.venv\\Scripts\\python.exe tools\\check_narration.py

1) ¿SE ENTIENDE? Transcribe cada frase con Whisper (español) y la compara con el guion.
   Para el porcentaje, siglas y números se escriben como habla el guion ("ce de jota", "noventa y nueve"), y Whisper
   los suele escribir "CDJ" o "99": esas diferencias no son errores de pronunciación; lee la transcripción.
2) ¿ES LA MISMA VOZ? Huella de hablante (ECAPA): 1.0 = idéntica. Más de 0.7 = misma persona; menos de 0.5 = otra.
3) NIVELES: volumen medio y pico de cada frase.
Opciones:  --carpeta assets/audio   --sin-asr   --sin-voz
Sirve para CUALQUIER carpeta de audios (otros videos): --carpeta "C:\ruta\a\mis\wavs". Si los nombres coinciden con las claves de
narration-script.json también compara el texto con el guion; si no, solo muestra lo que se oye.
"""
import argparse, glob, itertools, json, os, re, subprocess, sys, unicodedata

ap = argparse.ArgumentParser()
ap.add_argument("--carpeta", default="assets/audio")
ap.add_argument("--sin-asr", action="store_true")
ap.add_argument("--sin-voz", action="store_true")
args = ap.parse_args()

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("HF_HOME", os.path.join(os.path.expanduser("~"), "voicestudio-runtime", "hf"))
script_path = os.path.join(root, "narration-script.json")
script = json.load(open(script_path, encoding="utf-8"))["lines"] if os.path.exists(script_path) else {}
clips = {os.path.splitext(os.path.basename(f))[0]: f for f in sorted(glob.glob(os.path.join(root, args.carpeta, "*.*")))
         if f.lower().endswith((".wav", ".mp3", ".m4a", ".flac", ".ogg"))}
print(f"{len(clips)} frases en {args.carpeta}\n")


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9 ]", " ", s).split()


# --- 3) niveles
print("NIVELES (media / pico, en dB)")
for k, f in clips.items():
    out = subprocess.run(["ffmpeg", "-hide_banner", "-i", f, "-af", "volumedetect", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    mean = re.search(r"mean_volume: (-?[\d.]+)", out)
    peak = re.search(r"max_volume: (-?[\d.]+)", out)
    flag = "  <- muy bajo" if mean and float(mean.group(1)) < -26 else ("  <- satura" if peak and float(peak.group(1)) > -0.5 else "")
    print(f"  {k:4s} {mean.group(1) if mean else '?':>6} / {peak.group(1) if peak else '?':>5}{flag}")

# --- 1) se entiende
if not args.sin_asr:
    from faster_whisper import WhisperModel
    print("\nSE ENTIENDE (lo que oye Whisper)")
    model = WhisperModel("small", device="cuda", compute_type="int8_float16")
    for k, f in clips.items():
        segs, _ = model.transcribe(f, language="es", beam_size=5)
        heard = " ".join(s.text.strip() for s in segs)
        if k in script:
            want, got = norm(script[k]["tts"]), norm(heard)
            pct = f"{round(100 * sum(1 for w in want if w in got) / max(1, len(want))):3d}%"
        else:
            pct = "  - "
        print(f"  {k:4s} {pct}  {heard}")

# --- 2) misma voz
if not args.sin_voz:
    import torch, torchaudio
    from speechbrain.inference.speaker import EncoderClassifier
    print("\nMISMA VOZ (parecido entre frases)")
    clf = EncoderClassifier.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb",
                                         savedir=os.path.join(os.environ["HF_HOME"], "ecapa"), run_opts={"device": "cpu"})
    embs = {}
    for k, f in clips.items():
        sig, sr = torchaudio.load(f)
        sig = sig.mean(0, keepdim=True)
        if sr != 16000:
            sig = torchaudio.functional.resample(sig, sr, 16000)
        with torch.no_grad():
            embs[k] = torch.nn.functional.normalize(clf.encode_batch(sig).squeeze(), dim=0)
    pairs = {(a, b): float(embs[a] @ embs[b]) for a, b in itertools.combinations(embs, 2)}
    vals = list(pairs.values())
    mean = sum(vals) / len(vals)
    print(f"  media {mean:.2f} · mínima {min(vals):.2f} · máxima {max(vals):.2f}")
    worst = sorted(pairs.items(), key=lambda kv: kv[1])[:3]
    print("  pares más distintos: " + ", ".join(f"{a}-{b} {v:.2f}" for (a, b), v in worst))
    print("  VEREDICTO: " + ("una sola voz" if min(vals) >= 0.6 and mean >= 0.75
                             else "se nota más de una voz: usa una voz ancla (perfil) y regenera"))
