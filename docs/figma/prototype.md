# Prototypes: what is in the Figma file (2026-11-06)

File `jvPNNsPKD8nbvPFUqfd2WH`, now in the **Alessandro Molinari DWAY** team (Education plan: 200 MCP calls/day).
Each brand page has its rebranded homepage plus 4 prototype boards (desktop, 1920 px wide), a brand kit and a
components frame. Each page has a **flow starting point** on the homepage, so you can press Present on any page.

Renders: `docs/screenshots/after/` (the template originals are in `docs/screenshots/before/`).

## Shared foundations

| What | Where | Notes |
|---|---|---|
| Colour variables | collections `Brand · TamTam Price`, `Brand · MisterCucina`, `Brand · Trovaincasso` | Same 17 names in each: `brand/*`, `text/*`, `surface/*`, `border/default`, `badge/*`, `price/sale`, `radius/card`, `radius/button`. The file's plan allows one mode per collection, so there is one collection per brand instead of one collection with 3 modes. Values are in `docs/brand/brand-tokens.md`. |
| Text styles | `TamTam Price/*`, `MisterCucina/*`, `Trovaincasso/*` | 12 per brand: Display, H1–H4, Body, Body Strong, Small, Label, Button, Price, Caption |
| Product photos | page `ASSETS · Foto prodotto` | 48 photos from trovaincasso.it (white background). Reused as image fills on all three sites, multiplied over brand tints. |
| Brand kit | frame `Brand kit · <brand>` on each page, above the homepage | Logo components (from `docs/DESIGN`), colour swatches bound to the variables, type specimen |
| Components | frame `Componenti · <brand>` next to the brand kit; header/footer stay on the homepage | `Bottone / Primario`, `Bottone / Secondario` (TEXT prop `Etichetta`), `Card prodotto` (props: Nome, Marca, Prezzo, Prezzo barrato, Mostra prezzo barrato, Badge, Mostra badge, Disponibilità; swap the photo on the `Immagine` layer). `Header / Barra annunci`, `Header / Principale`, `Footer / Contatti`, `Footer` were converted **in place** on the homepage, so editing the homepage header or footer updates every board. |

## TamTam Price: page `TAMTAM PRICE` (`0:1`), Hyper Nexvo

| Board | Node | Content |
|---|---|---|
| 01 Home | `1:4347` | Rebranded homepage (Poppins, black/grey/red, washing machines, fridges, cooking) |
| 02 PLP · Lavatrici | `36:38` | Filters (availability, brand, capacity, price, energy class), toolbar, grid with promo tile, load more |
| 03 PDP · Bosch Serie 6 WGG244ZEIT | `37:356` | Gallery + zoom, buy box (stock counter, options, services with prices, quantity, add to cart / buy now), compare, "Spesso acquistati insieme" bundle, specification tabs, related products, sticky bar |
| 04 Carrello · drawer | `37:838` | Overlay: items, services, upsell, notes, totals, checkout |
| 05 Confronta prodotti | `39:687` | Nexvo comparison table with a highlight-differences toggle |

Flow: home (category tile/hero → PLP, best sellers → PDP) → PLP (card → PDP, button → cart) → PDP (add to cart / bundle →
cart, ⇄ Confronta → compare) → cart (✕ closes). Logo → home.

## MisterCucina: page `MISTERCUCINA` (`1:2`), Hyper Pillar

| Board | Node | Content |
|---|---|---|
| 01 Home | `1:1443` | Rebranded homepage (Albert Sans as a stand-in for Atyp Display, navy/orange-red, kitchen appliances) |
| 02 PLP · Cottura | `41:1026` | Type/brand/fuel filters, colour swatches, grid with promo tile |
| 03 PDP · Smeg Concerto CX91GMBL | `43:1421` | Buy box with MisterCucina services, "Completa la cucina" bundle, specifications, related products |
| 04 Carrello · drawer | `43:1932` | Overlay with free-shipping bar, services, extended-warranty upsell, gift wrap and order note |
| 05 Chi siamo | `47:1780` | Pillar "Our story" page: claim, values, method, categories, call to action |

## Trovaincasso: page `TROVINCASSO` (`1:3`), Hyper (B2B/wholesale preset)

| Board | Node | Content |
|---|---|---|
| 01 Home | `1:2867` | Rebranded homepage (Space Grotesk, dark green/green/yellow, built-in appliances) |
| 02 PLP · Piani cottura | `42:989` | The live site's filters (category by width, availability "Spedizione rapida / 7/15 gg / 10/30 gg", brand, special), page size 36/72/108 |
| 03 PDP · Samsung NZ84T9747UK | `46:1331` | Quantity price table for professionals (Hyper "Quantity pricing"), GR3V extended warranty, delivery rules, appliance package |
| 04 Carrello · drawer | `46:1805` | Overlay with VAT number / SDI field (B2B), courier note |
| 05 Area professionisti · Ordine rapido | `48:1647` | Hyper "Quick order list": search by code or EAN, CSV upload, list vs net prices, quantities, totals |

## To confirm with the client (placeholders in the design)

- **MisterCucina:** phone ("Numero da definire"), email `info@mistercucina.com`, address, free-shipping threshold
  (99 €), and service prices (installation 79 €, warranty 89,99 €). mistercucina.com could not be read.
- **TamTam Price:** service prices (installation 49 €, warranty 59,99 €), the review count on the PDP, and that
  "Black Week" is still the current promo.
- **Trovaincasso:**
  - delivery/installation/pickup service prices;
  - the quantity price tiers;
  - the professional net prices ("a titolo di esempio");
  - the "Azienda di esempio" account.
- **Everywhere:**
  - Customer names in testimonials and the countdown values are placeholders.
  - Technical specs come only from what the product names state (capacity, width, energy class, fuel). Check the
    other specs against the manufacturer data sheets.
- **Fonts:** Atyp Display is not in Figma. Install it in the team (or as a shared font) and change the
  `MisterCucina/*` text styles. The homepage texts use Albert Sans directly.

## Known limitations

- The homepages are still the imported absolute-position layouts. The new boards use auto-layout, variables, text
  styles and components.
- Homepage photos: since 2026-11-10 the homepages use AI lifestyle photos made with Higgsfield from the real products.
  See [ai-photos.md](ai-photos.md). The boards (PLP, PDP, cart, …) still use the white-background product photos.
- Desktop only. Mobile versions of the boards are the natural next step.
