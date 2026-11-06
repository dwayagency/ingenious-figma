# Brand tokens (from the restyling in `docs/DESIGN`)

The styles come from the brand manuals in `docs/DESIGN/*/… BRAND MANUAL.pdf`. They reflect the restyling and
**take precedence over the live sites**. The live sites are used only for structure, content and product
images.

| | TamTam Price | MisterCucina | Trovaincasso |
|---|---|---|---|
| Shopify preset | Hyper **Nexvo** | Hyper **Pillar** | Hyper **Hyper** (B2B/wholesale) |
| Logo files | `TAMTAMPRICE/TAM_TAM_LOGO.pdf/.png` (+ positive/negative) | `MISTERCUCINA/SVG/Logo *.svg` | `TROVAINCASSO/SVG/Logo *.svg` |
| Claim | — | "Lo specialista degli elettrodomestici" | (live site) "Specializzati negli elettrodomestici da incasso" |
| Logo font | Poppins | Atyp Display | Space Grotesk |
| Primary font | **Poppins Black** | **Atyp Display Semibold** | **Space Grotesk Semibold** |
| Secondary font | **Poppins Regular** | **Atyp Display Medium/Regular** | **Space Grotesk Light** |
| Figma stand-in | — (Poppins is available) | **Albert Sans** (Atyp Display is not in Figma's font list) | Space Grotesk (Figma only has Light/Regular/Medium/Bold, so Semibold → Medium or Bold) |
| Shopify font | Poppins (Shopify font library) | Atyp Display as a custom font (upload WOFF2 in the theme) | Space Grotesk (Shopify font library) |
| Social icon | the "N" pictogram | the house roof | the "o" target |

## Colours

| Role | TamTam Price | MisterCucina | Trovaincasso |
|---|---|---|---|
| Black | `#000000` | `#000000` | `#000000` |
| Primary | `#000000` | `#1B2140` navy | `#044D3C` dark green |
| Secondary | `#6D7172` grey | `#9E9E9E` grey | `#32AF80` green |
| Accent | `#BC1721` red | `#CA442E` orange-red | `#FCBE28` yellow |
| Light | — | `#FDFDFD` | `#AED8C2` light green |
| Allowed logo backgrounds | grey, red, black, dark red | navy, orange-red, grey, white, black | dark green, light green, green, yellow, black |
| Forbidden backgrounds | blue, pink, orange, cyan, green | pink, orange, cyan, bright blue | pink, orange, cyan, blue |

## Figma variables (collection `Brand`, one mode per brand)

| Variable | TamTam Price | MisterCucina | Trovaincasso |
|---|---|---|---|
| `brand/primary` | `#000000` | `#1B2140` | `#044D3C` |
| `brand/secondary` | `#6D7172` | `#9E9E9E` | `#32AF80` |
| `brand/accent` | `#BC1721` | `#CA442E` | `#FCBE28` |
| `brand/accent-soft` | `#F8E7E8` | `#F8E4E0` | `#AED8C2` |
| `text/primary` | `#000000` | `#1B2140` | `#000000` |
| `text/secondary` | `#6D7172` | `#5F6275` | `#4D5F58` |
| `text/on-primary` | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| `text/on-accent` | `#FFFFFF` | `#FFFFFF` | `#044D3C` |
| `surface/page` | `#FFFFFF` | `#FDFDFD` | `#FFFFFF` |
| `surface/subtle` | `#F2F2F2` | `#F3F3F5` | `#EEF6F1` |
| `surface/inverse` | `#000000` | `#1B2140` | `#044D3C` |
| `border/default` | `#E3E3E3` | `#E4E4E8` | `#DDE7E2` |
| `badge/sale` | `#BC1721` | `#CA442E` | `#FCBE28` |
| `badge/new` | `#6D7172` | `#1B2140` | `#32AF80` |
| `price/sale` | `#BC1721` | `#CA442E` | `#044D3C` |

Tints (`accent-soft`, `surface/subtle`, `border/default`, `text/secondary` on MisterCucina/Trovaincasso) are
derived for UI use. They are not in the manuals.

## How the demo colours map to the brands (homepage rebrand)

| Demo colour (template) | → TamTam Price | → MisterCucina | → Trovaincasso |
|---|---|---|---|
| Nexvo blue `#1C52D7` | `#BC1721` | | |
| Nexvo orange `#FFC573` / `#E09068` (flash bar) | `#BC1721` / `#F8E7E8` | | |
| Nexvo green "New" `#27923B` | `#6D7172` | | |
| Sale red `#C4301C` / `#CB321E` | `#BC1721` | `#CA442E` | `#FCBE28` (with dark-green text) |
| Pillar deep green `#113534` | | `#1B2140` | |
| Pillar maroon `#5E2723` | | `#1B2140` | |
| Pillar sand `#EAD8AB`, `#E8DED4`, `#E0DED9` | | `#F3F3F5` | |
| Pillar yellow `#FFE093` | | `#F8E4E0` | |
| Pillar bronze `#CD7F32`, green `#359679` | | `#CA442E`, `#1B2140` | |
| Hyper cobalt `#1D349A` | | | `#044D3C` |
| Hyper lime `#F4F691` | | | `#AED8C2` (countdown bar `#FCBE28`) |
| Text `#000000` | `#000000` | `#1B2140` | `#000000` |
