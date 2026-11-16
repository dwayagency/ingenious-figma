# Stronger homepage sections and richer product page (2026-11-16)

Done first on TamTam Price, approved, then applied to MisterCucina and Trovaincasso (see the section
[MisterCucina and Trovaincasso](#mistercucina-and-trovaincasso)). Every page has backups to revert.

## Homepage (`1:4347`)

| Section | Before | Now |
|---|---|---|
| **Grandi elettrodomestici** (`1:4731`) | 6 small bordered tiles, 15 px names, tiny round photos | 6 rounded tiles 317×244 (`Categorie · griglia`): category name 24 px Black, "N prodotti · da X €", large product photo, black arrow button, red offer badge on Lavatrici and Lavastoviglie. Side image taller (500 px), new subtitle under the heading. Each tile links to the category (Lavatrici → PLP 02, Asciugatrici / Lavastoviglie → category 07). Section 171 px taller, everything below moved down (homepage now 10 461 px). |
| Eyebrow labels ("Collezioni", "chi siamo", "confronta", "perché sceglierci", "in evidenza", "novità in negozio", "Selezione TamTam", "offerte speciali") | 15 px regular/semibold, lowercase | 14 px Bold, uppercase, letter-spacing 10 %; **red** on light backgrounds, unchanged colour on photos |
| USP strip under the hero (`1:4459`) | 16 px titles, 15 px grey lines | Titles 18 px Bold, subtitle in the Body style, icons 52 px |
| Perché TamTam Price (`1:5422`) | 18 px SemiBold card titles | Card titles 24 px Black (H3); text and links moved down accordingly |
| I nostri brand (`1:5282`) | Grey text wordmarks | Real logos (Samsung, Bosch, LG, Electrolux, Smeg, Whirlpool) from `Logo marca`; Samsung and Whirlpool copied from the MisterCucina set, **LG** added (Simple Icons). The old texts are hidden, not deleted. |

"da X €" prices and product counts in the tiles are placeholders.

## Product page 03 (`37:356`, Bosch Serie 6)

- **Buy box:**
  - brand logo + "Serie 6 · Lavatrici a carica frontale" instead of "BOSCH · SERIE 6";
  - rating row with the `Stelle recensioni` component, "4,8", underlined "24 recensioni", SKU and EAN;
  - price with a red "-12%" pill and a new row "Risparmi 84,16 €" + "Prezzo più basso degli ultimi 30 giorni: 699,00 €" (Omnibus-style reference price, placeholder);
  - stock: green availability light (`Disponibilità`) + red "Solo 4 pezzi rimasti" above the stock bar.
- **In evidenza** (new, under the gallery, frame `Colonna galleria`): 4 tiles (9 kg, 1400 giri/min, classe energetica A,
  motore inverter EcoSilence Drive, from the spec table) and links to Etichetta energetica, Scheda EPREL, Manuale d'uso.
- **Recensioni** (new section after the spec tabs): summary card (4,8, stars, distribution bars, "Scrivi una
  recensione") and 3 review cards with "Leggi tutte le 24 recensioni". Names, texts and counts are **sample content**
  for the layout; real reviews will come from the reviews app.
- PDP is now 4 201 px tall.

Renders: `docs/screenshots/after/tamtam-price-01-home.png`, `docs/screenshots/after/tamtam-price-03-pdp.png`.

## How to revert

Figma's version history also has the previous state (File › Show version history). In the file itself:

- Frame **`BACKUP · TamTam prima delle modifiche del 16/11`** (`230:7443`, at x −8200) holds copies of the 4 homepage
  sections as they were: `1:4459` USP strip, `1:4731` Grandi elettrodomestici, `1:5282` I nostri brand, `1:5422`
  Perché TamTam. To revert one, move the copy into the homepage `Main` frame at the y written in its name and delete the
  new section (for Grandi elettrodomestici also move the sections below back up by 171 px).
- **`BACKUP · 03 · PDP · Bosch Serie 6 (prima del 16/11)`** (`230:7622`) is a full copy of the old product page.
- The eyebrow label restyle is not in the backup: set those texts back to 15 px, mixed case, black.

## MisterCucina and Trovaincasso

The homepages have different structures, so the same ideas were applied to the equivalent sections.

**MisterCucina (`1:2`)**
- "Acquista per reparto" (`1:1897`): category names 24 px Bold (H3), counts in the Body style + "da X €" (placeholders).
- Eyebrows (Cucinare con stile, Edizione speciale, I preferiti dai clienti, Componi la tua cucina, I nostri brand):
  14 px Bold uppercase, accent orange-red; those on photos (Collezione cucina 2026, Di tendenza, Fino a esaurimento)
  keep their colour.
- "I nostri brand": real logos (Bosch, Smeg, Electrolux, Franke, Elica; Foster is still the text placeholder).
- The navy band "Qualità, assistenza e grandi marche" and the 3 USPs above the newsletter already had 22 px titles:
  unchanged.
- PDP 03 Smeg Concerto (`43:1421`): logo row, stars "4,9 · 18 recensioni", "-15%" pill, "Risparmi 136,64 €" + 30-day
  lowest price, availability light + "Solo 3 pezzi rimasti", *In evidenza* (90 cm, 5 fuochi a gas, forno elettrico,
  classe A from the spec table) with documents, reviews section.
- Backups: frame `237:17261` (sections `1:1897` and the brand strip), PDP copy `237:17382` (x −4400).

**Trovaincasso (`1:3`)**
- "Acquista per categoria" (`1:3191`): rebuilt like TamTam's grid: 12 rounded tiles (6×2) with name 22 px Bold, short
  description, product photo, dark green arrow, yellow "Offerte" badge on Promo del mese. Section 90 px taller, content
  below moved down (homepage now 10 939 px).
- "Piani cottura sotto i 300 €" tiles (`1:3843`): names 24 px Bold, sublines in the Body style.
- "Perché scegliere Trovaincasso" cards (`1:3988`): titles 24 px Bold, texts moved down.
- Eyebrows (15 on the page): 14 px Bold uppercase, dark green on light backgrounds, unchanged colour on photos.
- No brand strip exists on this homepage.
- PDP 03 Samsung NZ84 (`46:1331`): logo row, stars "4,9 · 12 recensioni" + "Recensioni verificate Feedaty", "-17%"
  yellow pill, "Risparmi 458,72 €" + 30-day lowest price, availability light, *In evidenza* (83 cm, induzione, cappa
  aspirante integrata, incasso) with documents (scheda tecnica, manuale, dima di incasso), reviews section.
- Backups: frame `237:25423` (sections `1:3191`, `1:3843`, `1:3988`), PDP copy `237:25661` (x −8600).

Reviews, 30-day prices, "da X €" and counts are placeholders on both pages.

Renders: `docs/screenshots/after/<brand>-01-home.png`, `<brand>-03-pdp.png`, `<brand>-03-pdp-top.png`.

## Mobile (M01 home, M03 product page) — all three brands

| | TamTam Price | MisterCucina | Trovaincasso |
|---|---|---|---|
| Category grid | "Grandi elettrodomestici" grid (`110:1289`) rebuilt: 6 tiles 171×150, name 17 px Bold, "N prodotti · da X €", photo, arrow, red -30% / -20% badges | "Acquista per reparto" (`115:3145`): names 19 px Bold, "· da X €" added | "Acquista per categoria" (`118:2801`) rebuilt: 6 tiles 171×132 with name, short description, photo, arrow, yellow "Offerte" badge |
| Eyebrows | Bold uppercase 12 px, red on light backgrounds | same, accent orange-red | same, dark green |
| Titles | "Vantaggi" strip titles 14 px Bold, "Perché TamTam Price" box titles H4 | "Vantaggi" and "Qualità e servizi" titles Bold | "Perché scegliere" service cards 18 px Bold, "Offerte top" tiles 17 px Bold |
| Brand logos | "I nostri brand" (`110:1433`): real logos | "I nostri brand" (`115:3301`): real logos | — (no brand strip) |
| M03 product page | logo row, stars, "-12%" pill, savings + 30-day price, availability light + "Solo 4 pezzi rimasti", *In evidenza* 2×2 + documents, reviews (summary, bars, 2 reviews) | same for Smeg Concerto (-15%, "Solo 3 pezzi rimasti") | same for Samsung NZ84 (-17% yellow, Feedaty) |

Backups (full copies of the old screens, prototype links removed): TamTam `245:8047` (M01) and `245:8884` (M03) at
x −3000; MisterCucina `246:18775` / `246:19728` at x 11800; Trovaincasso `247:16855` / `247:17744` at x 7500, on each
page's mobile row.

The sticky "Aggiungi al carrello" bar on M03 is fixed on scroll: in full-length renders it covers one row of content,
in the prototype it stays at the bottom of the screen.

Renders: `docs/screenshots/mobile/<brand>-m01-home.png`, `<brand>-m03-pdp.png`, comparison sheets
`mobile-m01-home-confronto.jpg` and `mobile-m03-pdp-confronto.png`.
