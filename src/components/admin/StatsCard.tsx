import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color: 'blue' | 'gold' | 'green' | 'purple';
}

const COLOR_MAP = {
  blue: {
    bg: 'bg-[#3e4095]/10',
    icon: 'text-[#3e4095]',
    border: 'border-[#3e4095]/10',
  },
  gold: {
    bg: 'bg-[#ffd148]/10',
    icon: 'text-[#b49200]',
    border: 'border-[#ffd148]/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-600',
    border: 'border-emerald-500/10',
  },
  purple: {
    bg: 'bg-violet-500/10',
    icon: 'text-violet-600',
    border: 'border-violet-500/10',
  },
};

export default function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
  const c = COLOR_MAP[color];

  return (
    <div className={`bg-white rounded-2xl border p-5 flex items-center gap-4 ${c.border}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${c.bg}`}>
        <Icon className={`w-5 h-5 ${c.icon}`} />
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-2xl font-black text-slate-950 leading-tight">{value}</p>
      </div>
    </div>
  );
}
