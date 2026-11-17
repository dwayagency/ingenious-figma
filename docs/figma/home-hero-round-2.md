# Homepages, second round: hero, first scroll and broken sections (2026-11-16)

Desktop homepages, then mobile M01 (see [Mobile](#mobile-m01)). Every changed section was copied into a backup first.

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
| Hero "Piani aspiranti" (slides `1:2951` and `1:2973`) | Left-aligned text block `Hero · testo` on a dark green gradient (`Overlay leggibilità`): yellow eyebrow "NOVITÀ 2026 · PIANI ASPIRANTI", title **"La cappa ora è nel piano."** 84 px, two-line subtitle on integrated extraction, CTA "Scopri i piani aspiranti →" (yellow), line "Da 899 € · Spedizione 24/48h · Estensione garanzia 3 anni". The old centred texts are hidden. |
| "Acquista per categoria" tile | "Promo del mese" renamed **"Offerte del mese"**, yellow "Offerte" badge removed (desktop `237:25801`, mobile tile in `118:2801`). |
| Reviews with product (`1:3344`) | Same fix as MisterCucina: quote slider `1:3366` clipped to 686, panel `1:3364` 960, peeking image `1:3383` hidden, swatches hidden. |
| Forni / Lavastoviglie promos (`1:3570`) | Eyebrow "OFFERTA A TEMPO · FINO A ESAURIMENTO", titles "Forni da incasso" / "Lavastoviglie da incasso" 38 px, **"fino al -40%" / "-30%" at 108 px** with the line next to it, "Acquista" button at the bottom. The small round "Risparmia" badges are hidden. |
| Pills row below (`1:3597`) | The 10 pills overlapped by 8 px: now spaced 12 px apart; the row scrolls and fades out on the right. |
| "Lasciati ispirare: cucine complete" (`1:3384`) | **Shop the look**, like MisterCucina: 3 hotspots per photo (white dot, dark green centre, soft ring) on the Smeg kitchen (`1:3387`) and the coffee-machine kitchen (`1:3439`), one tooltip each ("Smeg Concerto 90 · 778,36 €", "Bosch CTL7181B0 · 2.183,64 €" + "Vedi prodotto →"), pill "Acquista il look · 3" in place of the bare "3" buttons. Mobile "Lasciati ispirare" (`118:2848`): the "+" hotspots restyled the same way, a third hotspot per photo. |
| Ticker below "Offerte top" (`1:3945`) | Was only Forni / Piani cottura / Cappe: added Lavastoviglie, Frigoriferi, Congelatori, Macchine caffè, Lavelli, Lavatrici, Microonde, Accessori, with the product photos of the category tiles. |

Backups in `237:25423` (`1:2951`, `1:3384`, `1:3344`, `1:3570`, `1:3597`, `1:3945`, `237:25801`).

## Mobile (M01)

| | TamTam Price (`110:1048`) | MisterCucina (`115:2836`) | Trovaincasso (`118:2580`) |
|---|---|---|---|
| Categories | Round 88×110 carousel (`110:1089`) → compact chips (34 px photo + name), section 70 px instead of 134 | Same (`115:2942`), 70 px instead of 142 | Round circles kept; tile "Offerte del mese" without badge (`118:2801`) |
| First scroll | "I più venduti" was already right after the advantages | — | — |
| Hero | unchanged | unchanged | "Hero · Piani aspiranti" (`118:2662`): dark green gradient, yellow eyebrow, title "La cappa ora è nel piano." 42 px, subtitle, yellow CTA "Scopri i piani aspiranti →", USP line |
| Shop the look | — | "Set incasso completo" (`115:3256`): 3 hotspots on the photo, tooltip "Elica Cruise IX 90 · 288,25 €", pill "Acquista il look · 3" | — |
| Promos | — | — | "Promozioni" (`118:2879`): eyebrow "OFFERTA A TEMPO", titles "Forni / Lavastoviglie da incasso" 22 px, "-40%" / "-30%" 58 px |

Already fine on mobile, so unchanged: the reviews blocks ("I preferiti dai clienti"), the MisterCucina newsletter
("Promo e offerte, fino al -10%" in the footer). The Trovaincasso pills row and ticker exist only on desktop.

Backups: copies named `BACKUP M01 · <section> (prima del 16/11)` at x −900 from each M01 screen.

Renders: `docs/screenshots/mobile/<brand>-m01-home.png`.

## Placeholders

- Hotspot products and prices, "Da 899 €" on the Trovaincasso hero, the "-10%" newsletter offer, promo percentages.

## How to revert

Move the copy from the backup frame back into the homepage `Main` frame at the y written in its name, delete the new
section, and move the sections below by the same height difference (TamTam +139 px, MisterCucina +173 px for the chip
bars). For the TamTam section order, swap the y of `1:4500` and `1:4477` back. Figma's version history also has the
previous state.

Renders: `docs/screenshots/after/<brand>-01-home.png`.

## Proposal: band under the TamTam hero (2026-11-17, not applied yet)

The 4 generic advantages under the hero (`1:4459`: consegna al piano, resi 14 giorni, supporto, pagamenti sicuri)
should be replaced. The comparison board **`PROVA · Fascia sotto la hero · TamTam (17/11)`** (`280:8735`, x 27200 on
the TamTam page) shows the first screen of the homepage in 4 versions, with the 1920×1080 fold line:

| Version | Frame | Band |
|---|---|---|
| Current | `280:8739` | the 4 advantages |
| **A · Mix** | `280:10470` | `280:12196`: Feedaty score (4,8 + stars + "1.250 recensioni verificate"), "3 rate" senza interessi con PayPal e Klarna, "3 anni" di estensione garanzia, "0 €" ritiro dell'usato |
| **B · Carosello marchi** | `280:12243` | `280:13969`: "I migliori marchi" + 8 logo tiles (Samsung, Bosch, LG, Electrolux, Smeg, Whirlpool, Beko, Haier) + arrow |
| **C · Feedaty + marchi** | `280:14056` | `280:15782`: Feedaty box + 7 logo tiles + arrow |

All bands are 102 px, like the current strip, so nothing below moves. Logo tiles link to the PLP (`36:38`) as a stand-in
for the brand archive. The previews are clones of the homepage with prototype links removed; the live homepage is
unchanged. Placeholders: Feedaty score and count, the instalment providers.

Render: `docs/screenshots/after/tamtam-price-prova-fascia-hero.png`.
