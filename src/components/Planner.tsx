import { useState } from 'react';
import {
  Wand2,
  Loader2,
  SlidersHorizontal,
  DollarSign,
  Heart,
  ListChecks,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { categories } from '@/data/products';
import { getRecommendationService } from '@/services';
import type {
  BudgetRange,
  Preference,
  RecommendationResult,
} from '@/services';
import ProductCard from './ProductCard';

const budgetOptions: BudgetRange[] = [
  'Under $50',
  '$50–$150',
  '$150–$300',
  '$300+',
];
const preferenceOptions: Preference[] = [
  'Best Value',
  'Premium Quality',
  'Eco-Friendly',
  'Top Rated',
  'Trending',
];

export default function Planner() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState<BudgetRange | ''>('');
  const [preference, setPreference] = useState<Preference | ''>('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setResults(null);
    setError(null);
    try {
      const service = getRecommendationService();
      const recs = await service.recommend({
        category: category || undefined,
        budget,
        preference,
        requirements,
      });
      setResults(recs);
    } catch {
      setError('Something went wrong generating recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCategory('');
    setBudget('');
    setPreference('');
    setRequirements('');
    setResults(null);
    setError(null);
  };

  return (
    <section id="planner" className="py-20 sm:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Wand2 className="w-3.5 h-3.5" />
            AI Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Tell us what you need
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            Fill in a few details and our AI will instantly recommend the best
            products for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="space-y-5">
                <Field icon={<SlidersHorizontal className="w-4 h-4" />} label="Product category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="input"
                  >
                    <option value="">Any category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field icon={<DollarSign className="w-4 h-4" />} label="Budget">
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value as BudgetRange | '')}
                    className="input"
                  >
                    <option value="">Any budget</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field icon={<Heart className="w-4 h-4" />} label="Preferences">
                  <select
                    value={preference}
                    onChange={(e) => setPreference(e.target.value as Preference | '')}
                    className="input"
                  >
                    <option value="">No preference</option>
                    {preferenceOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field icon={<ListChecks className="w-4 h-4" />} label="Requirements">
                  <textarea
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    rows={3}
                    placeholder="e.g. lightweight, waterproof, good battery life…"
                    className="input resize-none"
                  />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Generate Recommendation
                      </>
                    )}
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    aria-label="Reset"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* results */}
          <div className="lg:col-span-3">
            {!loading && !results && !error && (
              <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Your recommendations will appear here
                </h3>
                <p className="text-slate-500 mt-2 max-w-sm">
                  Fill in the form and hit <span className="font-semibold text-blue-600">Generate Recommendation</span> to see AI-curated picks.
                </p>
              </div>
            )}

            {loading && (
              <div className="grid sm:grid-cols-2 gap-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-slate-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                      <div className="h-4 w-3/4 bg-slate-200 rounded" />
                      <div className="h-3 w-full bg-slate-200 rounded" />
                      <div className="h-6 w-16 bg-slate-200 rounded mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50">
                <p className="text-rose-600 font-medium">{error}</p>
              </div>
            )}

            {results && !loading && !error && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    Top {results.length} AI picks for you
                  </h3>
                  <span className="text-sm text-slate-500">
                    Sorted by match score
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {results.map((r, i) => (
                    <div key={r.product.id} className="flex flex-col gap-3">
                      <ProductCard
                        product={{ ...r.product, matchScore: r.matchScore }}
                        index={i}
                      />
                      <div className="flex gap-2.5 rounded-xl bg-blue-50/70 border border-blue-100 p-3.5 -mt-2">
                        <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {r.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-blue-500">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
