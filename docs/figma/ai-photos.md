# AI lifestyle photos on the homepages (2026-11-10)

All three homepages now use **photorealistic lifestyle photos and photomontages** made with Higgsfield instead of
product cut-outs on flat brand colours. The boards (PLP, PDP, cart, …) still use the white-background product photos.

- **Tool and model:** Higgsfield, `gpt_image_2_6`, quality `high`, resolution `2k`, about 1 credit per image
  (68 images in total).
- **Real products:** each prompt uses the matching product photo from the `ASSETS · Foto prodotto` page as a reference,
  so the appliance in the scene is the one sold. The prompts ask to keep the appliance's design, controls and logo.
  People wear plain uniforms with no logos.
- **Brand mood:**
  - TamTam Price: bright modern kitchens and laundries, with dark areas where the white headlines sit.
  - MisterCucina: navy cabinets, terracotta, brass and copper (Mediterranean).
  - Trovaincasso: sage-green and light oak, handleless built-in kitchens.
- **Text space:** where the slot carries copy, the prompt leaves a darker, calm area in that spot (left half, top
  third, bottom third or centre).
- **In Figma:** each image is an `IMAGE` fill (scale `FILL`) on the original slot frame. The old `Foto prodotto · …`
  montage layers were deleted. Hidden slides of the same carousel reuse the same `imageHash`.
- **Contact sheets:** [../screenshots/higgsfield/](../screenshots/higgsfield/) (labels `g<index>`, `p<index>` match
  the table below).
- **Kept as product montages:**
  - TamTam: the dishwasher promo strip `1:5128` and the newsletter card in the footer `1:5506`.
  - Trovaincasso: the two "Risparmia" banners `1:3575` and `1:3588`.

## Slot → image

| Site | Slot (node) | Section | Image | Scene |
|---|---|---|---|---|
| TamTam | `1:4434` | Hero | p0 | Laundry with Bosch Serie 6 washer |
| TamTam | `1:4444` | Hero tile "Frigoriferi combinati" | g10 | Built-in fridge, door open |
| TamTam | `1:4453` | Hero tile "Forni da incasso" | g11 | Oven with roast chicken |
| TamTam | `1:4632` | Collections | g12 | Woman unloading the washer |
| TamTam | `1:4638` (+`1:4684`) | Slideshow "Cucina come un professionista" | g13 | Cook opening the oven |
| TamTam | `1:4660` (+`1:4706`) | Slideshow "Induzione senza compromessi" | g14 | Risotto on the induction hob |
| TamTam | `1:4743` | Promo tile "Offerte appena arrivate" | g15 | Side-by-side fridge |
| TamTam | `1:4889` | "Chi siamo" | g16 | Technician installing the washer |
| TamTam | `1:4949` | "Selezione TamTam" banner | g17 | Range cooker, dark kitchen |
| TamTam | `1:5023` | Bundle "Sconto 30% Kit cucina" | g18 | Hood above the oven |
| TamTam | `1:5318` `1:5334` `1:5350` `1:5366` | "Dicono di noi" | g19–g22 | Washer, fridge, oven install, dishwasher |
| TamTam | `1:5738` | Newsletter popup | g23 | Counter with oven, red accent |
| MisterCucina | `1:1451` | Hero | p1 | Smeg cooker in a navy kitchen |
| MisterCucina | `1:1462` `1:1472` `1:1481` | Hero tiles | g30–g32 | Induction, oven, coffee machine |
| MisterCucina | `1:1765` `1:1778` `1:1791` `1:1804` `1:1817` | Card slider | g33–g37 | Oven, induction, hood, fridge, dishwasher |
| MisterCucina | `1:1861` (+`1:1875`, `1:1896`) | "I preferiti dai clienti" | g38 | Family lunch, Smeg cooker |
| MisterCucina | `1:1913` `1:1937` `1:1961` `1:1985` | "Acquista per reparto" | g39–g42 | Cooking, cold, extraction, washing |
| MisterCucina | `1:2010` `1:2028` | "La cucina su misura" | g43, g44 | Gas hob, side-by-side |
| MisterCucina | `1:2132` | "Forni multifunzione" | g45 | Chef with roast. Has a navy radial overlay for the headline |
| MisterCucina | `1:2259` `1:2309` `1:2324` | Lookbook | g46–g48 | Cooker, hood, island |
| MisterCucina | `1:2465` | "Set incasso completo" | g49 | Oven, hob and hood wall |
| MisterCucina | `1:2539`–`1:2575` | Instagram | g50–g54 | Social-style shots |
| MisterCucina | `1:2835` | Newsletter popup | g55 | Cooker knobs close-up |
| Trovaincasso | `1:2944` (+`1:2966`) | Hero slide "La cucina giusta" | g60 | Oven column and hood |
| Trovaincasso | `1:2955` (+`1:2977`) | Hero slide, headline now **"Piani aspiranti"** | p2 | Samsung NZ84 hob with integrated hood |
| Trovaincasso | `1:3004` | Promo "Kit cucina da incasso" | g61 | Oven column |
| Trovaincasso | `1:3119` `1:3138` `1:3157` `1:3176` | Image cards | g62–g65 | Oven, fridge, hood, dishwasher |
| Trovaincasso | `1:3343` | "Collezioni in evidenza" | g66 | Island with hob and hood |
| Trovaincasso | `1:3348` (+`1:3383`), `1:3362` | "I preferiti dai clienti" | g67, g84 | Built-in washer |
| Trovaincasso | `1:3391` `1:3443` `1:3493` | "Lasciati ispirare" | g68–g70 | Cooker, coffee column, hob and hood |
| Trovaincasso | `1:3768` | "Chi siamo" | g71 | Installers and customer |
| Trovaincasso | `1:3863` (+`1:3889`), `1:3876` (+`1:3902`) | Slideshow "Piani cottura sotto i 300 €" | g72, g73 | Oven detail, gas hob |
| Trovaincasso | `1:3992` `1:3998` `1:4004` `1:4010` | "Perché scegliere Trovaincasso" | g74–g77 | Delivery, prices, pickup of the old appliance, warranty |
| Trovaincasso | `1:4019`–`1:4055` | Instagram | g78–g82 | Social-style shots |
| Trovaincasso | `1:4317` | Newsletter popup | g83 | Induction hob with lemons |

## Check before going live

- These are AI images. Check that each appliance's logo and details match the real product before using them in ads
  or on product pages.
- The people are generated, so they need no model release. Still, avoid presenting them as real customers, for example
  in testimonials.
