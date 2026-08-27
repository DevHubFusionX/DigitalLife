import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  adminName: string;
}

export default function DashboardHeader({ adminName }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight capitalize">
          Good morning, {adminName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-0.5">
          Real-time telemetry for Digitalife resource downloads, Paystack book sales, and captured leads.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Link
          to="/admin/resources"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs no-underline touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> New Resource
        </Link>
        <Link
          to="/admin/blog?action=new"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-xs no-underline touch-manipulation"
        >
          <Plus className="w-3.5 h-3.5" /> Publish Article
        </Link>
      </div>
    </div>
  );
}
