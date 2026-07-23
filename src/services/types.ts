import type { Product } from '@/data/products';

export type { Product };

export type BudgetRange = 'Under $50' | '$50–$150' | '$150–$300' | '$300+';

export type Preference =
  | 'Best Value'
  | 'Premium Quality'
  | 'Eco-Friendly'
  | 'Top Rated'
  | 'Trending';

export interface PlannerInput {
  category?: string;
  budget?: BudgetRange | '';
  preference?: Preference | '';
  requirements?: string;
}

export interface RecommendationResult {
  product: Product;
  matchScore: number;
  reason: string;
}

export interface ProductSearchParams {
  category?: string;
  limit?: number;
}

export interface ProductService {
  getAll(): Promise<Product[]>;
  getByCategory(category: string): Promise<Product[]>;
  getById(id: number): Promise<Product | undefined>;
}

export interface RecommendationService {
  recommend(input: PlannerInput): Promise<RecommendationResult[]>;
}
