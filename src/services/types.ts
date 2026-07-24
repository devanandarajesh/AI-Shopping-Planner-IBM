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
  pros: string[];
  cons: string[];
  buyingTips?: string[];
}

export interface ShoppingSummary {
  totalBudget: number;
  estimatedSpending: number;
  remainingBudget: number;
  productCount: number;
  averageMatch: number;
  estimatedSavings: number;
}

export interface SearchHistoryEntry {
  id: string;
  timestamp: number;
  input: PlannerInput;
  resultCount: number;
  topMatch: number;
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

export function budgetToMax(budget: BudgetRange | '' | undefined): number {
  switch (budget) {
    case 'Under $50':
      return 50;
    case '$50–$150':
      return 150;
    case '$150–$300':
      return 300;
    case '$300+':
      return 500;
    default:
      return 500;
  }
}
