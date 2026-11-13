# Invoice request on the cart page (Italian invoice data)

Theme code for the "Richiedo la fattura" block designed in boards 08 (desktop) and M10 (mobile) of each brand.
It collects the Italian e-invoicing data on the **cart page**, validates it in the browser and stores it on the
order, without Shopify Plus.

## Why the cart and not the checkout

The stores are on Shopify Advanced, not Plus:
- On non-Plus plans, apps and custom code **cannot add fields** to the checkout's information, shipping or payment
  steps (checkout UI extensions there are Plus-only). The thank-you and order-status pages can be extended on every
  plan, but that is after payment.
- The native checkout only offers **Codice fiscale** and **PEC** for Italy (Settings › Checkout, stored in
  `localizedFields`). They are optional, and there is no field for partita IVA, ragione sociale or SDI code.

So the data is collected in the cart as **cart attributes**. Shopify copies them onto the order as
`note_attributes`, where the ERP middleware reads them.

## Files

| File | Goes to | What it does |
|---|---|---|
| `snippets/invoice-request.liquid` | `snippets/` | The markup: toggle, Privato/Azienda switch, fields, error messages. Pre-fills from `cart.attributes`. |
| `assets/invoice-core.js` | `assets/` | Pure validation and attribute mapping (no DOM). Same file used by the tests. |
| `assets/invoice-request.js` | `assets/` | Behaviour: show/hide, validation on blur, save via `/cart/update.js`, checkout guard, hides express buttons, optional VIES check. |
| `assets/invoice-request.css` | `assets/` | Styles. Colours via `--ir-primary`, `--ir-border`, … (set them per brand). |
| `middleware/vies-check.mjs` | your middleware | Optional VIES check endpoint (the browser cannot call VIES directly). |
| `tests/` | — | `node --test shopify/invoice-request/tests/*.test.*` (17 tests). |

## Install in the theme (Hyper)

1. Copy the snippet and the 3 asset files into the theme (Online Store › Themes › Edit code, or with Shopify CLI).
2. In the cart template (in Hyper: the main cart section, above the checkout button) add:
   ```liquid
   {% render 'invoice-request', form_id: 'cart' %}
   ```
   `form_id` is the id of the cart `<form>`. Check it in the section's code; the inputs use `form="…"`, so the values
   are also posted when the cart form is submitted (quantity update without JavaScript).
3. Set the brand colour, for example in the cart section:
   ```css
   .invoice-request { --ir-primary: #CA442E; }  /* MisterCucina accent */
   ```
4. **Cart drawer:** the drawer's "Vai alla cassa" should lead to the cart page (`/cart`) instead of `/checkout`, so
   the customer always sees the block. This matches the prototype (drawer → cart page 08). Alternatively render the
   snippet in the drawer too: the script picks up blocks that the drawer adds later.
5. **Express checkout:** with the block on, the script hides Shop Pay / PayPal / Apple Pay buttons on the cart page.
   On the **product page** the dynamic checkout button ("Acquista ora") skips the cart completely: turn it off in the
   product section settings (recommended), or accept that those orders have no invoice data in the attributes.
6. Optional VIES check: deploy `middleware/vies-check.mjs` and render the snippet with
   `vies_endpoint: 'https://<host>/vies'` (and `vies_mode: 'block'` to refuse VAT numbers that VIES reports as not
   active; the default only warns). When VIES is down the customer is never blocked.

## What is validated

| Field | Rule |
|---|---|
| Codice fiscale (privato) | 16 characters, structure, **check character**, omocodia. An 11-digit numeric code is checked as a partita IVA. |
| Partita IVA | 11 digits (`IT` prefix accepted), **check digit**, provincial office code (001–100, 120, 121, 888, 999). |
| Codice SDI | 7 letters/digits. Private customers: `0000000` set automatically. |
| PEC | Email syntax (whether it is a real PEC box cannot be checked). |
| Company | Ragione sociale required, plus SDI **or** PEC. Company codice fiscale optional, checked if filled. |

The checkout buttons stay blocked while the invoice is requested and the data is not valid. Invalid data is never
written to the cart. Switching the toggle off clears all the attributes.

## Data on the order

`note_attributes` (also in the `orders/create` webhook and in the admin order page, "Additional details"):

| Key | Example |
|---|---|
| `fattura_richiesta` | `si` |
| `fattura_tipo` | `privato` or `azienda` |
| `fattura_nome` | `Mario Rossi` (privato) |
| `fattura_codice_fiscale` | `RSSMRA80A01H501U` |
| `fattura_ragione_sociale` | `Azienda di esempio S.r.l.` (azienda) |
| `fattura_partita_iva` | `IT01234560017` (azienda) |
| `fattura_codice_sdi` | `M5UXCR1`, or `0000000` for private customers and PEC-only companies |
| `fattura_pec` | `amministrazione@pec.esempio.it` |

The billing address is the one entered at checkout. Optionally, a Shopify Flow ("Order created" → "Update order
metafield") can copy the attributes into order metafields if the ERP prefers metafields.

## Ready-made apps (alternative)

Researched on 2026-11-12 (App Store search was rate-limited, so the list may be incomplete; prices are the listed
ones):

| App | Price | Where | Notes |
|---|---|---|---|
| **Fatture Italia** (Blhack Srl) | from $6/month | cart page and drawer (checkout only on Plus) | The most established option; 3.9★, 22 reviews |
| Dati Fatturazione Elettronica | $9.99/month | cart block, thank-you page, POS | Saves to the order note and metafields |
| Fatturazione IT | free up to 50 orders/month, Pro $4.99 | cart page and mini-cart | |
| GetFiscal DatiFattura | free | cart | |
| InvoiceForm | $5.90/month | cart | Metafields and order tag |
| Fiscaly OK | $4.99–39.99/month | cart pop-up | Lists VIES / tax-code checks |
| CF Ready | about €3.99/month | **native checkout** CF and PEC fields, with validation (Shopify Function) on non-Plus | No partita IVA or SDI |
| ezInvoices | — | — | Issues the invoices itself: overlaps with the ERP, not recommended |

None of them was found to clearly check the partita IVA against VIES or to collect the ragione sociale in a way the
ERP can map without custom work. **Recommendation:** this custom block (free, the data keys are ours, VIES optional).
If you prefer an app, Fatture Italia Basic. CF Ready can be added on top of either to cover customers who use express
checkout, since its CF/PEC fields live in the checkout itself.
