import { useState, useCallback } from 'react';
import {
  Wand2,
  SlidersHorizontal,
  DollarSign,
  Heart,
  ListChecks,
  RotateCcw,
  Sparkles,
  GitCompare,
  ArrowRight,
} from 'lucide-react';
import { categories } from '@/data/products';
import { getRecommendationService } from '@/services';
import type {
  BudgetRange,
  Preference,
  RecommendationResult,
  ShoppingSummary,
} from '@/services';
import { budgetToMax } from '@/services';
import ProductCard from './ProductCard';
import AiAnalysisLoader from './AiAnalysisLoader';
import ShoppingSummaryCard from './ShoppingSummaryCard';
import CompareModal from './CompareModal';
import { useSearchHistory } from '@/hooks/useSearchHistory';
import { useWishlist } from '@/hooks/useWishlist';

const budgetOptions: BudgetRange[] = ['Under $50', '$50–$150', '$150–$300', '$300+'];
const preferenceOptions: Preference[] = ['Best Value', 'Premium Quality', 'Eco-Friendly', 'Top Rated', 'Trending'];

const PLANS_KEY = 'ai_shopping_plan_count';

function buildSummary(results: RecommendationResult[], budget: BudgetRange | ''): ShoppingSummary {
  const totalBudget = budgetToMax(budget);
  const estimatedSpending = results.reduce((sum, r) => sum + r.product.price, 0);
  const remainingBudget = totalBudget - estimatedSpending;
  const averageMatch = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.matchScore, 0) / results.length)
    : 0;
  const estimatedSavings = Math.max(0, totalBudget - estimatedSpending);
  return { totalBudget, estimatedSpending, remainingBudget, productCount: results.length, averageMatch, estimatedSavings };
}

export default function Planner() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState<BudgetRange | ''>('');
  const [preference, setPreference] = useState<Preference | ''>('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);

  const { addEntry } = useSearchHistory();
  const { has: inWishlist, toggle: toggleWishlist } = useWishlist();

  const generate = useCallback(async () => {
    setLoading(true);
    setResults(null);
    setError(null);
    setCompareIds([]);
    try {
      const service = getRecommendationService();
      const recs = await service.recommend({ category: category || undefined, budget, preference, requirements });
      setResults(recs);
      const topMatch = recs[0]?.matchScore ?? 0;
      addEntry({ category: category || undefined, budget, preference, requirements }, recs.length, topMatch);
      try {
        const count = parseInt(localStorage.getItem(PLANS_KEY) || '0', 10) + 1;
        localStorage.setItem(PLANS_KEY, String(count));
      } catch { /* ignore */ }
    } catch {
      setError('Something went wrong generating recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [category, budget, preference, requirements, addEntry]);

  const reset = () => {
    setCategory(''); setBudget(''); setPreference(''); setRequirements('');
    setResults(null); setError(null); setCompareIds([]);
  };

  const toggleCompare = (id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const summary = results ? buildSummary(results, budget) : null;
  const compareResults = results
    ? compareIds.map((id) => results.find((r) => r.product.id === id)).filter((r): r is RecommendationResult => r != null)
    : [];
  const showCompare = compareResults.length === 2;

  return (
    <section id="planner" className="py-20 sm:py-28 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 blur-3xl rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Wand2 className="w-3.5 h-3.5" />
            AI Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Tell us what you need</h2>
          <p className="mt-3 text-slate-600 text-lg">Fill in a few details and our AI will instantly recommend the best products for you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 sm:p-8 lg:sticky lg:top-24">
              <div className="space-y-5">
                <Field icon={<SlidersHorizontal className="w-4 h-4" />} label="Product category">
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                    <option value="">Any category</option>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field icon={<DollarSign className="w-4 h-4" />} label="Budget">
                  <select value={budget} onChange={(e) => setBudget(e.target.value as BudgetRange | '')} className="input">
                    <option value="">Any budget</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field icon={<Heart className="w-4 h-4" />} label="Preferences">
                  <select value={preference} onChange={(e) => setPreference(e.target.value as Preference | '')} className="input">
                    <option value="">No preference</option>
                    {preferenceOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </Field>
                <Field icon={<ListChecks className="w-4 h-4" />} label="Requirements">
                  <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={3} placeholder="e.g. lightweight, waterproof, good battery life…" className="input resize-none" />
                </Field>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={generate}
                    disabled={loading}
                    className="btn-gradient flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {loading ? (<><Wand2 className="w-5 h-5 animate-pulse" />Analyzing…</>) : (<><Wand2 className="w-5 h-5" />Generate Recommendation</>)}
                  </button>
                  <button onClick={reset} className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" aria-label="Reset">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {!loading && !results && !error && (
              <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border-2 border-dashed border-purple-200/60 bg-white/40 backdrop-blur-sm animate-fade-in-up">
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-2xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/30 animate-float">
                    <Wand2 className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Ready to find your perfect products?</h3>
                <p className="text-slate-500 mt-2 max-w-sm leading-relaxed">
                  Fill in the form and hit <span className="font-semibold gradient-text">Generate Recommendation</span> to get AI-curated picks with match scores, pros &amp; cons, and personalized explanations.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur border border-slate-200"><Sparkles className="w-3 h-3 text-purple-500" /> Match scores</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur border border-slate-200"><GitCompare className="w-3 h-3 text-purple-500" /> Side-by-side compare</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur border border-slate-200"><DollarSign className="w-3 h-3 text-purple-500" /> Budget tracking</span>
                </div>
              </div>
            )}

            {loading && <AiAnalysisLoader duration={2200} />}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50">
                <p className="text-rose-600 font-medium">{error}</p>
              </div>
            )}

            {results && !loading && !error && (
              <>
                {compareIds.length > 0 && (
                  <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-50/70 to-purple-50/70 border border-purple-200 px-4 py-3 animate-slide-in">
                    <span className="text-sm font-medium text-purple-700">
                      {compareIds.length === 2 ? 'Ready! Click to compare your two selections.' : `Select ${2 - compareIds.length} more product to compare.`}
                    </span>
                    {showCompare && (
                      <button onClick={() => {}} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-md transition-all">
                        <GitCompare className="w-4 h-4" />
                        Compare Now
                      </button>
                    )}
                  </div>
                )}

                {summary && <ShoppingSummaryCard summary={summary} />}

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Top {results.length} AI picks for you</h3>
                    <span className="text-sm text-slate-500">Sorted by match score</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {results.map((r, i) => (
                      <ProductCard
                        key={r.product.id}
                        product={{ ...r.product, matchScore: r.matchScore }}
                        index={i}
                        pros={r.pros}
                        cons={r.cons}
                        reason={r.reason}
                        matchScore={r.matchScore}
                        selectable
                        selected={compareIds.includes(r.product.id)}
                        onToggleCompare={() => toggleCompare(r.product.id)}
                        onToggleWishlist={() => toggleWishlist(r.product.id)}
                        inWishlist={inWishlist(r.product.id)}
                        buyingTips={r.buyingTips}
                      />
                    ))}
                  </div>
                </div>

                {results.length >= 2 && (
                  <div className="flex items-center justify-center pt-2">
                    <button
                      onClick={() => {
                        if (compareIds.length !== 2) setCompareIds([results[0].product.id, results[1].product.id]);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur border border-slate-200/60 text-slate-700 text-sm font-semibold hover:border-purple-300 hover:text-purple-600 hover:shadow-sm transition-all"
                    >
                      <GitCompare className="w-4 h-4" />
                      {compareIds.length === 2 ? 'Comparing top 2 products' : 'Compare top 2 products'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showCompare && (
        <CompareModal a={compareResults[0]} b={compareResults[1]} onClose={() => setCompareIds([])} />
      )}
    </section>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-purple-500">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}
