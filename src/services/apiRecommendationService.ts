import type {
  PlannerInput,
  RecommendationResult,
  RecommendationService,
} from './types';
import { config } from './config';
import { localRecommendationService } from './localRecommendationService';

interface ApiRecommendationResponse {
  results: RecommendationResult[];
}

export class ApiRecommendationService implements RecommendationService {
  private baseUrl: string;

  constructor(baseUrl = config.apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async recommend(input: PlannerInput): Promise<RecommendationResult[]> {
    try {
      const res = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      const data = (await res.json()) as ApiRecommendationResponse;
      return data.results;
    } catch (err) {
      console.warn(
        'Recommendation API unavailable, falling back to local engine:',
        err,
      );
      return localRecommendationService.recommend(input);
    }
  }
}

export const apiRecommendationService = new ApiRecommendationService();
