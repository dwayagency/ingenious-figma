# Homepages, second round: hero, first scroll and broken sections (2026-11-16)

Desktop homepages only (mobile unchanged). Every changed section was copied into the page's backup frame first.

## TamTam Price (`0:1`, homepage `1:4347`)

| Change | Details |
|---|---|
| Category strip above the hero (`1:4350`) | The 7 big category photos are now a compact **chip bar** (list `1:4351`, chips `Categoria · <name>` 229×64: 48 px photo, name, chevron, same links as before). The strip is 104 px instead of 243, everything below moved up by 139 px. The hero (big slide + 2 boxes) and the USP strip are unchanged, so the first screen reads: menu → categories → hero → advantages. |
| Section order | **"I più venduti"** (`1:4500`) now comes right after the USP strip (y 722), so products show at the first scroll. **"Grandi marche, prezzi imbattibili…"** (`1:4477`) moved below it (y 1425). |

Homepage now 10 321 px tall. Backup: the old strip in `230:7443`.

## MisterCucina (`1:2`, homepage `1:1443`)

| Change | Details |
|---|---|
| Category strip under the hero (`1:1488`) | Same compact chip bar as TamTam (7 chips: Forni, Piani cottura, Cappe, Frigoriferi, Lavastoviglie, Microonde, Macchine caffè). 173 px shorter: the countdown and "I protagonisti della cucina" now start right below the hero. |
| "I preferiti dai clienti" (`1:1857`) | The second quote spilled out of the panel and a second photo peeked in on the right: quote slider `1:1879` clipped to 686 px, panel `1:1877` 960 px, peeking image `1:1896` hidden, leftover colour-swatch dots on the product card hidden. |
| "La cucina completa" (`1:2253`) | **Shop the look:** 3 hotspots per photo (white dot with an accent centre and a soft ring, `Hotspot · shop the look`) on the Smeg kitchen and the Franke/induction kitchen, one open tooltip per photo with product name, price and "Vedi prodotto →", and an "Acquista il look · 3" pill (the old "3" buttons `1:2260` / `1:2328` and their popups are hidden). |
| Newsletter "Promo e offerte" (`1:2514`) | The heading broke over the emphasis layer: now one text "Promo e offerte, / fino al -10%" with "-10%" in the accent colour; the old emphasis `1:2517` is hidden. |

Homepage now 11 619 px tall. Backups in `237:17261` (`1:1488`, `1:1857`, `1:2253`, `1:2514`).

## Trovaincasso (`1:3`, homepage `1:2867`)

| Change | Details |
|---|---|
| Hero "Piani aspiranti" (slides `1:2951` and `1:2973`) | Left-aligned text block `Hero · testo` on a dark green gradient (`Overlay leggibilità`): yellow eyebrow "NOVITÀ 2026 · PIANI ASPIRANTI", title **"La cappa ora è nel piano."** 84 px, two-line subtitle on integrated extraction, CTAs "Scopri i piani aspiranti →" (yellow) and "Come scegliere" (outline), line "Da 899 € · Spedizione 24/48h · Estensione garanzia 3 anni". The old centred texts are hidden. |
| "Acquista per categoria" tile | "Promo del mese" renamed **"Offerte del mese"**, yellow "Offerte" badge removed (desktop `237:25801`, mobile tile in `118:2801`). |
| Reviews with product (`1:3344`) | Same fix as MisterCucina: quote slider `1:3366` clipped to 686, panel `1:3364` 960, peeking image `1:3383` hidden, swatches hidden. |
| Forni / Lavastoviglie promos (`1:3570`) | Eyebrow "OFFERTA A TEMPO · FINO A ESAURIMENTO", titles "Forni da incasso" / "Lavastoviglie da incasso" 38 px, **"fino al -40%" / "-30%" at 108 px** with the line next to it, "Acquista" button at the bottom. The small round "Risparmia" badges are hidden. |
| Pills row below (`1:3597`) | The 10 pills overlapped by 8 px: now spaced 12 px apart; the row scrolls and fades out on the right. |
| Ticker below "Offerte top" (`1:3945`) | Was only Forni / Piani cottura / Cappe: added Lavastoviglie, Frigoriferi, Congelatori, Macchine caffè, Lavelli, Lavatrici, Microonde, Accessori, with the product photos of the category tiles. |

Backups in `237:25423` (`1:2951`, `1:3344`, `1:3570`, `1:3597`, `1:3945`, `237:25801`).

## Placeholders

- Hotspot products and prices, "Da 899 €" on the Trovaincasso hero, the "-10%" newsletter offer, promo percentages.
- "Come scegliere" has no target board yet.

## How to revert

Move the copy from the backup frame back into the homepage `Main` frame at the y written in its name, delete the new
section, and move the sections below by the same height difference (TamTam +139 px, MisterCucina +173 px for the chip
bars). For the TamTam section order, swap the y of `1:4500` and `1:4477` back. Figma's version history also has the
previous state.

Renders: `docs/screenshots/after/<brand>-01-home.png`.
