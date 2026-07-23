import type { Product, PlannerInput } from './types';

export interface ScoredProduct {
  product: Product;
  score: number;
  reasons: string[];
}

const ECO_KEYWORDS = ['eco', 'natural', 'recycl', 'rubber', 'cruelty', 'organic'];

function budgetRange(budget: string): [number, number] {
  switch (budget) {
    case 'Under $50':
      return [0, 50];
    case '$50–$150':
      return [50, 150];
    case '$150–$300':
      return [150, 300];
    case '$300+':
      return [300, Infinity];
    default:
      return [0, Infinity];
  }
}

function tokenMatch(product: Product, query: string): string[] {
  if (!query.trim()) return [];
  const haystack = [
    product.name,
    product.description,
    product.category,
    ...product.features,
  ]
    .join(' ')
    .toLowerCase();

  const tokens = query
    .toLowerCase()
    .split(/[,\s]+/)
    .filter((t) => t.length > 2);

  return tokens.filter((t) => haystack.includes(t));
}

function isEco(product: Product): boolean {
  const text = [product.aiTag, ...product.features].join(' ').toLowerCase();
  return ECO_KEYWORDS.some((k) => text.includes(k));
}

export function scoreProducts(
  input: PlannerInput,
  catalog: Product[],
): ScoredProduct[] {
  const [minPrice, maxPrice] = budgetRange(input.budget ?? '');
  const preference = input.preference ?? '';
  const requirements = input.requirements ?? '';

  const scored = catalog
    .filter((p) => {
      if (input.category && p.category !== input.category) return false;
      if (p.price < minPrice || p.price > maxPrice) return false;
      return true;
    })
    .map((product) => {
      let score = 0;
      const reasons: string[] = [];

      // Rating weight (0–30)
      const ratingScore = (product.rating / 5) * 30;
      score += ratingScore;
      if (product.rating >= 4.6) {
        reasons.push(`it has an excellent ${product.rating}★ rating`);
      } else if (product.rating >= 4.3) {
        reasons.push(`it's well rated at ${product.rating}★`);
      }

      // Popularity weight (0–20)
      const popularityScore = Math.min(product.reviews / 5000, 1) * 20;
      score += popularityScore;
      if (product.reviews > 2000) {
        reasons.push(`it's backed by ${product.reviews.toLocaleString()} reviews`);
      }

      // Budget fit weight (0–20)
      if (input.budget) {
        score += 20;
        reasons.push(`it fits your ${input.budget} budget at $${product.price}`);
      }

      // Preference weight (0–20)
      if (preference === 'Top Rated') {
        score += (product.rating / 5) * 20;
      } else if (preference === 'Best Value') {
        const value = product.rating / product.price;
        score += Math.min(value * 4, 20);
        if (product.price < 100)
          reasons.push(`it offers strong value for $${product.price}`);
      } else if (preference === 'Premium Quality') {
        score += Math.min((product.price / 300) * 20, 20);
        if (product.price > 150) reasons.push(`it's a premium-tier pick`);
      } else if (preference === 'Eco-Friendly') {
        if (isEco(product)) {
          score += 20;
          reasons.push(`it matches your eco-friendly preference`);
        }
      } else if (preference === 'Trending') {
        score += Math.min(product.reviews / 5000, 1) * 20;
      }

      // Requirements keyword match (0–10)
      const matched = tokenMatch(product, requirements);
      if (matched.length > 0) {
        score += Math.min(matched.length * 3, 10);
        reasons.push(
          `it matches your requirements (${matched.slice(0, 3).join(', ')})`,
        );
      }

      return { product, score, reasons };
    });

  // Fallback: if filters wiped everything, score the whole catalog by rating
  if (scored.length === 0) {
    return catalog
      .map((product) => ({
        product,
        score: (product.rating / 5) * 50,
        reasons: [`it's a top-rated ${product.category.toLowerCase()} pick`],
      }))
      .sort((a, b) => b.score - a.score);
  }

  return scored.sort((a, b) => b.score - a.score);
}
