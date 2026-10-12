/** Servidor estático mínimo para ver la animación en el navegador: http://127.0.0.1:5188/ */
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const MIME = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.js': 'text/javascript' }
http
  .createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/index.html'))
    if (!file.startsWith(root) || !fs.existsSync(file)) return void res.writeHead(404).end()
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    fs.createReadStream(file).pipe(res)
  })
  .listen(5188, '127.0.0.1', () => console.log('Vista previa en http://127.0.0.1:5188/  (Espacio: pausa, ← →: ±2 s, R: reiniciar)'))
