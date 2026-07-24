import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Planner', href: '#planner' },
  { label: 'Products', href: '#products' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-purple-100/60 shadow-lg shadow-purple-500/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="group">
            <Logo size="md" />
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50/60 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#planner"
              className="btn-gradient inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Try the Planner
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-80 pb-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50/60 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#planner"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25"
              >
                Try the Planner
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
