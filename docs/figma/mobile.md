# Mobile versions (2026-11-10)

Each brand page has a **mobile row at 390 px** (iPhone 14/15 width) below the desktop boards, with its own flow
starting point "`<brand> · Prototipo mobile`". Press Present on the page and choose the mobile flow. The screens follow
how the Hyper theme behaves on mobile:
- hamburger menu in a side drawer;
- search bar under the logo;
- horizontal carousels;
- 2-column product grid;
- filters in a bottom sheet;
- accordions on the product page;
- a sticky add-to-cart bar (set to *Fixed* on scroll).

The screens use auto-layout, the `Brand · <brand>` variables, the `<brand>/*` text styles and the desktop
`Bottone / Primario|Secondario` components. Homepage photos reuse the AI images from the desktop slots
(see [ai-photos.md](ai-photos.md)), cropped for mobile.

Renders: [../screenshots/mobile/](../screenshots/mobile/) (`<brand>-mobile-overview.jpg` and one PNG per screen).

## Mobile components (frame `Componenti mobile · <brand>`)

| Component | Notes |
|---|---|
| `Mobile / Barra annunci` | 36 px, inverse surface |
| `Mobile / Header` | Menu, search, logo, account, cart with count. Its prototype links (menu → drawer, cart → cart, logo → home) are set on the component, so they work on every screen |
| `Mobile / Card prodotto` | 171 px. Props: Nome, Marca, Prezzo, Prezzo barrato, Mostra prezzo barrato, Badge, Mostra badge (Trovaincasso also has Disponibilità). Swap the photo on the `Immagine` layer |
| `Mobile / Footer` | Newsletter card, accordion links, contacts, payments, legal line |

## Screens and node ids

| Screen | TamTam Price (`0:1`) | MisterCucina (`1:2`) | Trovaincasso (`1:3`) |
|---|---|---|---|
| Components frame | `110:953` | `115:2706` | `118:2482` |
| M01 Home | `110:1048` | `115:2836` | `118:2580` |
| M02 Category | `112:1186` Lavatrici | `116:3062` Cottura | `119:2729` Piani cottura (pro-price bar) |
| M03 Product | `112:1476` Bosch Serie 6 | `116:3398` Smeg Concerto | `119:3037` Samsung NZ84 (quantity prices) |
| M04 Cart (overlay) | `114:1453` | `117:3398` | `122:3009` (P.IVA / SDI fields) |
| M05 Brand screen | `114:1526` Confronta | `117:3471` Chi siamo | `122:3070` Ordine rapido |
| M06 Menu (overlay) | `110:1518` | `115:3383` | `118:3111` |
| M07 Filters (overlay) | `112:1399` | `116:3304` | `119:2953` |

### Pages from the B2C tree (2026-11-13)

Same row, columns 8–14, built from the desktop boards 06–12 (see [pages-b2c.md](pages-b2c.md)).

| Screen | TamTam Price (`0:1`) | MisterCucina (`1:2`) | Trovaincasso (`1:3`) |
|---|---|---|---|
| M08 Menu · category levels (overlay) | `161:3268` Lavaggio | `163:7759` Cottura | `164:6872` Cappe |
| M09 L1 category page | `161:3314` Lavaggio | `163:7806` Cottura | `164:6912` Cappe (types as chips) |
| M10 Full cart page + invoice request | `161:3515` (private) | `163:8061` (company) | `164:7117` (company) |
| M11 Search results | `162:3473` "forno" | `165:8034` "induzione" | `166:7084` "cappa" |
| M12 Account · Sign in / register | `162:3640` | `165:8236` | `166:7259` |
| M13 Account · My orders | `162:3750` | `165:8381` | `166:7371` |
| M14 Shipping, availability and warranty | `162:3892` | `165:8558` | `166:7515` |

Renders: `<brand>-m08-menu-categoria.png` … `<brand>-m14-spedizioni.png` and `<brand>-mobile-overview-2.jpg`.

## Prototype flow

- **Header on every screen:** ☰ opens the menu drawer, the bag icon opens the cart, the logo goes to the home.
- **Home:** hero/category buttons go to the category page, product cards go to the product page.
- **Category page:** "Filtri" opens the filters sheet ("Mostra … prodotti" or ✕ closes it), cards go to the product page.
- **Product page:** "Aggiungi al carrello", the sticky bar, "Acquista ora" and the bundle button open the cart. Related
  products go back to the category page.
- **Brand screen:**
  - TamTam: "Confronta" ⇄ the product page.
  - MisterCucina: "Chiedi a un esperto" and the "Chi siamo" link in the menu.
  - Trovaincasso: the pro bar, the quantity-price table and the menu link open "Ordine rapido". "Aggiungi tutto al
    carrello" opens the cart.

- **Pages from the B2C tree** (links on the `Mobile / Header` component work on every screen):
  - the search icon opens M11 and the account icon opens M12; "Accedi" / "Crea un account" lead to M13;
  - in the menu M06, the open category (Lavaggio / Cottura / Cappe) swaps to its levels in M08, and the shipping link
    opens M14;
  - M08: "Tutte le categorie" goes back to M06, ✕ closes, "Vedi tutto …" opens M09, level-3 items open the category page;
  - M09 and M11: subcategories and suggested categories open the category page, cards open the product page;
  - in the cart overlay M04, "Vai alla cassa" opens the full cart page M10.

## Notes

- Prices, stock, service prices and the pro net prices are the same placeholders as on desktop (see
  [prototype.md](prototype.md), "To confirm with the client").
- The mobile homepages are shorter than desktop: some desktop sections were merged or turned into carousels.
  TamTam's comparison scrolls sideways (3 columns).
