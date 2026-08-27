import { Link } from 'react-router-dom';
import { CreditCard, Wifi, Sparkles } from 'lucide-react';

interface GatewayStatusCardsProps {
  paidOrdersCount: number;
  totalDeliveriesCount: number;
}

export default function GatewayStatusCards({
  paidOrdersCount,
  totalDeliveriesCount,
}: GatewayStatusCardsProps) {
  return (
    <div className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-slate-700" />
          <h3 className="text-xs font-black text-slate-900">Live Infrastructure</h3>
        </div>
        <Link to="/admin/settings" className="text-xs font-bold text-[#ff5f38] hover:underline no-underline">
          Settings →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Card 1: Paystack Engine Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1a1f2c] to-[#0f1219] p-4 text-white flex flex-col justify-between h-36 relative overflow-hidden shadow-md">
          <div className="flex justify-between items-center z-10">
            <Wifi className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[9px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full shadow-xs">
              Live
            </span>
          </div>

          <div className="z-10 my-auto">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Paystack Engine</p>
            <p className="text-xs font-black text-white">Card &amp; Bank Transfer</p>
          </div>

          <div className="z-10 flex justify-between items-end text-[9px] font-mono text-slate-400">
            <div>
              <span className="block text-[8px] text-slate-500">PAYMENTS</span>
              <span className="text-white font-bold text-[10px]">{paidOrdersCount} Processed</span>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500">HOOK</span>
              <span className="text-white font-bold text-[10px]">Instant</span>
            </div>
          </div>

          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-sm pointer-events-none" />
        </div>

        {/* Card 2: Resend Email Engine Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#ff5f38] to-[#ff7a54] p-4 text-white flex flex-col justify-between h-36 relative overflow-hidden shadow-md shadow-orange-500/15">
          <div className="flex justify-between items-center z-10">
            <Sparkles className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[9px] font-extrabold text-[#ff5f38] bg-white px-2 py-0.5 rounded-full shadow-xs">
              Active
            </span>
          </div>

          <div className="z-10 my-auto">
            <p className="text-[9px] text-white/80 font-bold uppercase tracking-wider">Resend Mailer</p>
            <p className="text-xs font-black text-white">Transactional API</p>
          </div>

          <div className="z-10 text-[9px] font-mono text-white/80">
            <span className="block text-[8px] text-white/60">DELIVERIES</span>
            <span className="text-white font-bold text-[10px]">{totalDeliveriesCount} Dispatched</span>
          </div>

          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-sm pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
