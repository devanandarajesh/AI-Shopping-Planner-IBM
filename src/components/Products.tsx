import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from './ProductCard';

export default function Products() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? products
      : products.filter((p) => p.category === active);

  return (
    <section id="products" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <LayoutGrid className="w-3.5 h-3.5" />
            Featured Products
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Curated by AI, loved by shoppers
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            Browse a selection of products our AI has flagged as standout picks.
          </p>
        </div>

        {/* category filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === c
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
