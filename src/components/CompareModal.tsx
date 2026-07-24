import { useEffect } from 'react';
import { X, Check, Minus, Star, Sparkles } from 'lucide-react';
import type { RecommendationResult } from '@/services';

interface Props {
  a: RecommendationResult;
  b: RecommendationResult;
  onClose: () => void;
}

interface Row {
  label: string;
  render: (r: RecommendationResult) => React.ReactNode;
}

const rows: Row[] = [
  {
    label: 'Price',
    render: (r) => <span className="text-lg font-extrabold text-slate-900">${r.product.price}</span>,
  },
  {
    label: 'Rating',
    render: (r) => (
      <span className="inline-flex items-center gap-1">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="font-semibold text-slate-700">{r.product.rating}</span>
        <span className="text-sm text-slate-400">({r.product.reviews.toLocaleString()})</span>
      </span>
    ),
  },
  {
    label: 'AI Match',
    render: (r) => (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200">
        {r.matchScore}% match
      </span>
    ),
  },
  {
    label: 'Category',
    render: (r) => <span className="text-sm font-medium text-purple-600">{r.product.category}</span>,
  },
  {
    label: 'Key Features',
    render: (r) => (
      <ul className="space-y-1.5">
        {r.product.features.map((f) => (
          <li key={f} className="flex items-start gap-1.5 text-sm text-slate-600">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Pros',
    render: (r) => (
      <ul className="space-y-1.5">
        {r.pros.map((p, i) => (
          <li key={i} className="flex items-start gap-1.5 text-sm text-slate-600">
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            {p}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: 'Cons',
    render: (r) => (
      <ul className="space-y-1.5">
        {r.cons.map((c, i) => (
          <li key={i} className="flex items-start gap-1.5 text-sm text-slate-600">
            <Minus className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
            {c}
          </li>
        ))}
      </ul>
    ),
  },
  {
    label: 'AI Recommendation',
    render: (r) => (
      <div className="flex gap-2 rounded-lg bg-gradient-to-r from-blue-50/70 to-purple-50/70 border border-purple-100 p-3">
        <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600 leading-relaxed">{r.reason}</p>
      </div>
    ),
  },
];

export default function CompareModal({ a, b, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Compare products"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/90 backdrop-blur">
          <h3 className="font-bold text-slate-900 text-lg">Compare Products</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="hidden sm:grid grid-cols-[140px_1fr_1fr] gap-x-4 gap-y-0">
            <div className="sticky left-0" />
            <ProductHeader r={a} />
            <ProductHeader r={b} />

            {rows.map((row) => (
              <div key={row.label} className="contents">
                <div className="py-3.5 border-t border-slate-100">
                  <span className="text-sm font-semibold text-slate-500">{row.label}</span>
                </div>
                <div className="py-3.5 border-t border-slate-100">{row.render(a)}</div>
                <div className="py-3.5 border-t border-slate-100">{row.render(b)}</div>
              </div>
            ))}
          </div>

          <div className="sm:hidden space-y-5">
            {[a, b].map((r) => (
              <div key={r.product.id} className="rounded-xl border border-slate-200 overflow-hidden">
                <ProductHeader r={r} />
                <div className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <div key={row.label} className="px-4 py-3">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">{row.label}</p>
                      {row.render(r)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductHeader({ r }: { r: RecommendationResult }) {
  return (
    <div className="flex items-center gap-3 pb-3">
      <img src={r.product.image} alt={r.product.name} className="w-14 h-14 rounded-lg object-cover shrink-0" loading="lazy" />
      <div className="min-w-0">
        <p className="font-bold text-slate-900 text-sm leading-snug truncate">{r.product.name}</p>
        <p className="text-xs text-slate-400">{r.product.category}</p>
      </div>
    </div>
  );
}
