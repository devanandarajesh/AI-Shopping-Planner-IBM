import type {
  ProductService,
  RecommendationService,
} from './types';
import { config } from './config';
import { dummyProductService } from './productService';
import { localRecommendationService } from './localRecommendationService';
import { apiRecommendationService } from './apiRecommendationService';
import { geminiRecommendationService } from './geminiRecommendationService';
import { hasGeminiKey } from './geminiService';

export function getProductService(): ProductService {
  return dummyProductService;
}

export function getRecommendationService(): RecommendationService {
  if (hasGeminiKey()) return geminiRecommendationService;
  return config.recommendationSource === 'api'
    ? apiRecommendationService
    : localRecommendationService;
}

export {
  config,
  dummyProductService,
  localRecommendationService,
  apiRecommendationService,
  geminiRecommendationService,
};
export * from './types';
