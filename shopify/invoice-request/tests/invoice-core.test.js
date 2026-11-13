// Run with: node --test shopify/invoice-request/tests
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../assets/invoice-core.js');

test('codice fiscale: valid examples, case and spaces ignored', () => {
  assert.equal(C.validateTaxCode('RSSMRA80A01H501U').valid, true);
  assert.equal(C.validateTaxCode(' rssmra80a01h501u ').valid, true);
  assert.equal(C.validateTaxCode('RSS MRA 80A01 H501U').value, 'RSSMRA80A01H501U');
});

test('codice fiscale: wrong check character, length or format', () => {
  assert.equal(C.validateTaxCode('RSSMRA80A01H501X').valid, false);
  assert.equal(C.validateTaxCode('RSSMRA80A01H501').valid, false);
  assert.equal(C.validateTaxCode('RSSMRA80Z01H501U').valid, false); // Z is not a month letter
  assert.equal(C.validateTaxCode('').valid, false);
});

test('codice fiscale: omocodia (digits replaced by letters) is accepted when the check char matches', () => {
  // Replace the last digit of the town code (position 15) with its letter: 1 -> M
  const base = 'RSSMRA80A01H50M';
  const cf = base + C._cfCheckChar(base);
  assert.equal(C.validateTaxCode(cf).valid, true);
});

test('codice fiscale: 11-digit numeric code is checked as a partita IVA', () => {
  assert.equal(C.validateTaxCode('01234560017').valid, true);
  assert.equal(C.validateTaxCode('01234560018').valid, false);
});

test('partita IVA: check digit, IT prefix, office code', () => {
  assert.equal(C.validateVat('01234560017').valid, true);
  assert.equal(C.validateVat('IT 0123456 001 7').valid, true);
  assert.equal(C.validateVat('IT01234560017').value, '01234560017');
  assert.equal(C.validateVat('01234560018').valid, false);      // wrong check digit
  assert.equal(C.validateVat('01234567897').valid, false);      // check digit ok, office 789 does not exist
  assert.equal(C.validateVat('00000000000').valid, false);
  assert.equal(C.validateVat('1234567890').valid, false);       // 10 digits
  assert.equal(C.validateVat('IT0123456001A').valid, false);
});

test('partita IVA: check digit algorithm', () => {
  assert.equal(C._vatCheckDigit('0123456001'), 7);
  assert.equal(C._vatCheckDigit('0123456789'), 7);
});

test('SDI and PEC', () => {
  assert.equal(C.validateSdi('m5uxcr1').valid, true);
  assert.equal(C.validateSdi('M5UXCR1').value, 'M5UXCR1');
  assert.equal(C.validateSdi('M5UXCR').valid, false);
  assert.equal(C.validateSdi('M5UX-R1').valid, false);
  assert.equal(C.validatePec('Amministrazione@Pec.Esempio.it').value, 'amministrazione@pec.esempio.it');
  assert.equal(C.validatePec('amministrazione@pec').valid, false);
});

test('form: invoice not requested is always valid and clears every attribute', () => {
  assert.equal(C.validateInvoice({ requested: false }).valid, true);
  const attrs = C.toCartAttributes({ requested: false, type: 'azienda', vat: '01234560017' });
  assert.deepEqual(Object.values(attrs), Array(8).fill(''));
  assert.deepEqual(Object.keys(attrs).sort(), Object.values(C.KEYS).sort());
});

test('form: private customer gets SDI 0000000', () => {
  const s = { requested: true, type: 'privato', name: 'Mario Rossi', taxCode: 'rssmra80a01h501u' };
  assert.equal(C.validateInvoice(s).valid, true);
  const a = C.toCartAttributes(s);
  assert.equal(a.fattura_richiesta, 'si');
  assert.equal(a.fattura_tipo, 'privato');
  assert.equal(a.fattura_codice_fiscale, 'RSSMRA80A01H501U');
  assert.equal(a.fattura_codice_sdi, '0000000');
  assert.equal(a.fattura_partita_iva, '');
});

test('form: private customer errors', () => {
  const r = C.validateInvoice({ requested: true, type: 'privato', name: '', taxCode: 'XXX' });
  assert.equal(r.valid, false);
  assert.ok(r.errors.name);
  assert.ok(r.errors.taxCode);
});

test('form: company needs ragione sociale, valid VAT and SDI or PEC', () => {
  const base = { requested: true, type: 'azienda', company: 'Azienda di esempio S.r.l.', vat: 'IT01234560017' };
  assert.equal(C.validateInvoice(base).valid, false);
  assert.ok(C.validateInvoice(base).errors.sdi);

  const withSdi = { ...base, sdi: 'm5uxcr1' };
  assert.equal(C.validateInvoice(withSdi).valid, true);
  const a = C.toCartAttributes(withSdi);
  assert.equal(a.fattura_partita_iva, 'IT01234560017');
  assert.equal(a.fattura_codice_sdi, 'M5UXCR1');
  assert.equal(a.fattura_pec, '');

  const withPec = { ...base, pec: 'amm@pec.esempio.it' };
  const b = C.toCartAttributes(withPec);
  assert.equal(b.fattura_pec, 'amm@pec.esempio.it');
  assert.equal(b.fattura_codice_sdi, '0000000');

  assert.ok(C.validateInvoice({ ...withSdi, vat: '01234560018' }).errors.vat);
  assert.ok(C.validateInvoice({ ...withSdi, company: '' }).errors.company);
  assert.ok(C.validateInvoice({ ...withSdi, taxCode: 'RSSMRA80A01H501X' }).errors.taxCode); // optional, but checked if filled
});

test('form: invalid data is never written to the cart', () => {
  const a = C.toCartAttributes({ requested: true, type: 'azienda', company: 'X Srl', vat: '123' });
  assert.equal(a.fattura_richiesta, '');
});

test('round trip: attributes back into the form', () => {
  const s = { requested: true, type: 'privato', name: 'Mario Rossi', taxCode: 'RSSMRA80A01H501U' };
  const back = C.fromCartAttributes(C.toCartAttributes(s));
  assert.equal(back.requested, true);
  assert.equal(back.type, 'privato');
  assert.equal(back.taxCode, 'RSSMRA80A01H501U');
  assert.equal(back.sdi, ''); // 0000000 is not shown to the customer
});
