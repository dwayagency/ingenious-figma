// vies-check.mjs — optional VAT-number check in VIES for the cart invoice block.
//
// The browser cannot call VIES directly (no CORS), so the theme calls this endpoint instead:
//   GET /vies?vat=IT01234560017  ->  {"valid": true|false|null, "name": "...", "address": "..."}
// valid = null means VIES did not answer (it is often down for a member state): the theme never
// blocks the customer in that case.
//
// Deploy it in the existing middleware (the one that syncs Shopify with the ERP), or run it alone:
//   ALLOWED_ORIGINS="https://www.tamtamprice.it,https://www.mistercucina.com,https://www.trovaincasso.it" \
//   node shopify/invoice-request/middleware/vies-check.mjs
// then set vies_endpoint: 'https://<your-host>/vies' in the snippet.
//
// VIES REST API (European Commission): https://ec.europa.eu/taxation_customs/vies/rest-api/ms/{CC}/vat/{number}
import http from 'node:http';
import { pathToFileURL } from 'node:url';

const VIES = 'https://ec.europa.eu/taxation_customs/vies/rest-api/ms';
const DAY = 24 * 60 * 60 * 1000;
const cache = new Map(); // vat -> { at, body }

export function parseVat(raw) {
  const v = String(raw || '').replace(/\s+/g, '').toUpperCase();
  const m = /^(IT)?([0-9]{11})$/.exec(v);
  return m ? m[2] : null;
}

export async function checkVat(raw, { fetchImpl = fetch, timeoutMs = 8000 } = {}) {
  const vat = parseVat(raw);
  if (!vat) return { valid: false, error: 'format' };
  const hit = cache.get(vat);
  if (hit && Date.now() - hit.at < DAY) return hit.body;
  let body;
  try {
    const res = await fetchImpl(`${VIES}/IT/vat/${vat}`, { signal: AbortSignal.timeout(timeoutMs), headers: { Accept: 'application/json' } });
    const j = await res.json();
    if (j.isValid === true) body = { valid: true, name: clean(j.name), address: clean(j.address) };
    else if (j.userError === 'INVALID' || j.isValid === false && (!j.userError || j.userError === 'VALID')) body = { valid: false };
    else body = { valid: null, error: j.userError || 'unavailable' }; // MS_UNAVAILABLE, TIMEOUT, …
  } catch (e) {
    body = { valid: null, error: 'unavailable' };
  }
  if (body.valid !== null) cache.set(vat, { at: Date.now(), body });
  return body;
}

function clean(s) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t === '---' ? '' : t;
}

export function createServer({ allowedOrigins = [], fetchImpl } = {}) {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
    }
    if (url.pathname !== '/vies' || req.method !== 'GET') { res.writeHead(404).end(); return; }
    const body = await checkVat(url.searchParams.get('vat'), { fetchImpl });
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }).end(JSON.stringify(body));
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const port = Number(process.env.PORT || 8787);
  createServer({ allowedOrigins }).listen(port, () => console.log(`vies-check on :${port}/vies`));
}
