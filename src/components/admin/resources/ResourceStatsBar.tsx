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
          <div className="w-7 h-7 rounded-xl bg-[#ffd148]/15 flex items-center justify-center text-[#b49200]">
            <Layers className="w-3.5 h-3.5" />
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

      {/* 2. Premium Paid Assets (Featured Gold) */}
      <div className="bg-gradient-to-br from-[#ffd148] via-[#f5c738] to-[#e6bd3e] text-slate-950 rounded-[24px] p-5 flex flex-col justify-between shadow-md shadow-[#ffd148]/20 min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black text-slate-900/90">Premium Inventory</span>
          <div className="w-7 h-7 rounded-xl bg-slate-950/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-slate-950" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 leading-none">
            {paidResources.length} Paid
          </h3>
          <p className="text-[11px] font-bold text-slate-900/80 mt-1">
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
