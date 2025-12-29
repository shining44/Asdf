# Tomoca Coffee E-commerce Website

## Project Overview
This is a Next.js e-commerce website for Tomoca Coffee, an Ethiopian coffee brand established in 1953. The site showcases their coffee products, brewing equipment, and subscription services.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Homepage
│   ├── layout.tsx       # Root layout with header/footer
│   ├── shop/            # Shop and product pages
│   ├── about/           # About page
│   ├── cafes/           # Cafe locations page
│   ├── checkout/        # Checkout page
│   └── subscriptions/   # Subscription plans page
├── components/
│   ├── layout/          # Header, Footer
│   ├── cart/            # Shopping cart components
│   ├── product/         # Product cards and displays
│   └── ui/              # shadcn/ui components
└── lib/
    ├── data.ts          # Product and review data
    ├── types.ts         # TypeScript types
    ├── cart-context.tsx # Cart state management
    └── utils.ts         # Utility functions
```

## Deployment
The site is deployed to GitHub Pages as a static export.

### Build & Deploy Commands
```bash
npm run dev      # Start development server
npm run build    # Build static export to docs/ folder
npm run deploy   # Build and deploy to GitHub Pages
```

### Important Notes
- The site uses `output: "export"` for static generation
- Assets are served from `/Asdf/` base path (GitHub Pages subdirectory)
- The `docs/.nojekyll` file is required for GitHub Pages to serve `_next` folder
- The build script automatically creates `.nojekyll` after each build

## Common Issues

### Missing .nojekyll file
If the deployed site has broken styling or 404 errors for JS/CSS:
- Ensure `docs/.nojekyll` exists (should be auto-created by build script)
- This file tells GitHub Pages not to use Jekyll processing

### Static Export Limitations
Since this is a static export:
- No server-side API routes
- No dynamic server-side rendering
- All pages are pre-rendered at build time
- Product pages use `generateStaticParams` for static generation

## Development Guidelines
- Use existing shadcn/ui components from `src/components/ui/`
- Follow the established design patterns in existing pages
- Product data is in `src/lib/data.ts`
- Cart state is managed via React Context in `src/lib/cart-context.tsx`
