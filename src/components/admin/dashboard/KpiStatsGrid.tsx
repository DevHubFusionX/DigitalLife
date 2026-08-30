import { DollarSign, Users, Layers, BookOpen } from 'lucide-react';

interface KpiStatsGridProps {
  totalRevenueNGN: number;
  paidLeadsCount: number;
  totalLeadsCount: number;
  freeLeadsCount: number;
  totalResourcesCount: number;
  paidResourcesCount: number;
  freeResourcesCount: number;
  totalArticlesCount: number;
  totalPlaybooksCount: number;
}

export default function KpiStatsGrid({
  totalRevenueNGN,
  paidLeadsCount,
  totalLeadsCount,
  freeLeadsCount,
  totalResourcesCount,
  paidResourcesCount,
  freeResourcesCount,
  totalArticlesCount,
  totalPlaybooksCount,
}: KpiStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1: Actual Paid Book & Template Revenue (Featured Gold) */}
      <div className="bg-gradient-to-br from-[#ffd148] via-[#f5c738] to-[#e6bd3e] text-slate-950 rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-lg shadow-[#ffd148]/20 min-h-[160px] sm:min-h-[170px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black text-slate-900/90">Actual Paid Revenue</span>
          <div className="w-7 h-7 rounded-xl bg-slate-950/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-slate-950" />
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-950 leading-none tracking-tight">
            ₦{totalRevenueNGN.toLocaleString('en-US')}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-black text-slate-900/90">
          <span>{paidLeadsCount} paid order{paidLeadsCount === 1 ? '' : 's'}</span>
          <span className="text-slate-900/70 font-bold">completed</span>
        </div>
      </div>

      {/* Card 2: Actual Corporate Leads Captured */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Corporate Leads</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Users className="w-3.5 h-3.5 text-[#3e4095]" />
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-none tracking-tight">
            {totalLeadsCount}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600">
          <span>{freeLeadsCount} free</span>
          <span className="text-slate-400 font-semibold">unlocks</span>
        </div>
      </div>

      {/* Card 3: Actual Live Resources in Catalog */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Total Resources</span>
          <div className="w-7 h-7 rounded-xl bg-[#ffd148]/15 flex items-center justify-center text-[#b49200]">
            <Layers className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-none tracking-tight">
            {totalResourcesCount}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#3e4095]">
          <span>{paidResourcesCount} paid</span>
          <span className="text-slate-400 font-semibold">· {freeResourcesCount} free</span>
        </div>
      </div>

      {/* Card 4: Actual Articles & Playbooks */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[160px] sm:min-h-[170px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Articles &amp; Playbooks</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <BookOpen className="w-3.5 h-3.5 text-slate-700" />
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 leading-none tracking-tight">
            {totalArticlesCount + totalPlaybooksCount}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600">
          <span>{totalArticlesCount} articles</span>
          <span className="text-slate-400 font-semibold">· {totalPlaybooksCount} playbooks</span>
        </div>
      </div>
    </div>
  );
}
