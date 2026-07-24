import { Star, Sparkles, Check, Minus, GitCompare, Heart } from 'lucide-react';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  index?: number;
  pros?: string[];
  cons?: string[];
  reason?: string;
  matchScore?: number;
  selectable?: boolean;
  selected?: boolean;
  onToggleCompare?: () => void;
  onToggleWishlist?: () => void;
  inWishlist?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  pros,
  cons,
  reason,
  matchScore,
  selectable = false,
  selected = false,
  onToggleCompare,
  onToggleWishlist,
  inWishlist = false,
}: Props) {
  return (
    <article
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 animate-[fadeIn_0.5s_ease-out_both] ${
        selected
          ? 'border-purple-400 ring-2 ring-purple-400/30 shadow-lg shadow-purple-500/10'
          : 'border-slate-200/80 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs font-semibold shadow-md">
          <Sparkles className="w-3 h-3" />
          {product.aiTag}
        </span>
      </div>

      {matchScore != null && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            {matchScore}% match
          </span>
        </div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviews.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="font-bold text-slate-900 leading-snug mb-1">{product.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{product.description}</p>

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

        {(pros?.length ?? 0) > 0 && (cons?.length ?? 0) > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1.5">Pros</p>
              <ul className="space-y-1">
                {pros!.slice(0, 3).map((p, i) => (
                  <li key={i} className="flex items-start gap-1 text-xs text-slate-600 leading-snug">
                    <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-1.5">Cons</p>
              <ul className="space-y-1">
                {cons!.slice(0, 3).map((c, i) => (
                  <li key={i} className="flex items-start gap-1 text-xs text-slate-600 leading-snug">
                    <Minus className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {reason && (
          <div className="flex gap-2.5 rounded-xl bg-gradient-to-r from-blue-50/70 to-purple-50/70 border border-purple-100 p-3.5 mb-4">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">{reason}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-2xl font-extrabold text-slate-900">${product.price}</span>
          <div className="flex items-center gap-2">
            {onToggleWishlist && (
              <button
                onClick={onToggleWishlist}
                className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200'
                }`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500' : ''}`} />
              </button>
            )}
            {selectable && onToggleCompare && (
              <button
                onClick={onToggleCompare}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selected
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-purple-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <GitCompare className="w-4 h-4" />
                {selected ? 'Selected' : 'Compare'}
              </button>
            )}
            {!selectable && (
              <button className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all">
                View
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
