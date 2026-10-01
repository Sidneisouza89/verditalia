// Servidor de produção do Verditalia (Railway).
// - Entrega o site gerado em dist/ (com fallback de SPA para /agendar, /sobre, /contato)
// - Recebe o formulário de contato em POST /api/contato e envia o e-mail via Resend
//
// Sem dependências externas: só Node puro (precisa de Node 18+, por causa do fetch).
//
// Variáveis de ambiente (configurar no Railway → Variables):
//   RESEND_API_KEY  chave da Resend (começa com "re_")
//   CONTACT_TO      e-mail da Lídice que recebe as mensagens (NUNCA vai para o navegador)
//   CONTACT_FROM    remetente verificado na Resend, ex.: "Verditalia <contato@verditalia.com>"
//   PORT            definido automaticamente pelo Railway

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// ---------- utilidades ----------

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readBody(req, limit = 20_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

// Limite simples anti-spam: 5 envios por IP a cada 10 minutos.
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(ip);
  }
}, WINDOW_MS).unref();

// ---------- POST /api/contato ----------

async function handleContato(req, res) {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
  if (rateLimited(ip)) {
    return sendJson(res, 429, { ok: false, error: 'Muitas mensagens em pouco tempo. Tente de novo em alguns minutos.' });
  }

  let data;
  try {
    data = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Requisição inválida.' });
  }

  // Honeypot: campo invisível que só robô preenche. Finge sucesso e descarta.
  if (data.site) return sendJson(res, 200, { ok: true });

  const nome = String(data.nome || '').trim().slice(0, 120);
  const email = String(data.email || '').trim().slice(0, 200);
  const mensagem = String(data.mensagem || '').trim().slice(0, 5000);

  if (!nome || !mensagem || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { ok: false, error: 'Preencha nome, um e-mail válido e a mensagem.' });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error('[contato] Variáveis RESEND_API_KEY / CONTACT_TO / CONTACT_FROM não configuradas.');
    return sendJson(res, 500, { ok: false, error: 'Não foi possível enviar agora. Tente novamente mais tarde.' });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#2b2b2b;line-height:1.5">
      <h2 style="color:#1f3d2b;margin:0 0 16px">Nova mensagem pelo site Verditalia</h2>
      <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Mensagem:</strong></p>
      <p style="white-space:pre-wrap;background:#f6f3ea;padding:12px 16px;border-radius:8px">${escapeHtml(mensagem)}</p>
      <p style="color:#777;font-size:12px;margin-top:24px">Responda este e-mail para falar direto com ${escapeHtml(nome)}.</p>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `Contato pelo site — ${nome}`,
        html,
        text: `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`,
      }),
    });

    if (!r.ok) {
      console.error('[contato] Resend respondeu', r.status, await r.text());
      return sendJson(res, 502, { ok: false, error: 'Não foi possível enviar agora. Tente novamente mais tarde.' });
    }

    return sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error('[contato] Falha ao chamar a Resend:', err);
    return sendJson(res, 502, { ok: false, error: 'Não foi possível enviar agora. Tente novamente mais tarde.' });
  }
}

// ---------- arquivos estáticos + fallback de SPA ----------

async function serveStatic(req, res, pathname) {
  let rel;
  try {
    rel = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  } catch {
    rel = '/';
  }
  const filePath = join(ROOT, rel);

  if (filePath.startsWith(ROOT)) {
    try {
      const s = await stat(filePath);
      if (s.isFile()) {
        const body = await readFile(filePath);
        const isHashedAsset = rel.startsWith('/assets/');
        res.writeHead(200, {
          'Content-Type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
          'Cache-Control': isHashedAsset ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
        });
        return res.end(req.method === 'HEAD' ? undefined : body);
      }
    } catch {
      // não existe -> cai no fallback abaixo
    }
  }

  // Arquivo com extensão que não existe = 404 de verdade (evita devolver HTML no lugar de imagem/js)
  if (extname(rel)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Não encontrado');
  }

  // Rotas do React (/agendar, /sobre, /contato...) -> index.html
  const index = await readFile(join(ROOT, 'index.html'));
  res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-cache' });
  res.end(req.method === 'HEAD' ? undefined : index);
}

// ---------- servidor ----------

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, 'http://localhost');

    if (pathname === '/api/contato') {
      if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'Método não permitido.' });
      return await handleContato(req, res);
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      return res.end();
    }

    return await serveStatic(req, res, pathname);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Verditalia rodando na porta ${PORT}`);
});
