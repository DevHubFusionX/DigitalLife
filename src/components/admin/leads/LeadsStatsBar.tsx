import { Users, DollarSign, Download, TrendingUp } from 'lucide-react';
import type { Lead } from '../../../types/lead';

interface LeadsStatsBarProps {
  leads: Lead[];
}

export default function LeadsStatsBar({ leads }: LeadsStatsBarProps) {
  const paidLeads = leads.filter((l) => l.isPaid);
  const freeLeads = leads.filter((l) => !l.isPaid);
  const totalRevenueUSD = paidLeads.reduce((acc, l) => acc + (Number(l.amountPaid) || 0), 0);
  const totalRevenueNGN = Math.round(totalRevenueUSD * 1600);
  const conversionRate = leads.length > 0 ? Math.round((paidLeads.length / leads.length) * 100) : 0;
  const aov = paidLeads.length > 0 ? (totalRevenueUSD / paidLeads.length) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Captured Leads */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Total Leads CRM</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Users className="w-3.5 h-3.5 text-[#3e4095]" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {leads.length}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Corporate contacts collected
          </p>
        </div>
      </div>

      {/* 2. Paid Orders & Revenue (Featured Gold) */}
      <div className="bg-gradient-to-br from-[#ffd148] via-[#f5c738] to-[#e6bd3e] text-slate-950 rounded-[24px] p-5 flex flex-col justify-between shadow-md shadow-[#ffd148]/20 min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-black text-slate-900/90">Paystack Revenue</span>
          <div className="w-7 h-7 rounded-xl bg-slate-950/10 flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-slate-950" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 leading-none">
            ${totalRevenueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h3>
          <p className="text-[11px] font-bold text-slate-900/80 mt-1">
            ₦{totalRevenueNGN.toLocaleString('en-US')} ({paidLeads.length} paid orders)
          </p>
        </div>
      </div>

      {/* 3. Free SOP Downloads */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Free Downloads</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Download className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {freeLeads.length}
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Top-of-funnel prospects
          </p>
        </div>
      </div>

      {/* 4. Conversion Rate & AOV */}
      <div className="bg-white rounded-[24px] p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-[130px]">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold text-slate-500">Conversion Rate</span>
          <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
            {conversionRate}%
          </h3>
          <p className="text-[11px] font-semibold text-slate-400 mt-1">
            Avg order: ${aov.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
