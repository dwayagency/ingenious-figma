# Figma file overview – Ingenious Holding Shopify

fileKey `jvPNNsPKD8nbvPFUqfd2WH` · 3 pages · desktop only (1920 px) · light theme only

## 1. Common page anatomy

All three homepages share the same skeleton, which comes from the Hyper theme:

```
1920w light                       ← page frame (1920 × ~10–11.5k)
└─ Container
   ├─ sections: header-group      ← announcement bar (y 0, h 44–48)
   │    left links (Help Center · Find a Store · Contact) · centred promo text ·
   │    country/currency selector "United States (USD $)" · social icons
   ├─ Container › Header          ← main header (h 132–145)
   │    logo · predictive search ("What are you looking for?" + "All Categories") ·
   │    Find a Store · Account · Cart · primary nav (mega-menu items)
   ├─ Main                        ← ~20 homepage sections stacked vertically (see page docs)
   ├─ (Section - sections: footer-group › multicolumn-icon)  ← contact strip, MisterCucina + Trovincasso
   └─ Footer                      ← link columns, payments, localisation, copyright
└─ Button dialog                  ← vertical "Special offers" tab fixed to the right edge
Dialog                            ← newsletter popup (overlay 1920×1200, card 880×442)
```

Content width is **1650 px** with a **135 px** side gutter (x = 135 → 1785).

### Section types used (Hyper theme blocks)

| Theme block | TamTam | MisterCucina | Trovincasso |
|---|:-:|:-:|:-:|
| Collection list (circle/card icons) | ✓ | ✓ | ✓ (×2) |
| Hero: slideshow or banner grid | banner grid | banner grid | slideshow |
| Icon features / USP bar | ✓ | ✓ (×2) | ✓ |
| Product carousel (tabs optional) | ✓ (×2) | ✓ | ✓ (×2) |
| Countdown / flash-sale bar (`FLASH30`) | ✓ | ✓ | ✓ |
| Collection tabs + lifestyle image | ✓ | — | ✓ |
| Slideshow with product / video | ✓ | — | — |
| Image-with-text "about us" + marquee | ✓ | — | ✓ |
| Banner with tabs | ✓ | — | — |
| Product bundles ("Buy 2 get 20% OFF") | ✓ | ✓ (shop the look) | — |
| Comparison table | ✓ | — | — |
| Lookbook / hotspots ("Shop this look") | — | ✓ | ✓ |
| Testimonials | ✓ | ✓ (×2) | ✓ (×2) |
| Brand logos | ✓ | ✓ | — |
| Popular-search pills | ✓ | ✓ | ✓ |
| Instagram grid ("We're on Gram") | — | ✓ | ✓ |
| Newsletter section | footer | ✓ | footer |

## 2. Design tokens actually in use

No tokens are defined in Figma. These are the raw values found on the canvas.

### Typography

| | TamTam Price | MisterCucina | Trovincasso |
|---|---|---|---|
| Family | **Archivo** | **Bricolage Grotesque** | **Instrument Sans** |
| Body | Regular 15 | Medium 15 | Medium 15 |
| Emphasis/labels | Bold 15 / Bold 12 / Bold 10 | Bold 15 / Bold 12 | Bold 15 / SemiBold 15 / Bold 12 |
| Section heading (H2) | Bold 40 | Bold 40 | Bold 32 / 40 |
| Card titles (H3) | Bold 18 / 22 / 28 / 32 | Bold 18 / 22 / 28 / 32 | Bold 18 / 22 / 28 |
| Display | Bold 52 | Bold 52 | Bold 70 |

### Colour

| Role | TamTam Price | MisterCucina | Trovincasso |
|---|---|---|---|
| Text primary | `#000000` | `#000000` | `#000000` |
| Text secondary | `#4D4D4D` | `#4D4D4D` | `#666666` |
| Surface | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| Light grey surface | `#EFEFEF` / `#EBEBEB` | `#E0DED9` / `#E8DED4` | `#EDEDED` / `#E3E3E3` |
| Sale / badge red | `#C4301C` / `#CB321E` | `#C4301C` | `#C4301C` |
| "New" badge green | `#27923B` | `#359679` | — |
| Brand accent 1 | `#1C52D7` (blue) | `#113534` (deep green, announcement bar and newsletter) | `#1D349A` (cobalt, header and Instagram band) |
| Brand accent 2 | `#FFC573` / orange (flash bar) | `#FFE093` / `#EAD8AB` (sand/yellow) | `#F4F691` (lime: flash bar, testimonials) |
| Dark band | `#232323` | `#5E2723` (maroon USP band) | — |

### Radius

`10` (cards, images) · `100` / `999` (pills, buttons, circular icons) · `24` · `40` · `6` · `16`

## 3. Placeholder content to replace on every page

The following still holds the demo data:

- **Logo** in header and footer: `Nexvo` / `Pillar` / `HYPER`
- **Copyright**: `© 2026 Hyper Nexvo|Pillar|Garace. Powered by Shopify`
- **Contact strip**: `+1 888-234-1234 (tool-free)` (typo: should read "toll-free"), `Mon-Sat, 9am-6pm EST.`,
  `382 NE 191st St # 87394 Miami`, `touch@nexvostore.com|masonstore.com|garacestore.com`
- **Announcement bar**: free-shipping threshold ($120 / $500) and the currency `United States (USD $)`.
  The brands are Italian, so this should probably be Italy / EUR €
- **Copy language**: all text is English
- **Social / Instagram handles**: `@mason.studio`, `thisisaaccount`, `furniturelover`, `baddyjam`
- **Brand logos**: demo brands (Marshall, JBL, Libreria, Lalibu, Blanca, …)
- **Discount codes**: `FLASH30`, popup "Get 10% OFF", "Sexy and sustainable goodies? Sign me up"
- **Countdown values** (static: 24 : 15 : 0x : xx)

## 4. Observations

1. **MisterCucina uses an apparel template.** The page shows jackets, socks, hats and puffers, which does
   not match a kitchen brand. Either the content needs a full swap to kitchenware, or the base
   preset should change.
2. **TamTam Price** fits its electronics demo. **Trovincasso** fits its furniture/home demo.
3. **Desktop only.** There are no mobile (375/390 px) or tablet frames.
4. **Only the homepage.** There are no collection, product (PDP), cart or about pages.
5. Because nothing is componentised, a global change (for example the logo or the footer) has to be
   made three times. Turning the header and footer into components per page would make later edits
   cheaper.

## 5. Working with the file through the MCP connector

- Read the structure first: `get_metadata(fileKey, nodeId)`. The page-level output is about 170 KB, so
  query a section id instead (see the section tables in each page doc).
- Render: `get_screenshot(fileKey, nodeId)`.
- Edit: `use_figma` with Plugin API JavaScript. Load the `figma-use` skill first, and also
  `figma-generate-design` for visible changes.
- Text edit recipe:
  ```js
  const n = await figma.getNodeByIdAsync('1:5628');
  for (const s of n.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName);
  n.characters = '© 2026 TamTam Price. Powered by Shopify';
  return { mutatedNodeIds: [n.id] };
  ```
- Node ids in these docs are a snapshot from 2026-11-06. Re-check with `get_metadata` if the file has
  been restructured since then.
