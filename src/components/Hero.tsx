import { Sparkles, ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
    >
      {/* gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-blue-50/40 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[80rem] h-[40rem] bg-gradient-to-br from-cyan-200/40 via-blue-200/30 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-20 right-10 -z-10 w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full" />
      <div className="absolute top-40 left-10 -z-10 w-72 h-72 bg-blue-300/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-blue-200/60 text-sm font-medium text-blue-700 shadow-sm mb-6 animate-[fadeIn_0.6s_ease-out]">
            <Sparkles className="w-4 h-4" />
            AI-powered recommendations for smarter shopping
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-[fadeIn_0.7s_ease-out]">
            Shop Smarter with{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C40 3 160 3 198 9"
                  stroke="url(#g)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto animate-[fadeIn_0.8s_ease-out]">
            Let our AI shopping assistant find the perfect products for your
            needs, budget, and preferences — no endless scrolling required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeIn_0.9s_ease-out]">
            <a
              href="#planner"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-base font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
            >
              Start Planning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-700 text-base font-semibold border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 transition-all"
            >
              Browse Products
            </a>
          </div>

          {/* trust row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 animate-[fadeIn_1s_ease-out]">
            <span className="inline-flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.8/5 average match rating
            </span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
            <span>12,000+ products analyzed</span>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300" />
            <span>Personalized in seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
