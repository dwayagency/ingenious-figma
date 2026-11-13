// Run with: node --test shopify/invoice-request/tests/*.test.*
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseVat, checkVat, createServer } from '../middleware/vies-check.mjs';

const fake = (json) => async () => ({ json: async () => json });

test('parseVat accepts IT prefix and spaces only for 11 digits', () => {
  assert.equal(parseVat('IT 0123456 0017'), '01234560017');
  assert.equal(parseVat('01234560017'), '01234560017');
  assert.equal(parseVat('DE123456789'), null);
  assert.equal(parseVat('123'), null);
});

test('checkVat maps VIES answers', async () => {
  assert.deepEqual(await checkVat('IT11111111111', { fetchImpl: fake({ isValid: true, name: 'ACME  SRL', address: 'VIA ROMA 1\n00100 ROMA RM' }) }),
    { valid: true, name: 'ACME SRL', address: 'VIA ROMA 1 00100 ROMA RM' });
  assert.deepEqual(await checkVat('IT22222222222', { fetchImpl: fake({ isValid: false, userError: 'INVALID' }) }), { valid: false });
  assert.deepEqual(await checkVat('IT33333333333', { fetchImpl: fake({ isValid: false, userError: 'MS_UNAVAILABLE' }) }),
    { valid: null, error: 'MS_UNAVAILABLE' });
  assert.deepEqual(await checkVat('IT44444444444', { fetchImpl: async () => { throw new Error('timeout'); } }),
    { valid: null, error: 'unavailable' });
  assert.deepEqual(await checkVat('nope'), { valid: false, error: 'format' });
});

test('checkVat caches definite answers only', async () => {
  let calls = 0;
  const f = async () => { calls++; return { json: async () => ({ isValid: true, name: 'X' }) }; };
  await checkVat('IT55555555555', { fetchImpl: f });
  await checkVat('IT55555555555', { fetchImpl: f });
  assert.equal(calls, 1);
});

test('HTTP endpoint answers JSON with CORS for allowed origins', async () => {
  const srv = createServer({ allowedOrigins: ['https://shop.example'], fetchImpl: fake({ isValid: true, name: 'ACME SRL' }) });
  await new Promise(r => srv.listen(0, r));
  const { port } = srv.address();
  const res = await fetch(`http://127.0.0.1:${port}/vies?vat=IT66666666666`, { headers: { Origin: 'https://shop.example' } });
  assert.equal(res.headers.get('access-control-allow-origin'), 'https://shop.example');
  assert.deepEqual(await res.json(), { valid: true, name: 'ACME SRL', address: '' });
  const other = await fetch(`http://127.0.0.1:${port}/vies?vat=IT66666666666`, { headers: { Origin: 'https://evil.example' } });
  assert.equal(other.headers.get('access-control-allow-origin'), null);
  assert.equal((await fetch(`http://127.0.0.1:${port}/other`)).status, 404);
  srv.close();
});
