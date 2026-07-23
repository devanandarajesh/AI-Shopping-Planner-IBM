import type {
  ProductService,
  RecommendationService,
} from './types';
import { config } from './config';
import { dummyProductService } from './productService';
import { localRecommendationService } from './localRecommendationService';
import { apiRecommendationService } from './apiRecommendationService';

export function getProductService(): ProductService {
  return dummyProductService;
}

export function getRecommendationService(): RecommendationService {
  return config.recommendationSource === 'api'
    ? apiRecommendationService
    : localRecommendationService;
}

export {
  config,
  dummyProductService,
  localRecommendationService,
  apiRecommendationService,
};
export * from './types';
