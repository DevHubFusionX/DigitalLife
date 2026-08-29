import { Target } from 'lucide-react';

interface MilestoneProgressCardProps {
  currentCount: number;
  targetCount: number;
}

export default function MilestoneProgressCard({
  currentCount,
  targetCount,
}: MilestoneProgressCardProps) {
  const percentage = Math.min(100, Math.round((currentCount / targetCount) * 100));

  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#b49200]" />
          <h3 className="text-xs font-black text-slate-900">Lead Milestone Target</h3>
        </div>
        <span className="text-[10px] font-black text-[#b49200] bg-[#ffd148]/20 px-2.5 py-0.5 rounded-full">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ffd148] to-[#e6bd3e] transition-all duration-500"
          style={{ width: `${Math.max(4, percentage)}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
        <span className="text-slate-800 font-extrabold">{currentCount} leads captured</span>
        <span>{targetCount} milestone goal</span>
      </div>
    </div>
  );
}
