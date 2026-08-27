import { Layers, DollarSign, Download, Sparkles } from 'lucide-react';
import type { Resource } from '../../../types/resource';

interface ResourceStatsBarProps {
  resources: Resource[];
}

export default function ResourceStatsBar({ resources }: ResourceStatsBarProps) {
  const paidResources = resources.filter((r) => !r.isFree && Number(r.price) > 0);
  const freeResources = resources.filter((r) => r.isFree || !r.price || Number(r.price) === 0);
  const totalCatalogValue = paidResources.reduce((acc, r) => acc + (Number(r.price) || 0), 0);
  const uniqueCategories = Array.from(new Set(resources.map((r) => r.category).filter(Boolean)));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Catalog */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Total Catalog</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Layers className="w-3.5 h-3.5 text-[#ff5f38]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {resources.length}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Active blueprints &amp; books
          </p>
        </div>
      </div>

      {/* 2. Premium Paid Assets (Featured Orange) */}
      <div className="bg-gradient-to-br from-[#ff5f38] to-[#ff7347] text-white rounded-[24px] p-5 flex flex-col justify-between shadow-md shadow-orange-500/15 min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-white/90">Premium Inventory</span>
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-none">
            {paidResources.length} Paid
          </h3>
          <p className="text-[11px] font-bold text-white/80 mt-1">
            ${totalCatalogValue.toFixed(2)} catalog value
          </p>
        </div>
      </div>

      {/* 3. Free SOP Downloads */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Free SOP Downloads</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Download className="w-3.5 h-3.5 text-[#3e4095]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {freeResources.length} Free
          </h3>
          <p className="text-[11px] font-semibold text-emerald-600 mt-1 font-bold">
            Lead acquisition drivers
          </p>
        </div>
      </div>

      {/* 4. Category Diversity */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Subject Coverage</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {uniqueCategories.length} Topics
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1 truncate">
            {uniqueCategories.slice(0, 3).join(', ') || 'Operations, Finance'}
          </p>
        </div>
      </div>
    </div>
  );
}
