# TamTam Price: stronger homepage sections and richer product page (2026-11-16)

Only the `TAMTAM PRICE` page (`0:1`) was changed. If the result does not convince, it can be reverted (see the
last section).

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
