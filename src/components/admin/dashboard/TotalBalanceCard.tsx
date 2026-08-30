import { Link } from 'react-router-dom';
import { ArrowRightLeft, Plus } from 'lucide-react';

interface TotalBalanceCardProps {
  totalRevenueNGN: number;
  paidOrdersCount: number;
  totalLeadsCount: number;
  onExportCSV: () => void;
}

export default function TotalBalanceCard({
  totalRevenueNGN,
  paidOrdersCount,
  totalLeadsCount,
  onExportCSV,
}: TotalBalanceCardProps) {
  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400">Total Resource &amp; Book Revenue</span>
        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/80 px-3 py-1 rounded-full text-xs font-black text-slate-700">
          🇳🇬 NGN (₦)
        </span>
      </div>

      {/* Real Balance Amount */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-none">
          ₦{totalRevenueNGN.toLocaleString('en-US')}
        </h2>
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="text-emerald-600 font-extrabold text-xs flex items-center gap-0.5">
            {paidOrdersCount} Paid Order{paidOrdersCount === 1 ? '' : 's'}
          </span>
          <span className="text-xs font-semibold text-slate-400">processed via Paystack</span>
        </div>
      </div>

      {/* Action Buttons: Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onExportCSV}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer border-none shadow-xs touch-manipulation"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" /> Export Leads
        </button>
        <Link
          to="/admin/resources"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs transition-colors no-underline text-center touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> Add Resource
        </Link>
      </div>

      {/* Revenue Channels Breakdown */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Acquisition Channels</span>
          <span>Live Data</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Channel 1: NGN Paystack */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#fafafa] border border-slate-200/60 flex flex-col justify-between h-20">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">🇳🇬 NGN</span>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 truncate">
                ₦{totalRevenueNGN.toLocaleString('en-US')}
              </p>
              <span className="text-[9px] font-bold text-emerald-600">Paystack</span>
            </div>
          </div>

          {/* Channel 2: Paid Orders */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#fafafa] border border-slate-200/60 flex flex-col justify-between h-20">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">📦 Orders</span>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 truncate">
                {paidOrdersCount}
              </p>
              <span className="text-[9px] font-bold text-emerald-600">Fulfilled</span>
            </div>
          </div>

          {/* Channel 3: Direct Leads */}
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#fafafa] border border-slate-200/60 flex flex-col justify-between h-20">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1">🌐 Leads</span>
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">{totalLeadsCount}</p>
              <span className="text-[9px] font-bold text-[#3e4095]">Captured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
