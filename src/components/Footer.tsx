import { Heart } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Smart Shopping, Smarter Decisions. An AI-powered shopping
              assistant that helps you choose the right products based on your
              needs, budget, and preferences.
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
                { l: 'Dashboard', h: '#dashboard' },
                { l: 'About', h: '#about' },
              ].map((l) => (
                <li key={l.h}>
                  <a
                    href={l.h}
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                  >
                    {l.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              About ShopWise AI
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              An internship project demonstrating AI-assisted product
              recommendations with a focus on clean, modern UI and
              intelligent matching.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ShopWise AI. Internship project.
          </p>
          <p className="text-sm text-slate-500 inline-flex items-center gap-1.5">
            Built with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for learning
          </p>
        </div>
      </div>
    </footer>
  );
}
