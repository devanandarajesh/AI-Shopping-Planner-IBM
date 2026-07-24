import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHidden(true), 1400);
    const t2 = setTimeout(() => setGone(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 transition-opacity duration-500 ${
        hidden ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="animate-scale-in">
        <Logo size="lg" showText={false} />
      </div>
      <div className="mt-6 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-400 tracking-wide">
        ShopWise AI
      </p>
    </div>
  );
}
