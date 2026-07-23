import type {
  PlannerInput,
  RecommendationResult,
  RecommendationService,
} from './types';
import { scoreProducts } from './recommendationEngine';
import { explainRecommendation, matchScore } from './explainer';
import { dummyProductService } from './productService';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class LocalRecommendationService implements RecommendationService {
  async recommend(input: PlannerInput): Promise<RecommendationResult[]> {
    await wait(900);
    const catalog = await dummyProductService.getAll();
    const scored = scoreProducts(input, catalog);
    const maxScore = scored[0]?.score ?? 1;

    return scored.slice(0, 3).map((s) => ({
      product: s.product,
      matchScore: matchScore(s, maxScore),
      reason: explainRecommendation(s, input),
    }));
  }
}

export const localRecommendationService = new LocalRecommendationService();
