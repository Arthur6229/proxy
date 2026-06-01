import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require    = createRequire(import.meta.url);
const wisp       = require('wisp-server-node');
const __dirname  = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Allow the UV service worker to claim the /service/ scope
app.get('/uv/uv.sw.js', (req, res) => {
  res.setHeader('Service-Worker-Allowed', '/');
  res.sendFile(path.join(__dirname, 'public', 'uv', 'uv.sw.js'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

const server = createServer(app);

server.on('upgrade', (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n  ◉ TON 618 Proxy  →  http://localhost:${PORT}\n`);
});
