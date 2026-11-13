/*
 * invoice-request.js — cart "Richiedi fattura" block for the Shopify theme (Hyper).
 * Needs invoice-core.js loaded first (window.InvoiceCore).
 *
 * What it does:
 *   1. Shows/hides the private / company fields and disables hidden inputs (so they are not posted).
 *   2. Validates codice fiscale, partita IVA, SDI and PEC as the customer types (on blur).
 *   3. Saves the data as cart attributes through /cart/update.js (they reach the order as note_attributes).
 *   4. Blocks every checkout button on the page while the invoice is requested and the data is invalid,
 *      and waits for the last save before going to checkout.
 *   5. Hides express-checkout buttons (Shop Pay, PayPal, Apple Pay …) while an invoice is requested,
 *      because they skip the cart and would leave the order without invoice data.
 *   6. Optional: checks the VAT number in VIES through your own endpoint (data-vies-endpoint).
 */
(function () {
  'use strict';
  var Core = window.InvoiceCore;
  if (!Core) { console.warn('[invoice-request] invoice-core.js is missing'); return; }

  var ROOT = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
  var CHECKOUT_SELECTOR = [
    'button[name="checkout"]', 'input[name="checkout"]', 'a[href$="/checkout"]', 'a[href*="/checkout?"]',
    '[data-checkout-button]'
  ].join(',');
  var EXPRESS_SELECTOR = [
    '.additional-checkout-buttons', '[data-shopify="dynamic-checkout-cart"]',
    'shopify-accelerated-checkout-cart', '.shopify-payment-button'
  ].join(',');

  var instances = [];
  var pendingSave = Promise.resolve();

  function debounce(fn, ms) {
    var t; return function () { var a = arguments, self = this; clearTimeout(t); t = setTimeout(function () { fn.apply(self, a); }, ms); };
  }

  function saveAttributes(attributes) {
    pendingSave = pendingSave.then(function () {
      return fetch(ROOT + 'cart/update.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ attributes: attributes })
      }).then(function (r) { if (!r.ok) throw new Error('cart/update ' + r.status); return r.json(); });
    }).catch(function (e) { console.error('[invoice-request] save failed', e); });
    return pendingSave;
  }

  function Instance(el) {
    this.el = el;
    this.toggle = el.querySelector('[data-ir-toggle]');
    this.body = el.querySelector('[data-ir-body]');
    this.status = el.querySelector('[data-ir-status]');
    this.touched = {};
    this.vies = { vat: null, result: null };
    this.viesEndpoint = el.getAttribute('data-vies-endpoint') || '';
    this.viesMode = el.getAttribute('data-vies-mode') === 'block' ? 'block' : 'warn';
    this.lastSaved = null;
    this.saveSoon = debounce(this.save.bind(this), 500);
    this.bind();
  }

  Instance.prototype.type = function () {
    var t = this.el.querySelector('[data-ir-type]:checked');
    return t ? t.value : 'privato';
  };

  // A field can exist in both sections (e.g. taxCode): read the one in the active section.
  Instance.prototype.field = function (name) {
    return this.el.querySelector('[data-ir-section="' + this.type() + '"] [data-ir-field="' + name + '"]') ||
      this.el.querySelector('[data-ir-field="' + name + '"]:not([data-ir-section] *)');
  };

  Instance.prototype.state = function () {
    var get = function (n) { var f = this.field(n); return f ? f.value : ''; }.bind(this);
    return {
      requested: !!(this.toggle && this.toggle.checked),
      type: this.type(),
      name: get('name'),
      taxCode: get('taxCode'),
      company: get('company'),
      vat: get('vat'),
      sdi: get('sdi'),
      pec: get('pec')
    };
  };

  Instance.prototype.bind = function () {
    var self = this;
    this.el.addEventListener('change', function (e) {
      if (e.target.matches('[data-ir-toggle], [data-ir-type]')) { self.touched = {}; self.render(); self.save(); }
    });
    this.el.addEventListener('input', function (e) {
      if (e.target.matches('[data-ir-field]')) { self.render(); self.saveSoon(); }
    });
    this.el.addEventListener('focusout', function (e) {
      var f = e.target.getAttribute && e.target.getAttribute('data-ir-field');
      if (f) {
        self.touched[f] = true;
        if (/^(taxCode|vat|sdi)$/.test(f)) e.target.value = e.target.value.replace(/\s+/g, '').toUpperCase();
        self.render();
        if (f === 'vat') self.checkVies();
      }
    });
  };

  Instance.prototype.result = function () {
    var s = this.state(), r = Core.validateInvoice(s);
    if (s.requested && s.type === 'azienda' && this.viesMode === 'block' && this.vies.result && this.vies.result.valid === false &&
        this.vies.vat === Core.validateVat(s.vat).value) {
      r.errors.vat = 'Partita IVA non attiva secondo VIES.'; r.valid = false;
    }
    return r;
  };

  Instance.prototype.render = function (showAll) {
    var s = this.state(), r = this.result(), self = this;
    if (this.body) this.body.hidden = !s.requested;
    this.el.querySelectorAll('[data-ir-section]').forEach(function (sec) {
      var on = s.requested && sec.getAttribute('data-ir-section') === s.type;
      sec.hidden = !on;
      sec.querySelectorAll('input, select, textarea').forEach(function (i) { i.disabled = !on; });
    });
    this.el.querySelectorAll('[data-ir-field]').forEach(function (input) {
      var name = input.getAttribute('data-ir-field');
      var box = input.closest('.invoice-request__field') || self.el;
      var err = box.querySelector('[data-ir-error]');
      var ok = box.querySelector('[data-ir-ok]');
      var live = s.requested && !input.disabled;
      var show = live && (showAll || self.touched[name]) && r.errors[name];
      input.setAttribute('aria-invalid', show ? 'true' : 'false');
      if (err) { err.textContent = show ? r.errors[name] : ''; err.hidden = !show; }
      if (ok) ok.hidden = !(live && input.value && !r.errors[name]);
    });
    var hid = this.el.querySelector('[data-ir-hidden-requested]');
    if (hid) hid.value = s.requested && r.valid ? 'si' : '';
    document.querySelectorAll(EXPRESS_SELECTOR).forEach(function (b) { b.hidden = anyRequested(); });
    return r;
  };

  Instance.prototype.save = function () {
    var attrs = Core.toCartAttributes(this.state());
    var key = JSON.stringify(attrs);
    if (key === this.lastSaved) return pendingSave;
    this.lastSaved = key;
    if (this.status) this.status.textContent = '';
    return saveAttributes(attrs);
  };

  Instance.prototype.checkVies = function () {
    var self = this, s = this.state();
    if (!this.viesEndpoint || !s.requested || s.type !== 'azienda') return;
    var v = Core.validateVat(s.vat);
    if (!v.valid || v.value === this.vies.vat) return;
    this.vies = { vat: v.value, result: null };
    var url = this.viesEndpoint + (this.viesEndpoint.indexOf('?') < 0 ? '?' : '&') + 'vat=IT' + v.value;
    fetch(url, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || self.vies.vat !== v.value) return;
        self.vies.result = j;
        if (self.status) {
          self.status.textContent = j.valid === true ? ('Partita IVA attiva' + (j.name ? ': ' + j.name : '') + '.')
            : j.valid === false ? 'Attenzione: la partita IVA non risulta attiva in VIES.' : '';
        }
        var company = self.field('company');
        if (j.valid && j.name && company && !company.value.trim()) { company.value = j.name; self.saveSoon(); }
        self.render();
      })
      .catch(function () { /* VIES often times out: never block the customer for that */ });
  };

  function anyRequested() {
    return instances.some(function (i) { return i.state().requested; });
  }

  function init(root) {
    (root || document).querySelectorAll('[data-invoice-request]:not([data-ir-ready])').forEach(function (el) {
      el.setAttribute('data-ir-ready', '');
      var inst = new Instance(el);
      instances.push(inst);
      inst.render();
    });
    instances = instances.filter(function (i) { return document.contains(i.el); });
  }

  // Checkout guard (capture phase, so it runs before the theme's own handlers).
  function guard(e) {
    var trigger = e.type === 'submit' ? (e.submitter || null) : e.target.closest && e.target.closest(CHECKOUT_SELECTOR);
    if (e.type === 'submit' && !(trigger && trigger.matches && trigger.matches(CHECKOUT_SELECTOR))) return;
    if (!trigger) return;
    var active = instances.filter(function (i) { return document.contains(i.el) && i.state().requested; });
    if (!active.length) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var bad = active.filter(function (i) { return !i.render(true).valid; });
    if (bad.length) {
      var first = bad[0].el.querySelector('[aria-invalid="true"]');
      bad[0].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (first) setTimeout(function () { first.focus(); }, 300);
      return;
    }
    Promise.all(active.map(function (i) { return i.save(); })).then(function () { return pendingSave; })
      .then(function () { window.location.href = ROOT + 'checkout'; });
  }
  document.addEventListener('click', guard, true);
  document.addEventListener('submit', guard, true);

  // Cart drawers re-render their HTML: pick up new blocks.
  new MutationObserver(function () { init(); }).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); });
  else init();
})();
