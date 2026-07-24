import { useEffect, useState } from 'react';
import { Brain, Search, DollarSign, GitCompare, Sparkles, Check } from 'lucide-react';

const STEPS = [
  { icon: Search, label: 'Analyzing Requirements', desc: 'Understanding your needs and preferences' },
  { icon: DollarSign, label: 'Matching Budget', desc: 'Finding products within your price range' },
  { icon: GitCompare, label: 'Comparing Products', desc: 'Evaluating ratings, features, and value' },
  { icon: Sparkles, label: 'Generating Recommendations', desc: 'Curating your personalized picks' },
];

interface Props {
  onComplete?: () => void;
  duration?: number;
}

export default function AiAnalysisLoader({ onComplete, duration = 2200 }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stepDuration = duration / STEPS.length;
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), stepDuration * i));
    });
    timers.push(setTimeout(() => onComplete?.(), duration));
    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 rounded-2xl glass animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/40 animate-pulse-glow">
          <Brain className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">AI is analyzing your request</h3>
      <p className="text-sm text-slate-500 mb-8">This will only take a moment…</p>

      <div className="w-full max-w-md space-y-1">
        {STEPS.map((step, i) => {
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-3 transition-all duration-500 ${
                isActive
                  ? 'bg-purple-50 border border-purple-200 scale-[1.02]'
                  : isDone
                    ? 'bg-emerald-50/50 border border-emerald-100'
                    : 'bg-slate-50 border border-slate-100 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isActive
                      ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white'
                      : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isDone ? (
                  <Check className="w-4.5 h-4.5" strokeWidth={3} />
                ) : (
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'animate-pulse' : ''}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold transition-colors ${
                    isDone ? 'text-emerald-700' : isActive ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-slate-400 truncate">{step.desc}</p>
              </div>
              {isActive && (
                <div className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mt-6">
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
