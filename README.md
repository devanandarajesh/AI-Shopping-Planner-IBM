# AI Shopping Planner

An AI-powered shopping assistant that helps users choose products based on their needs, budget, and preferences. Built as an internship project to demonstrate how artificial intelligence can simplify everyday shopping decisions.

> **Status:** Front-end prototype with a smart local recommendation engine. No backend or external APIs required — dummy data works out of the box. The service layer is structured so a real AI API can be dropped in without touching the UI.

## Features

- **AI Planner** — Enter your category, budget, preferences, and requirements to get instant, ranked product recommendations with a match score and a natural-language explanation ("This product is recommended because…").
- **Products Gallery** — Browse 12 curated products with category filtering, ratings, prices, and AI recommendation tags.
- **Modern SaaS UI** — Gradient accents, smooth animations, frosted-glass navbar, fully responsive from mobile to desktop.
- **Reusable Components** — Navbar, Hero, Planner, Products, ProductCard, About, and Footer.

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | React 18 + TypeScript              |
| Build tool  | Vite 5                             |
| Styling     | Tailwind CSS 3                     |
| Icons       | lucide-react                        |
| Fonts       | Inter (Google Fonts)               |
| Data        | Dummy data (in-repo)               |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/ai-shopping-planner.git
cd ai-shopping-planner

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env
#   - VITE_RECOMMENDATION_SOURCE=local  → use the built-in engine (default)
#   - VITE_RECOMMENDATION_SOURCE=api    → call a backend recommendation API
#   - VITE_API_BASE_URL=https://...     → backend base URL (when source=api)

# 4. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

### Available Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Vite dev server                |
| `npm run build`     | Production build to `dist/`              |
| `npm run preview`   | Preview the production build locally     |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Run the TypeScript compiler (no emit)    |

## Architecture

### Service Layer

All AI/product logic lives in `src/services/` and is decoupled from UI components. Components talk to services through interfaces, so the underlying implementation can be swapped without changing the UI.

```
src/services/
├── types.ts                      # Shared interfaces (Product, PlannerInput, services)
├── config.ts                     # Reads VITE_* env vars at runtime
├── productService.ts             # DummyProductService (in-repo catalog)
├── recommendationEngine.ts       # Pure scoring logic (budget, rating, preference, keywords)
├── explainer.ts                  # Generates "recommended because…" natural-language text
├── localRecommendationService.ts # Wraps engine + explainer (default)
├── apiRecommendationService.ts   # Calls a backend API; falls back to local on error
└── index.ts                      # Factory: getRecommendationService() / getProductService()
```

### Recommendation Engine

The local engine scores each product on a 0–100 scale across four dimensions:

| Dimension        | Weight | What it measures                                   |
| ---------------- | ------ | -------------------------------------------------- |
| Rating           | 0–30   | Star rating normalized to 5★                       |
| Popularity       | 0–20   | Review count (capped at 5,000)                     |
| Budget fit       | 0–20   | Price within the selected budget range             |
| Preference       | 0–20   | Top Rated / Best Value / Premium / Eco / Trending  |
| Requirements     | 0–10   | Keyword overlap with the free-text requirements    |

The top 3 products are returned, each with a match score and a human-readable explanation.

### Switching to a Real AI API

1. Set `VITE_RECOMMENDATION_SOURCE=api` and `VITE_API_BASE_URL=https://your-api.com` in `.env`.
2. Implement a `POST /recommendations` endpoint that accepts a `PlannerInput` body and returns `{ results: RecommendationResult[] }`.
3. If the API is unreachable, `ApiRecommendationService` automatically falls back to the local engine — so the UI never breaks.

### Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Planner.tsx
│   ├── Products.tsx
│   ├── ProductCard.tsx
│   ├── About.tsx
│   └── Footer.tsx
├── data/
│   └── products.ts    # Dummy product catalog + types
├── services/          # AI / product service layer (see above)
├── App.tsx
├── main.tsx
└── index.css
```

## Deployment

### Static hosting (Vercel / Netlify / S3)

This is a static SPA — the `dist/` folder from `npm run build` can be served by any static host.

```bash
npm run build
# Upload the dist/ folder to your host
```

**Vercel**
```bash
npm i -g vercel
vercel --prod
```
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

**Netlify**
- Build command: `npm run build`
- Publish directory: `dist`

### AWS deployment

The production build is a static site, so it deploys cleanly to **S3 + CloudFront**:

1. **Build**
   ```bash
   npm run build
   ```

2. **Create an S3 bucket** (e.g. `ai-shopping-planner`) and upload `dist/`:
   ```bash
   aws s3 sync dist/ s3://ai-shopping-planner --delete
   ```

3. **Enable static hosting** on the bucket:
   - Index document: `index.html`
   - Error document: `index.html` (SPA fallback for client-side routing)

4. **Create a CloudFront distribution**:
   - Origin Domain: your S3 bucket endpoint
   - Default root object: `index.html`
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Price class: Use only North America and Europe (cost optimization)

5. **Invalidate after redeploy**:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id <DIST_ID> \
     --paths "/*"
   ```

For a fully automated pipeline, connect the repository to **AWS Amplify Hosting** or **AWS CodePipeline** with a build spec of `npm ci && npm run build` and a base directory of `dist`.

### Environment variables in production

Set the same `VITE_*` variables in your hosting provider's environment settings before building. Vite inlines them at build time.

## License

This project is an internship demonstration and is provided for educational purposes.
