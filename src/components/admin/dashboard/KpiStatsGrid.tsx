import { DollarSign, Users, Layers, BookOpen } from 'lucide-react';

interface KpiStatsGridProps {
  totalRevenueUSD: number;
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
  totalRevenueUSD,
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
      {/* Card 1: Actual Paid Book & Template Revenue (Featured Orange) */}
      <div className="bg-gradient-to-br from-[#ff5f38] to-[#ff7347] text-white rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-lg shadow-orange-500/15 min-h-[160px] sm:min-h-[170px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-white/90">Actual Paid Revenue</span>
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="my-2">
          <h3 className="text-2xl sm:text-4xl font-black text-white leading-none tracking-tight">
            ${totalRevenueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-white/90">
          <span>{paidLeadsCount} paid order{paidLeadsCount === 1 ? '' : 's'}</span>
          <span className="text-white/70 font-semibold">completed</span>
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
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Layers className="w-3.5 h-3.5 text-[#ff5f38]" />
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
