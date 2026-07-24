import { ShoppingBag, Sparkles } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: 'w-8 h-8', icon: 'w-4 h-4', spark: 'w-2.5 h-2.5', text: 'text-base' },
  md: { box: 'w-10 h-10', icon: 'w-5 h-5', spark: 'w-3 h-3', text: 'text-lg' },
  lg: { box: 'w-14 h-14', icon: 'w-7 h-7', spark: 'w-4 h-4', text: 'text-2xl' },
};

export default function Logo({ size = 'md', showText = true, className = '' }: Props) {
  const s = sizeMap[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${s.box} rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300`}>
        <ShoppingBag className={`${s.icon} text-white`} strokeWidth={2.5} />
        <div className="absolute -top-1 -right-1">
          <div className={`${s.spark} rounded-full bg-gradient-to-br from-cyan-300 to-purple-400 flex items-center justify-center shadow-md`}>
            <Sparkles className={`w-1/2 h-1/2 text-white`} strokeWidth={3} />
          </div>
        </div>
      </div>
      {showText && (
        <span className={`font-extrabold ${s.text} tracking-tight text-slate-900`}>
          ShopWise{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI
          </span>
        </span>
      )}
    </div>
  );
}
