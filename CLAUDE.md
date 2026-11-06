# Ingenious Holding – Shopify storefront designs (Figma context)

This repo holds the **design context** for the Figma file that contains the Shopify
storefront homepages of the Ingenious Holding brands. There is no application code yet.
Edits are made **directly in Figma** through the Figma MCP connector (`use_figma`).

## Figma file

| | |
|---|---|
| File | Ingenious Holding Shopify |
| URL | https://www.figma.com/design/jvPNNsPKD8nbvPFUqfd2WH/Ingenious-Holding-Shopify |
| fileKey | `jvPNNsPKD8nbvPFUqfd2WH` |

## Pages → brand → base theme preset

Each page holds one brand's desktop homepage. Every page was built by capturing a demo preset of the
Shopify **"Hyper"** theme as HTML and importing it into Figma. The copy, logos, product names, emails and
copyright lines are therefore still the **demo placeholder content**, not the brand's own.

| Figma page (id) | Brand | Demo preset captured | Demo vertical | Font family | Doc |
|---|---|---|---|---|---|
| `TAMTAM PRICE` (`0:1`) | TamTam Price | Hyper **Nexvo** | Consumer electronics | Archivo | [docs/figma/tamtam-price.md](docs/figma/tamtam-price.md) |
| `MISTERCUCINA` (`1:2`) | MisterCucina | Hyper **Pillar** | Men's apparel | Bricolage Grotesque | [docs/figma/mistercucina.md](docs/figma/mistercucina.md) |
| `TROVINCASSO` (`1:3`) | **Trovaincasso** (trovaincasso.it) | Hyper **Hyper** (default preset; demo store "Garace", logo reads "HYPER") | Furniture / home | Instrument Sans | [docs/figma/trovincasso.md](docs/figma/trovincasso.md) |

All three brands sell **home appliances** (elettrodomestici). They belong to the same group (Mosciano Sant'Angelo, TE).

Shared structure, tokens and editing rules: [docs/figma/overview.md](docs/figma/overview.md).
**Brand styles (restyling, authoritative):** [docs/brand/brand-tokens.md](docs/brand/brand-tokens.md), with the source files in `docs/DESIGN/`.
**Content from the live sites (structure, copy, products only):** [docs/content/content-research.md](docs/content/content-research.md).
Full node trees (ids, names, positions, sizes): `docs/figma/raw/*.metadata.xml`.
Full-page renders: `docs/screenshots/after/*.png` (current) and `docs/screenshots/before/*.png` (template originals).

## Things to know before editing

- **Use the styles in `docs/DESIGN`, not the live sites.** The brands have been restyled. Use the live sites only for
  structure, copy, photomontages and product images.
- **Current state (2026-11-06):** all 3 homepages are rebranded and each page has 4 prototype boards, a brand kit
  and components. See [docs/figma/prototype.md](docs/figma/prototype.md) for node ids, flows and placeholders.
- **Access and limits:** the file lives in the *Alessandro Molinari DWAY* team (Education plan). The connector is
  limited to 200 calls/day and 10/minute, and a collection can have only **1 variable mode**. Variables are therefore
  split into 3 collections `Brand · <brand>`.
- **Prefer reuse:** for new boards, use the `Card prodotto` / `Bottone` components, the `Brand · <brand>` variables
  and the `<brand>/*` text styles. Use the `Header / *` and `Footer*` components, which live on the homepage. Product
  photos are on the `ASSETS · Foto prodotto` page; reuse their `imageHash`.

- **Homepages (imported):** no auto-layout. Every frame (~750–800 per page) is absolutely positioned. If you change a text
  length or a section height, you have to move its siblings and the sections below it yourself, or
  convert that area to auto-layout first.
- **Layer names come from HTML.** Expect names like `Background`, `Section`, `Mask Group`,
  `motion-element → Picture → …`, `Heading 3 → Link → …`. A layer's name often holds its alt text or label,
  so search by name substring (`[name*=…]`).
- **Each page has 3 top-level frames:** `1920w light` (the homepage at 1920 px wide), `Dialog` (the
  newsletter popup at 1920×1200) and, inside `1920w light`, a `Button dialog` side tab ("Special offers").
- **Fonts:** load the node's current font before you edit any text. After the rebrand, the fonts in use are
  **Poppins** (TamTam), **Albert Sans** (MisterCucina, standing in for Atyp Display) and **Space Grotesk**
  (Trovaincasso: Light/Regular/Medium/Bold only).
- Switch pages with `await figma.setCurrentPageAsync(...)`, once per `use_figma` call. To work on
  several pages, run one call per page in parallel.
