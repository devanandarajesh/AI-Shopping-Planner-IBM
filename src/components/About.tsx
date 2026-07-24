import { Target, Zap, ShieldCheck, GraduationCap, Github, Linkedin } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Need-based matching',
    text: 'Our AI weighs your stated requirements to surface products that actually fit your use case.',
  },
  {
    icon: Zap,
    title: 'Instant recommendations',
    text: 'Get curated picks in seconds — no more endless scrolling through thousands of listings.',
  },
  {
    icon: ShieldCheck,
    title: 'Budget-aware picks',
    text: 'Recommendations respect your budget and highlight the best value within your range.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-gradient-to-b from-white to-purple-50/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 blur-3xl rounded-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wide mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              Internship Project
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              An AI shopping assistant built to learn
            </h2>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              ShopWise AI is an internship project that explores how artificial
              intelligence can simplify everyday shopping decisions. It
              recommends products based on your needs, budget, and preferences
              — turning hours of research into a single click.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              This project is a front-end demonstration using dummy data and
              simulated AI logic. No backend or external APIs are involved —
              it's a lightweight, optimized prototype focused on user
              experience and clean design.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-medium text-slate-500">Built with:</span>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Tailwind CSS'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:-translate-y-0.5 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:border-purple-300 hover:-translate-y-0.5 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`glass rounded-2xl p-6 card-hover animate-[fadeIn_0.5s_ease-out_both] ${
                  i === 2 ? 'sm:col-span-2' : ''
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30 mb-4">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
