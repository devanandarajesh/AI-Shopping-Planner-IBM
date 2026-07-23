import { Star, Sparkles, Check } from 'lucide-react';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  return (
    <article
      className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 animate-[fadeIn_0.5s_ease-out_both]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* AI tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-md">
          <Sparkles className="w-3 h-3" />
          {product.aiTag}
        </span>
      </div>

      {/* match score badge */}
      {product.matchScore && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            {product.matchScore}% match
          </span>
        </div>
      )}

      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-700">
              {product.rating}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-4">
            {product.features.slice(0, 3).map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-xs border border-slate-100"
              >
                <Check className="w-3 h-3 text-emerald-500" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-slate-900">
            ${product.price}
          </span>
          <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition-colors">
            View
          </button>
        </div>
      </div>
    </article>
  );
}
