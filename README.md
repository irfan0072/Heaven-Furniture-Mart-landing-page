# Heaven Furniture Mart

A single-page, static-export-compatible brand experience for Heaven Furniture Mart in Chattogram.

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

The files in `public/media` are licensed editorial placeholders. Replace them with authentic Heaven Furniture Mart photography using the same filenames, or update the paths in `lib/content.ts`.

## Experience notes

- The hero and bespoke section use lightweight React Three Fiber geometry.
- GSAP and ScrollTrigger choreograph the page; Lenis provides restrained smooth scrolling.
- Motion is disabled or simplified for visitors who prefer reduced motion.
- Mobile replaces the bespoke 3D transformation with a clear process presentation.

