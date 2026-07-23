import { Brain, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Brain className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">
                AI Shopping Planner
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              An AI-powered shopping assistant that helps you choose the right
              products based on your needs, budget, and preferences.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { l: 'Home', h: '#home' },
                { l: 'Planner', h: '#planner' },
                { l: 'Products', h: '#products' },
                { l: 'About', h: '#about' },
              ].map((l) => (
                <li key={l.h}>
                  <a
                    href={l.h}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Project
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Internship project demonstrating AI-assisted product
              recommendations with a focus on clean, modern UI.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AI Shopping Planner. Internship project.
          </p>
          <p className="text-sm text-slate-500 inline-flex items-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for learning
          </p>
        </div>
      </div>
    </footer>
  );
}
