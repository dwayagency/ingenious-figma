# Extended warranty, payments and energy class (2026-11-24, all three sites)

Feedback from the internal presentation: give the warranty extension more weight (PDP, minicart, cart page) with its
own small logo, show the payment options on the product page, and add the energy class to every product card.

## New components (frame `Componenti · Garanzia+ e pagamenti`, above the card components frame on each page)

| Component | What it is |
|---|---|
| `Logo garanzia estesa` (Taglia M / S) | Shield with a check mark + "Garanzia+" and "3 ANNI IN PIÙ" (M) or "3 anni" (S). TamTam red shield, MisterCucina orange-red, Trovaincasso dark green with a yellow check |
| `Garanzia+ · box` (696 px) | Product page and desktop cart page: brand-tint card with brand border, logo, "CONSIGLIATO" tag, title (override `Titolo`), three benefits with checks (riparazione o sostituzione, tecnico a domicilio, zero franchigia) and two selectable options: "Garanzia di legge · 2 anni · inclusa" / "Garanzia+ 3 anni · +price · price per month" (selected) |
| `Garanzia+ · compatto` | Minicart and mobile: logo S, tag, one-line offer, price and "+ Aggiungi" button |
| `Pagamento a rate` | "Oppure 3 rate da X senza interessi con [Klarna.] [scalapay] [PagoLight]" (wraps on mobile) |
| `Pagamento rapido` | Apple Pay (black) and Amazon Pay (yellow) express buttons |
| `Classe energetica` (Classe = A…G, A+, A++, A+++) | EU-style arrow, official colours (in the card components frame) |

Warranty prices come from each PDP's service row: TamTam 59,99 €, MisterCucina 89,99 €, Trovaincasso 129,99 €.
Apple Pay / Amazon Pay / Klarna marks are Simple Icons; **Scalapay and PagoLight are text placeholders** until the
official logos are supplied. Instalment amounts are the product price / 3.

## Where they are

| | TamTam | MisterCucina | Trovaincasso |
|---|---|---|---|
| PDP 03 / M03 | `37:356` / `112:1476` | `43:1421` / `116:3398` | `46:1331` / `119:3037` |
| Minicart 04 / M04 | `37:838` / `114:1453` | `43:1932` / `117:3398` | `46:1805` / `122:3009` |
| Cart page 08 / M10 | `149:1904` / `161:3515` | `153:5685` / `163:8061` | `154:5110` / `164:7117` |

- **Product page:** the instalments row sits right under the price (the old "Paga anche a rate…" line now reads "IVA
  inclusa"); the warranty box replaces the plain "Estensione di garanzia 3 anni" service row (hidden) and sits right
  above quantity + "Aggiungi al carrello"; Apple Pay / Amazon Pay sit under "Acquista ora", followed by a line listing
  all payment methods (desktop). On mobile the Amazon button shows only the logo.
- **Minicart:** the "Completa l'acquisto" upsell became the compact Garanzia+ block (old content hidden). Trovaincasso:
  the installation upsell moved into the service checkboxes ("Installazione a domicilio · 89,00 €") and the
  "✓ Estensione di garanzia" line was hidden. Mobile minicarts still fit in 844 px.
- **Cart page:** the former "Estensione garanzia" box (hidden) is replaced by the full box (desktop) / compact box
  (mobile).

## Energy class on product cards

All four card sets (grid, list, mobile grid, mobile list) have a `Classe energetica` instance in the photo's top-right
corner (exposed, variant `Classe`) and a boolean property **`Mostra classe energetica`**. Classes set by product type
(placeholders to check against the data sheets): washing machines A (Beko, Candy, Indesit, Hoover, Haier B), dryers
B, washer-dryers D, dishwashers D (Bosch C), fridges/freezers E, ovens A+, cookers A, hoods A (Turbo Air B).
Hidden on products without an EU energy label: hobs, sinks, microwaves, coffee machines.
Note: when the property is off, the badge disappears from the instance's layer list too, so turn it on before
changing the class.
