import type {
  PlannerInput,
  Product,
  RecommendationResult,
  RecommendationService,
} from './types';
import { products } from '@/data/products';
import { generateContent, hasGeminiKey } from './geminiService';
import { localRecommendationService } from './localRecommendationService';

interface GeminiRecommendation {
  productId: number;
  matchScore: number;
  reason: string;
  pros: string[];
  cons: string[];
  buyingTips: string[];
}

interface GeminiResponseShape {
  recommendations: GeminiRecommendation[];
}

function buildCatalogSummary(catalog: Product[]): string {
  return catalog
    .map(
      (p) =>
        `ID ${p.id}: ${p.name} | ${p.category} | $${p.price} | ${p.rating}★ (${p.reviews} reviews) | Features: ${p.features.join(', ')}`,
    )
    .join('\n');
}

function buildPrompt(input: PlannerInput, catalog: Product[]): string {
  const parts: string[] = [];
  parts.push('You are an expert shopping assistant. Recommend the 3 best products for the user based on their criteria.');
  parts.push('You MUST choose ONLY from the product catalog provided below. Each recommendation must use the exact product ID.');
  parts.push('Return ONLY valid JSON in this exact shape (no markdown, no explanation outside JSON):');
  parts.push(
    JSON.stringify(
      {
        recommendations: [
          {
            productId: 0,
            matchScore: 0,
            reason: 'string - why this product fits the user (1-2 sentences)',
            pros: ['string', 'string'],
            cons: ['string', 'string'],
            buyingTips: ['string - actionable tip', 'string'],
          },
        ],
      },
      null,
      2,
    ),
  );
  parts.push('---');
  parts.push('USER CRITERIA:');
  if (input.category) parts.push(`Category: ${input.category}`);
  else parts.push('Category: Any');
  if (input.budget) parts.push(`Budget: ${input.budget}`);
  else parts.push('Budget: Any');
  if (input.preference) parts.push(`Preference: ${input.preference}`);
  else parts.push('Preference: None');
  if (input.requirements) parts.push(`Requirements: ${input.requirements}`);
  else parts.push('Requirements: None');
  parts.push('---');
  parts.push('PRODUCT CATALOG (choose only from these):');
  parts.push(buildCatalogSummary(catalog));
  return parts.join('\n');
}

function parseResponse(raw: string, catalog: Product[]): GeminiRecommendation[] {
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```$/g, '').trim();
  const parsed = JSON.parse(cleaned) as GeminiResponseShape;
  if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
    throw new Error('Gemini response missing recommendations array');
  }
  return parsed.recommendations.filter(
    (r) => r && typeof r.productId === 'number' && catalog.some((p) => p.id === r.productId),
  );
}

export class GeminiRecommendationService implements RecommendationService {
  async recommend(input: PlannerInput): Promise<RecommendationResult[]> {
    if (!hasGeminiKey()) {
      return localRecommendationService.recommend(input);
    }

    try {
      const catalog = products;
      const prompt = buildPrompt(input, catalog);
      const raw = await generateContent(prompt);
      const recs = parseResponse(raw, catalog);

      if (recs.length === 0) {
        throw new Error('Gemini returned no valid recommendations');
      }

      return recs.slice(0, 3).map((rec) => {
        const product = catalog.find((p) => p.id === rec.productId)!;
        return {
          product,
          matchScore: Math.min(99, Math.max(70, Math.round(rec.matchScore || 85))),
          reason: rec.reason || 'Recommended based on your criteria.',
          pros: Array.isArray(rec.pros) ? rec.pros.slice(0, 4) : [],
          cons: Array.isArray(rec.cons) ? rec.cons.slice(0, 3) : [],
          buyingTips: Array.isArray(rec.buyingTips) ? rec.buyingTips.slice(0, 3) : [],
        };
      });
    } catch (err) {
      console.warn('Gemini recommendation failed, falling back to local engine:', err);
      return localRecommendationService.recommend(input);
    }
  }
}

export const geminiRecommendationService = new GeminiRecommendationService();
