# TamTam Price: enriched product cards and grid/list view (2026-11-16)

Only the `TAMTAM PRICE` page (`0:1`) was changed. MisterCucina and Trovaincasso still use their old cards.

## What a card shows now

| Content | How |
|---|---|
| Brand logo | Nested instance `Logo marca` (exposed: pick the brand from the card's properties) |
| SKU / product code | Text prop `SKU` ("Cod. WGG244ZEIT"; on the list card also the EAN) |
| Review stars | Nested instance `Stelle` (Valutazione 5 / 4.5 / 4 / 3.5) + props `Voto` ("4,6") and `N. recensioni` |
| Availability traffic light | Nested instance `Disponibilità`: **green** Disponibile, **yellow** Su ordinazione (about 30 days), **red** Non disponibile |
| Discount, stronger | Variant `Offerta=Sì`: red `-12%` badge on the photo, struck-through full price with a `-12%` pill, big red sale price, red chip "Risparmi 84,16 €" |
| No discount | Variant `Offerta=No`: big black price and "Prezzo più basso degli ultimi 30 giorni" |
| VAT | "IVA inclusa" next to the price on every card |
| Label | Prop `Etichetta` + `Mostra etichetta` ("Più scelto!", "Novità") |

Sconto % and Risparmio were calculated from the two prices; ratings and review counts are **placeholders**.

## Components (frame `Componenti card · TamTam Price`, `199:3844`, above the PLP board)

| Component set | Node | Notes |
|---|---|---|
| `Card prodotto · griglia` | `202:3953` | 300 px desktop; stretches (homepage uses 324 px). Replaces the old `Card prodotto` (`36:20`, deleted) |
| `Mobile / Card prodotto · griglia` | `202:4071` | 171 px. Replaces the old `Mobile / Card prodotto` (`110:994`, deleted) |
| `Card prodotto · lista` | `204:4119` | 1302 px desktop list row: photo, details (specs, energy class, services, Confronta), buy box (price, availability, estimated delivery, shipping cost, add to cart, favourites). Extra props: `Caratteristiche`, `Classe energetica`, `Consegna`, `Spedizione` |
| `Mobile / Card prodotto · lista` | `204:4231` | 358 px: photo left, short specs line, availability, price |
| `Logo marca` | `200:3930` | Marca × Taglia (M 20 px, S 14 px). Bosch, Beko, Electrolux, Smeg, Haier are SVGs from Wikimedia Commons; **Candy, Indesit, Foster are text placeholders**, replace them with the official logos |
| `Stelle recensioni` | `199:3982` | Valutazione × Taglia |
| `Disponibilità` | `199:4001` | Stato × Taglia |
| `Selettore vista` | `208:6425` | Vista=Griglia/Lista × Taglia (M desktop with label, S mobile) |

New variables in `Brand · TamTam Price`: `status/available` #1E9E5A, `status/backorder` #F2A900, `status/unavailable`
#D93025, `rating/star` #F5A623, `rating/empty` #D9D9D9, `price/save-bg` #FDECEC.

## Where the cards are used

All 51 existing instances were migrated (PLP 02, category 07, search 09, PDP 03 related products, mobile M01, M02,
M03, M09, M11). On the **desktop homepage** the 10 imported cards of "I più venduti" and the second product carousel
were replaced with `Card prodotto · griglia` instances; the two sections grew by 147 px each and everything below was
moved down (homepage now 10 290 px tall). The old colour-swatch dots on those cards are gone (no variants).

Examples of the three states: PLP 02 shows Disponibile, Su ordinazione (Beko WIT8A4BW) and Non disponibile (Indesit IM
862, button "Avvisami quando torna").

## Grid / list view

| Board | Node |
|---|---|
| 02 PLP Lavatrici · griglia (existing) | `36:38` (selector added in the toolbar) |
| **02b PLP Lavatrici · vista lista** | `208:6453` (x 24623, after board 12) |
| M02 Categoria · griglia (existing) | `112:1186` (selector added next to Filtri / Ordina) |
| **M02b Categoria · vista lista · mobile** | `208:7776` (mobile row, column 14) |

Prototype: the selector switches between the grid and list boards (desktop and mobile); cards open the product page;
"Aggiungi al carrello" opens the cart drawer.

Renders: `docs/screenshots/after/tamtam-price-02-plp.png`, `-02b-plp-lista.png`, `-01-home.png`, `-09-ricerca.png`,
`-componenti-card.png`; `docs/screenshots/mobile/tamtam-price-m01-home.png`, `-m02-plp.png`, `-m02b-plp-lista.png`.

## To confirm

- Real ratings and review counts (from the review app), EAN codes, delivery estimates and the shipping cost per category.
- Official logos for Candy, Indesit and Foster (and any other brand added later).
- Specs on the list card are derived from the product names (capacity, spin speed); check them against the data sheets.
