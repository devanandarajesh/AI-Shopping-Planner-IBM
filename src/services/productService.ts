import { products as dummyProducts } from '@/data/products';
import type {
  Product,
  ProductSearchParams,
  ProductService,
} from './types';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class DummyProductService implements ProductService {
  async getAll(): Promise<Product[]> {
    await wait(150);
    return [...dummyProducts];
  }

  async getByCategory(category: string): Promise<Product[]> {
    await wait(150);
    return dummyProducts.filter((p) => p.category === category);
  }

  async getById(id: number): Promise<Product | undefined> {
    await wait(100);
    return dummyProducts.find((p) => p.id === id);
  }

  async search(params: ProductSearchParams): Promise<Product[]> {
    await wait(150);
    let pool = [...dummyProducts];
    if (params.category) pool = pool.filter((p) => p.category === params.category);
    if (params.limit) pool = pool.slice(0, params.limit);
    return pool;
  }
}

export const dummyProductService = new DummyProductService();
