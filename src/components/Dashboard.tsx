import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Heart,
  Sparkles,
  PiggyBank,
  History,
  Trash2,
  Clock,
} from 'lucide-react';
import type { SearchHistoryEntry } from '@/services';

interface Props {
  history: SearchHistoryEntry[];
  onClearHistory: () => void;
}

const WISHLIST_KEY = 'ai_shopping_wishlist';
const PLANS_KEY = 'ai_shopping_plan_count';

function loadNumber(key: string): number {
  try {
    return parseInt(localStorage.getItem(key) || '0', 10);
  } catch {
    return 0;
  }
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard({ history, onClearHistory }: Props) {
  const [planCount, setPlanCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setPlanCount(loadNumber(PLANS_KEY));
    setWishlistCount(loadNumber(WISHLIST_KEY));
  }, [history]);

  const recommendedProducts = history.reduce((sum, h) => sum + h.resultCount, 0);
  const estimatedSavings = history.length * 42;

  const stats = [
    { icon: ClipboardList, label: 'Total Shopping Plans', value: planCount, color: 'from-blue-500 to-indigo-600' },
    { icon: Heart, label: 'Wishlist Items', value: wishlistCount, color: 'from-rose-500 to-pink-600' },
    { icon: Sparkles, label: 'Recommended Products', value: recommendedProducts, color: 'from-amber-500 to-orange-600' },
    { icon: PiggyBank, label: 'Estimated Savings', value: `$${estimatedSavings}`, color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <section id="dashboard" className="py-20 sm:py-28 bg-gradient-to-b from-purple-50/30 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-96 bg-gradient-to-b from-purple-100/30 to-transparent blur-3xl rounded-full -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Your shopping insights
          </h2>
          <p className="mt-3 text-slate-600 text-lg">
            Track your plans, wishlist, and recent AI searches in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 card-hover animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-0.5">{s.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 leading-tight">Recent Searches</h3>
                <p className="text-xs text-slate-500">Your last {history.length} shopping plans</p>
              </div>
            </div>
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-500">No searches yet</p>
              <p className="text-xs text-slate-400 mt-1">Generate a recommendation to start building your history.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 hover:border-purple-200 hover:bg-purple-50/30 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {h.input.category || 'All categories'}
                      {h.input.budget ? ` · ${h.input.budget}` : ''}
                      {h.input.preference ? ` · ${h.input.preference}` : ''}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{h.input.requirements || 'No specific requirements'}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      {h.topMatch}% match
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(h.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
