# Heaven Furniture Mart — Bilingual Digital Showroom

A cinematic, bilingual website for a bespoke furniture brand in Chattogram, Bangladesh. The experience guides visitors through collections, craftsmanship, sofa personalization and direct consultation.

**[Live demo](https://heaven-furniture-mart-landing-page-rho.vercel.app/)** · **[Portfolio case study](https://irfan.itflor.com/project/heaven-furniture-mart-landing-page)**

## Main features

- English and Bangla interfaces, with responsive mobile, tablet and desktop layouts.
- Interactive 3D sofa sample and a design brief for size, fabric, wood and comfort preferences.
- Scroll-driven brand storytelling, visual stories and a brand-film experience.
- WhatsApp consultation links that include the visitor's selected design preferences.
- On-demand loading of heavier 3D/video experiences and reduced-motion support.

## Technology stack and dependencies

| Purpose | Technologies |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4, PostCSS |
| Motion | GSAP / ScrollTrigger, Lenis |
| 3D | Three.js, React Three Fiber, Drei |
| Icons | Lucide React |
| Development | Oxlint, Oxfmt |

Exact versions are recorded in [package.json](package.json) and [package-lock.json](package-lock.json).

## Run locally

Use **Node.js 22.13 or newer** and npm.

```bash
git clone https://github.com/irfan0072/Heaven-Furniture-Mart-landing-page.git
cd Heaven-Furniture-Mart-landing-page
npm install
npm run dev
```

Open the local address printed in the terminal, normally **http://localhost:3000**.

## Production build and code checks

```bash
npm run build
npm start
```

```bash
npm run lint
```

## Deploy on Vercel

1. Import this repository into Vercel.
2. Use Node.js 22.13 or newer.
3. Keep the detected **Next.js** framework preset and `npm run build` command. Leave the output directory blank.
4. Add `NEXT_PUBLIC_SITE_URL` with your final HTTPS domain.
5. Deploy. Future pushes to `main` create new production deployments.

## Content, media and attribution

- Business details, collections, process steps, journey milestones, social links and media paths are centralized in `lib/content.ts`.
- Local visual assets live under `public`.
- The Bespoke Atelier uses a web-optimized CC0 sofa model from Poly Haven. Attribution and asset details are in `public/models/sofa-01/LICENSE.md`.
- GSAP and ScrollTrigger choreograph the page; Lenis provides smooth scrolling. Motion is simplified or disabled for visitors who prefer reduced motion.

## Relevant links

- [Live showroom](https://heaven-furniture-mart-landing-page-rho.vercel.app/)
- [Case study](https://irfan.itflor.com/project/heaven-furniture-mart-landing-page)
- [Developer portfolio](https://irfan.itflor.com/)
- [GitHub profile](https://github.com/irfan0072)
