# Heaven-Furniture-Mart-landing-page

A cinematic, bilingual brand experience for Heaven Furniture Mart in Chattogram. The landing page combines responsive editorial storytelling, scroll animation, short-form reels, a practical sofa configurator, and a real interactive 3D furniture model.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

## Production build

```bash
npm run build
```

## Editing content and imagery

Business details, collections, process steps, journey milestones, social links, and media paths are centralized in `lib/content.ts`.

Business details and media paths can be updated in `lib/content.ts`. Local visual assets are stored under `public`.

## Experience notes

- The Bespoke Atelier uses a web-optimized CC0 sofa model from Poly Haven. Asset details are recorded beside the model in `public/models/sofa-01/LICENSE.md`.
- GSAP and ScrollTrigger choreograph the page; Lenis provides restrained smooth scrolling.
- Motion is disabled or simplified for visitors who prefer reduced motion.
- Bangla and English are supported throughout the complete experience.
- The layout and 3D presentation adapt across mobile, tablet, laptop, and desktop screens.
