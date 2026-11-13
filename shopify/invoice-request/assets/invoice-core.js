/*
 * invoice-core.js — pure validation and mapping logic for the cart "Richiedi fattura" block.
 * No DOM access: the same file runs in the theme (window.InvoiceCore) and in Node tests (require).
 *
 * Checks implemented:
 *   - Codice fiscale (persona fisica, 16 chars) with check character and omocodia support;
 *     11-digit numeric codice fiscale (enti/società) validated as a partita IVA.
 *   - Partita IVA (11 digits, optional "IT" prefix) with check digit and provincial office code.
 *   - Codice destinatario SDI (7 alphanumeric chars; "0000000" = none / private customer).
 *   - PEC (email syntax only; whether it is a real PEC box cannot be checked client-side).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.InvoiceCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var SDI_PRIVATE = '0000000';

  /* Cart attribute keys. They reach the order as note_attributes [{name, value}]. */
  var KEYS = {
    requested: 'fattura_richiesta',
    type: 'fattura_tipo',
    name: 'fattura_nome',
    taxCode: 'fattura_codice_fiscale',
    company: 'fattura_ragione_sociale',
    vat: 'fattura_partita_iva',
    sdi: 'fattura_codice_sdi',
    pec: 'fattura_pec'
  };

  function clean(v) {
    return String(v == null ? '' : v).replace(/\s+/g, '').toUpperCase();
  }

  /* ---------- Codice fiscale ---------- */

  // Values for characters in odd positions (1st, 3rd, … — index 0, 2, …).
  var ODD = {
    0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
    A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18,
    N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
  };
  // Omocodia: digits in positions 7,8,10,11,13,14,15 (1-based) may be replaced by these letters.
  var CF_PATTERN = /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/;

  function evenValue(ch) {
    return /[0-9]/.test(ch) ? ch.charCodeAt(0) - 48 : ch.charCodeAt(0) - 65;
  }

  function cfCheckChar(first15) {
    var sum = 0;
    for (var i = 0; i < 15; i++) {
      var ch = first15[i];
      sum += i % 2 === 0 ? ODD[ch] : evenValue(ch);
    }
    return String.fromCharCode(65 + (sum % 26));
  }

  function validateTaxCode(value) {
    var v = clean(value);
    if (!v) return { valid: false, value: v, error: 'Inserisci il codice fiscale.' };
    if (/^[0-9]{11}$/.test(v)) {
      var r = validateVat(v);
      return r.valid ? { valid: true, value: v } : { valid: false, value: v, error: 'Codice fiscale numerico non valido.' };
    }
    if (v.length !== 16) return { valid: false, value: v, error: 'Il codice fiscale ha 16 caratteri.' };
    if (!CF_PATTERN.test(v)) return { valid: false, value: v, error: 'Formato del codice fiscale non valido.' };
    if (cfCheckChar(v.slice(0, 15)) !== v[15]) {
      return { valid: false, value: v, error: 'Codice fiscale non valido: controlla i caratteri.' };
    }
    return { valid: true, value: v };
  }

  /* ---------- Partita IVA ---------- */

  function vatCheckDigit(first10) {
    var sum = 0;
    for (var i = 0; i < 10; i++) {
      var d = first10.charCodeAt(i) - 48;
      if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    return (10 - (sum % 10)) % 10;
  }

  function validOffice(code) {
    var n = parseInt(code, 10);
    return (n >= 1 && n <= 100) || n === 120 || n === 121 || n === 888 || n === 999;
  }

  function validateVat(value) {
    var v = clean(value).replace(/^IT/, '');
    if (!v) return { valid: false, value: v, error: 'Inserisci la partita IVA.' };
    if (!/^[0-9]{11}$/.test(v)) return { valid: false, value: v, error: 'La partita IVA ha 11 cifre.' };
    if (/^0{7}/.test(v)) return { valid: false, value: v, error: 'Partita IVA non valida.' };
    if (!validOffice(v.slice(7, 10))) return { valid: false, value: v, error: 'Partita IVA non valida (codice ufficio).' };
    if (vatCheckDigit(v.slice(0, 10)) !== v.charCodeAt(10) - 48) {
      return { valid: false, value: v, error: 'Partita IVA non valida: controlla le cifre.' };
    }
    return { valid: true, value: v };
  }

  /* ---------- SDI and PEC ---------- */

  function validateSdi(value) {
    var v = clean(value);
    if (!v) return { valid: false, value: v, error: 'Inserisci il codice destinatario SDI.' };
    if (!/^[A-Z0-9]{7}$/.test(v)) return { valid: false, value: v, error: 'Il codice SDI ha 7 caratteri (lettere e numeri).' };
    return { valid: true, value: v };
  }

  function validatePec(value) {
    var v = String(value == null ? '' : value).trim().toLowerCase();
    if (!v) return { valid: false, value: v, error: 'Inserisci la PEC.' };
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(v)) return { valid: false, value: v, error: 'Indirizzo PEC non valido.' };
    return { valid: true, value: v };
  }

  /* ---------- Whole form ---------- */

  /**
   * state: { requested, type: 'privato'|'azienda', name, taxCode, company, vat, sdi, pec }
   * returns { valid, errors: {field: message}, values: {field: normalised value} }
   */
  function validateInvoice(state) {
    var s = state || {};
    var errors = {}, values = {};
    if (!s.requested) return { valid: true, errors: errors, values: values };

    var type = s.type === 'azienda' ? 'azienda' : 'privato';
    values.type = type;

    if (type === 'privato') {
      var name = String(s.name || '').trim();
      if (name.length < 3) errors.name = 'Inserisci nome e cognome.';
      values.name = name;
      var cf = validateTaxCode(s.taxCode);
      if (!cf.valid) errors.taxCode = cf.error;
      values.taxCode = cf.value;
      values.sdi = SDI_PRIVATE;
    } else {
      var company = String(s.company || '').trim();
      if (company.length < 2) errors.company = 'Inserisci la ragione sociale.';
      values.company = company;
      var vat = validateVat(s.vat);
      if (!vat.valid) errors.vat = vat.error;
      values.vat = vat.value;
      // Optional company tax code (often the same as the VAT number).
      if (clean(s.taxCode)) {
        var ccf = validateTaxCode(s.taxCode);
        if (!ccf.valid) errors.taxCode = ccf.error;
        values.taxCode = ccf.value;
      }
      // A company needs an SDI code or a PEC (at least one).
      var sdiRaw = clean(s.sdi), pecRaw = String(s.pec || '').trim();
      if (!sdiRaw && !pecRaw) {
        errors.sdi = 'Inserisci il codice SDI oppure la PEC.';
      } else {
        if (sdiRaw) { var sdi = validateSdi(sdiRaw); if (!sdi.valid) errors.sdi = sdi.error; values.sdi = sdi.value; }
        if (pecRaw) { var pec = validatePec(pecRaw); if (!pec.valid) errors.pec = pec.error; values.pec = pec.value; }
        if (!sdiRaw) values.sdi = SDI_PRIVATE; // PEC only: SDI is sent as 0000000
      }
    }
    return { valid: Object.keys(errors).length === 0, errors: errors, values: values };
  }

  /**
   * Cart attributes to send to /cart/update.js. Empty strings remove an attribute,
   * so switching invoice off (or privato ↔ azienda) never leaves stale data on the order.
   */
  function toCartAttributes(state) {
    var out = {};
    Object.keys(KEYS).forEach(function (k) { out[KEYS[k]] = ''; });
    var r = validateInvoice(state);
    if (!state || !state.requested || !r.valid) return out;
    var v = r.values;
    out[KEYS.requested] = 'si';
    out[KEYS.type] = v.type;
    if (v.name) out[KEYS.name] = v.name;
    if (v.taxCode) out[KEYS.taxCode] = v.taxCode;
    if (v.company) out[KEYS.company] = v.company;
    if (v.vat) out[KEYS.vat] = 'IT' + v.vat;
    if (v.sdi) out[KEYS.sdi] = v.sdi;
    if (v.pec) out[KEYS.pec] = v.pec;
    return out;
  }

  /* Reads saved cart attributes back into a form state (pre-fill after reload). */
  function fromCartAttributes(attrs) {
    var a = attrs || {};
    return {
      requested: a[KEYS.requested] === 'si',
      type: a[KEYS.type] === 'azienda' ? 'azienda' : 'privato',
      name: a[KEYS.name] || '',
      taxCode: a[KEYS.taxCode] || '',
      company: a[KEYS.company] || '',
      vat: a[KEYS.vat] || '',
      sdi: a[KEYS.sdi] === SDI_PRIVATE ? '' : (a[KEYS.sdi] || ''),
      pec: a[KEYS.pec] || ''
    };
  }

  return {
    KEYS: KEYS,
    SDI_PRIVATE: SDI_PRIVATE,
    validateTaxCode: validateTaxCode,
    validateVat: validateVat,
    validateSdi: validateSdi,
    validatePec: validatePec,
    validateInvoice: validateInvoice,
    toCartAttributes: toCartAttributes,
    fromCartAttributes: fromCartAttributes,
    _cfCheckChar: cfCheckChar,
    _vatCheckDigit: vatCheckDigit
  };
});
