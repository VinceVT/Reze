# REZE — demo ecommerce storefront

A Next.js storefront for REZE, a circadian supplement system:

- **REZE Day** — daily support (slate-blue packets)
- **REZE Night** — melatonin-free nighttime support (violet packets)
- **The Reset Duo** — Day + Night in the magnetic gift box
- **REZE Core** — NAD+ / liposomal glutathione longevity formula (coming soon, waitlist)

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, product system, day→night ritual timeline, science, Core waitlist |
| `/products/day` · `/products/night` · `/products/reset-duo` | Product pages: subscription/one-time purchase panel, full ingredient label, ritual, FAQ, cross-sell |
| `/products/core` | Coming-soon page with expected pricing and waitlist form |

Cart is client-side (context + `localStorage`) with a slide-out drawer; checkout is intentionally stubbed — this is a demo, not a real store.

## Run it

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # all routes prerender statically
```

## Design notes

Palette, wordmark treatment, and the vertical "meridian" gradient line are drawn from the physical packaging (matte navy boxes, letterspaced REZE, Day/Night stick packets). Type: Newsreader (display), Jost (body/UI), Spline Sans Mono (labels and doses), all self-hosted via Fontsource. The homepage background travels from daylight porcelain to deep navy as you scroll — the same day→night axis as the product system.
