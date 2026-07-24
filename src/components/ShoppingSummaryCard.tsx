import { Wallet, TrendingUp, PiggyBank, Target, BarChart3 } from 'lucide-react';
import type { ShoppingSummary } from '@/services';

interface Props {
  summary: ShoppingSummary;
}

export default function ShoppingSummaryCard({ summary }: Props) {
  const {
    totalBudget,
    estimatedSpending,
    remainingBudget,
    productCount,
    averageMatch,
    estimatedSavings,
  } = summary;

  const spentPct = totalBudget > 0 ? Math.min((estimatedSpending / totalBudget) * 100, 100) : 0;
  const remainingPct = 100 - spentPct;
  const isOverBudget = estimatedSpending > totalBudget;

  const stats = [
    { icon: Wallet, label: 'Total Budget', value: `$${totalBudget}`, color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: TrendingUp, label: 'Estimated Spending', value: `$${estimatedSpending}`, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    {
      icon: PiggyBank,
      label: 'Remaining Budget',
      value: isOverBudget ? `-$${Math.abs(remainingBudget)}` : `$${remainingBudget}`,
      color: isOverBudget ? 'text-rose-600' : 'text-emerald-600',
      bg: isOverBudget ? 'bg-rose-50' : 'bg-emerald-50',
    },
    { icon: Target, label: 'AI Match', value: `${averageMatch}%`, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="glass rounded-2xl p-6 sm:p-7 animate-fade-in-up">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 leading-tight">Shopping Summary</h3>
          <p className="text-xs text-slate-500">{productCount} products recommended</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-slate-100 p-3.5 hover:shadow-sm transition-shadow">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-xs text-slate-500 mb-0.5">{s.label}</p>
              <p className={`text-lg font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          );
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Budget Breakdown</span>
          <span className="text-xs text-slate-400">
            Est. savings: <span className="font-semibold text-emerald-600">${estimatedSavings}</span>
          </span>
        </div>
        <div className="flex h-4 rounded-full overflow-hidden bg-slate-100 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-700 ease-out flex items-center justify-center"
            style={{ width: `${spentPct}%` }}
            title={`Spent: $${estimatedSpending}`}
          >
            {spentPct > 15 && (
              <span className="text-[10px] font-bold text-white px-1 truncate">{Math.round(spentPct)}%</span>
            )}
          </div>
          <div
            className="h-full bg-emerald-100 transition-all duration-700 ease-out flex items-center justify-center"
            style={{ width: `${remainingPct}%` }}
            title={`Remaining: $${remainingBudget}`}
          >
            {remainingPct > 15 && (
              <span className="text-[10px] font-bold text-emerald-600 px-1 truncate">{Math.round(remainingPct)}%</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2.5 text-xs">
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            Spent (${estimatedSpending})
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
            Remaining (${remainingBudget})
          </span>
        </div>
      </div>
    </div>
  );
}
