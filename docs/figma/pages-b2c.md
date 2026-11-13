# New pages and changes from the B2C tree and the requirements (2026-11-12)

Sources (provided by the client, not in the repo):
- "Albero di navigazione B2C · solo struttura" (PDF);
- "Relazione di analisi, raccolta requisiti e accettazione flussi" v1.0 by DWAY, 06/11/2026 (PDF).

## What changed on the existing screens

| Requirement (document section) | Change in Figma |
|---|---|
| New category tree | The desktop header menu (component `Header / Principale`) now shows Tutte le categorie · Cottura · Cappe · Freddo · Lavaggio · Lavelli e miscelatori · Piccoli elettrodomestici · Accessori · Offerte/Promo. The old items are only **hidden**. The mobile menus (M06) list the same categories. The PLP subcategories and filters follow the tree. |
| **No variants** (3.1.1, "Non sono previste varianti") | The width/colour/capacity selectors were removed from the product pages (desktop 03 and mobile M03). In their place there is "Altre misure e colori/finiture", with links to other products or collections: each model is a separate product (1 EAN = 1 product, §4.2). |
| Availability (2.3.1, 2.3.5–6) | 3 states: **Disponibile** (3/5 working days; on Trovaincasso, dispatch in 24/48h), **Su ordinazione** (internal-supplier products that are out of stock, delivery in about 30 days, date editable), **Non disponibile · avvisami**. External-supplier products with negative stock are not imported, so they never appear. |
| Warranty (2.3.11) | "Estensione di garanzia **3 anni**" everywhere. Before, MisterCucina had 5 years and Trovaincasso had "GR3V-5000". |
| **B2B out of scope** (2.4, 5.4) | Trovaincasso: removed the PDP quantity price table, the "professionisti" bar on the mobile PLP, the "Area professionisti" menu item and the VAT number field in the cart. The "Ordine rapido" boards (`48:1647`, `122:3070`) stay with a red "FUORI PERIMETRO MVP" banner, as a reference for a later phase. |
| Mockup feedback (7.2) | MisterCucina: more orange. The primary button (`Bottone / Primario`) and the announcement bars (desktop and mobile) now use `brand/accent` #CA442E. |

## New desktop boards (06–12, on each brand page)

| Board | TamTam Price (`0:1`) | MisterCucina (`1:2`) | Trovaincasso (`1:3`) |
|---|---|---|---|
| 06 Menu · Tutte le categorie (overlay) | `148:1500` (Lavaggio open) | `151:5211` (Cottura) | `152:4747` (Cappe) |
| 07 L1 category page | `148:1670` Lavaggio | `151:5431` Cottura | `152:4900` Cappe (7 types) |
| 08 Full cart page | `149:1904` (invoice: private) | `153:5685` (company) | `154:5110` (company) |
| 09 Search results | `149:2285` "forno" | `153:6093` "induzione" | `154:5463` "cappa" |
| 10 Account · Sign in / register | `150:2509` | `155:6346` | `156:5624` |
| 11 Account · My orders | `150:2811` | `155:6676` | `156:5899` |
| 12 Shipping, availability and warranty | `150:3134` | `155:7027` | `156:6195` |

Renders: `docs/screenshots/after/<brand>-06-menu.png` … `<brand>-12-spedizioni.png`.

### Content notes

- **Megamenu (06):**
  - The left column has the three groups (Grande elettrodomestico, Piccolo elettrodomestico, Accessori) with their categories. The centre has levels 2 and 3 of the open category, plus a promo photo.
  - Interpretation to confirm: the tree is used at **3 levels** (category › subcategory › type, e.g. Cottura › Forni › Forni multifunzione). The group is only a menu heading, as the document's request to "rimodellare i 4 livelli in 3" implies.
  - Exception: under "Piccolo elettrodomestico" the tree has one more level (Preparazione cibi › Planetarie e robot › Planetarie). This needs checking when the menu is set up in Shopify.
- **Cart (08):**
  - Shipping is calculated **per category** (2.3.10). The category tariffs have not been received yet, so the amounts are placeholders.
  - The 3-year warranty is offered as an add-on.
  - **Invoice request:** private person (first name, last name, validated tax code, SDI filled in automatically with 0000000) or company (company name, validated VAT number, SDI code or PEC).
  - The invoice fields are on the **cart page** and not in the checkout: on Shopify Advanced (not Plus) the checkout steps cannot get extra fields. The data travels as cart attributes/notes, with validation by an app or theme script. This needs confirming with the developers.
- **Orders (11):** the tracking number is entered by hand (automatic tracking is outside the MVP, §5.1 and §6.1).
- **12:** availability legend, table of shipping costs by category (placeholders), 3-year warranty, 14-day returns, invoice, FAQ.

### Prototype

All the links are on the desktop header component, so they work on every board:
- "Tutte le categorie" opens 06;
- the open category goes to 07, the other categories go to the PLP;
- the search bar goes to 09;
- account goes to 10, and from 10 "Accedi"/"Crea account" goes to 11;
- "Spedizioni" in the announcement bar goes to 12.

Megamenu and category-page items lead to the PLP. Cards lead to the PDP. In the cart drawer (04), "Vai alla cassa" leads to the cart page 08.

## Open points to confirm with the client

1. Shipping tariffs by category (2.3.10). The values in the design are only examples.
2. Number of levels in the menu (group + 3 levels) and the extra level under Piccolo elettrodomestico.
3. Where the invoice fields go (cart vs checkout) and which app validates the tax code / VAT number. Proposal: the custom cart block in `shopify/invoice-request/` (or the Fatture Italia app). Also decide whether to turn off "Acquista ora" (express checkout) on the product pages, since it skips the cart.
4. Delivery time of "su ordinazione" products (about 30 days, editable) and the exact wording of the 3 states.
5. Bundles (7.1): technically feasible with the free **Shopify Bundles** app (fixed bundles of separate products, no variants needed). The "Spesso acquistati insieme" / "Pacchetto incasso" blocks on the PDPs follow this model.
6. Free shipping above 99 € (MisterCucina homepage) and "consegna al piano gratuita" (TamTam): do these stay alongside the per-category tariffs?
7. The Trovaincasso header contained elements I did not create (e.g. "Libera Installazione", "Lavelli e bagno" twice). I hid them, I did not delete them.

## Mobile versions

Done on 2026-11-13: screens M08–M14 on each page, wired into the mobile flow. Node ids in [mobile.md](mobile.md).

## Invoice data (point 3)

Theme code for the cart block is in [`shopify/invoice-request/`](../../shopify/invoice-request/README.md): validation of
codice fiscale, partita IVA, SDI and PEC, storage as cart attributes (→ order `note_attributes`), checkout blocked until
the data is valid, optional VIES check. The README also compares the ready-made apps.
The example VAT number in the designs is now `IT01234560017`, which passes the check digit (the old `IT01234567890` did not).
