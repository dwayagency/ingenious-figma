# Enriched product cards and grid/list view (2026-11-16)

Done on all three pages: TamTam Price first, then MisterCucina and Trovaincasso (same components, rebranded).
The TamTam sections below describe the components; the per-brand node ids are in
[MisterCucina and Trovaincasso](#mistercucina-and-trovaincasso).

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
| `Logo marca` | `200:3930` | Marca × Taglia (M 20 px, S 14 px). Bosch, Beko, Electrolux, Smeg, Haier are SVGs from Wikimedia Commons; on TamTam **Candy, Indesit, Foster are text placeholders** (the MisterCucina / Trovaincasso sets already have the real Candy and Indesit logos) |
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

**Rule (2026-11-17):** the boards show only **green** (Disponibile, 3/5 giorni) and **yellow** (Su ordinazione, circa 30
giorni). The red `Non disponibile` variant stays in the `Disponibilità` component for the theme, but no card, filter or
list on the boards uses it; the three colours are shown together only on the shipping pages (12 and M14). The former red
examples (Indesit IM 862 on TamTam, Electrolux FR53R on MisterCucina, Foster Veronika on Trovaincasso, in 02, 02b, M02,
M02b and the TamTam brand boards 02c / M02c) are now available, with "Aggiungi al carrello". Trovaincasso: the
"Non disponibile · avvisami" filter option was removed (02, 02b, M07) and the quick-order row (05) reads "Su
ordinazione · 30 gg".

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

## MisterCucina and Trovaincasso

The TamTam `Componenti card` frame was cloned on each page and rebranded: variables of the brand collection, the
brand's text styles (Albert Sans / Space Grotesk), the brand's `Bottone / Primario`. Discount badge and "Risparmi"
chip use `badge/sale` with `text/on-accent`: orange-red with white on MisterCucina, **yellow with dark green** on
Trovaincasso. The availability text on Trovaincasso reads "Disponibile · spedizione in 24/48h".

| | MisterCucina (`1:2`) | Trovaincasso (`1:3`) |
|---|---|---|
| Frame `Componenti card · <brand>` | `213:12149` | `220:11071` |
| `Card prodotto · griglia` | `213:12400` | `220:11410` |
| `Mobile / Card prodotto · griglia` | `213:12454` | `220:11464` |
| `Card prodotto · lista` | `213:12512` | `220:11522` |
| `Mobile / Card prodotto · lista` | `213:12610` | `220:11620` |
| `Logo marca` | `213:12307` | `220:11229` |
| `Stelle recensioni` / `Disponibilità` | `213:12151` / `213:12288` | `220:11073` / `220:11210` |
| `Selettore vista` | `213:12668` | `220:11678` |
| 02 PLP griglia (selector added) | `41:1026` Cottura | `42:989` Piani cottura |
| **02b PLP vista lista** | `219:15226` | `223:13580` |
| M02 griglia (selector added) | `116:3062` | `119:2729` |
| **M02b vista lista · mobile** | `219:16903` | `223:15023` |

- Migrated instances: 56 on MisterCucina, 51 on Trovaincasso. The old `Card prodotto` / `Mobile / Card prodotto`
  components were deleted on both pages.
- **Homepages:**
  - MisterCucina: the 10-card "I protagonisti della cucina" grid and the two 3-card sliders ("Il meglio della cottura",
    "Il meglio del freddo") now use `Card prodotto · griglia` (homepage 11 792 px tall).
  - Trovaincasso: both 6-card carousels ("Novità" and the second one) use the new card; the "Kit cucina da incasso"
    promo tile was kept and stretched to the card height; leftover template cards ("Arc Chair", "Sola Vase" …) were removed.
    The hand-typed code "SMG-909010" on the Smeg card was kept as its SKU (homepage 10 849 px tall).
- Logos added: Franke, Neff, Elica, Candy, Indesit, Schock (SVG from the brands' websites), Whirlpool (Wikimedia
  Commons), Samsung (Simple Icons). Text placeholders: Foster, Turbo Air, Plados.
- Renders: `docs/screenshots/after/<brand>-01-home.png`, `-02-plp.png`, `-02b-plp-lista.png`, `-componenti-card.png`;
  `docs/screenshots/mobile/<brand>-m02-plp.png`, `-m02b-plp-lista.png`.

## To confirm

- Real ratings and review counts (from the review app), EAN codes, delivery estimates and the shipping cost per category.
- Official logos for Foster, Turbo Air and Plados (and any other brand added later). Check that the logos taken from the brands' websites may be used.
- Specs on the list card are derived from the product names (capacity, spin speed); check them against the data sheets.
