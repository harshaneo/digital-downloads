import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

function requestHandler(req, res) {
  const urlPath = req.url?.split('?')[0] || '/';

  if (urlPath === '/__client_log' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      console.log(`[CLIENT REPORT] ${body}`);
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end('{"ok":true}');
    });
    return;
  }

  console.log(`[HTTP] ${new Date().toISOString()} ${req.method} ${urlPath} (from ${req.socket.remoteAddress})`);

  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);

  // If path is outside DIST_DIR, deny
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    // If not found or directory, fallback to index.html (SPA routing)
    if (err || stats.isDirectory()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        console.error(`[ERROR] Failed to read ${filePath}:`, readErr.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Internal Server Error: ${readErr.message}`);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      });
      res.end(content);
    });
  });
}

function startServer(port) {
  const server = http.createServer(requestHandler);
  server.listen(port, '0.0.0.0', () => {
    console.log(`Nexus Vault server listening on http://0.0.0.0:${port} (Local: http://localhost:${port}/ and http://127.0.0.1:${port}/)`);
  });
  server.on('error', (err) => {
    console.error(`Server error on port ${port}:`, err.message);
  });
  return server;
}

// Listen on 3000, 5175 and 5173
startServer(3000);
startServer(5175);
startServer(5173);
