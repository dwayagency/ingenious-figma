# Header in three rows (2026-11-17, all three sites)

The header is now: **promo marquee** → **pre-header** → **header** (unchanged: logo, search, account, cart, menu).
It was done in the components, so every desktop board and mobile screen shows it.

| Row | Desktop (`Header / Barra annunci`, now 80 px = 36 + 44) | Mobile (`Mobile / Barra annunci`, now 63 px, vertical auto-layout) |
|---|---|---|
| Marquee (pre pre header) | Frame `Marquee promo (messaggi a scorrimento ←)` 1920×36: the messages repeated in a row, separated by ✦, clipped at the edges (in the theme the row scrolls right to left) | 390×30, same messages, 12 px |
| Pre-header | Left: `Widget recensioni · Feedaty` (Feedaty, 5 stars, score/5, number of reviews). Right: the useful links (Assistenza / Spedizioni / Contattaci; Trovaincasso: Aiuto / Confronta / Contattaci) and the social icons. The old centre promo text is hidden | Centred Feedaty widget (links and socials stay in the menu) |
| Header | `Header / Principale`, unchanged | `Mobile / Header`, unchanged |

Messages (the same on all sites for now): "Promo Bosch -50%", "Black Week: fino al -30% sul lavaggio", "Estensione
garanzia 1 anno gratuita". To change them, edit the texts in `Messaggi` inside the marquee of the two components (add
or remove texts and ✦ separators freely; the row is auto-layout).

| | Marquee | Pre-header | Feedaty |
|---|---|---|---|
| TamTam Price | red `price/sale`, white text | black (as before) | 4,8 · 1.250 (placeholder) |
| MisterCucina | orange `brand/accent`, white text | navy `brand/primary` + thin divider above the navy header | 4,8 · 1.250 (placeholder) |
| Trovaincasso | yellow `badge/sale`, dark green text | dark green (as before) | 4,9 · 2.087 |

**Review widget rule:** show the platform with the higher score (Trustpilot or Feedaty). Only Feedaty data is known
today, so the widget shows Feedaty; if Trustpilot scores higher, swap the name, score and count.

Side effects handled: the desktop homepages (absolute layout) moved down 36 px (TamTam 10 357, MisterCucina 11 653,
Trovaincasso 11 077 px); every other board and mobile screen uses auto-layout and adapted by itself; the `Overlay · Menu
Marche` frames got a 36 px taller header strip.

Renders: `docs/screenshots/after/<brand>-01-home.png`, `docs/screenshots/mobile/<brand>-m01-home.png`.
