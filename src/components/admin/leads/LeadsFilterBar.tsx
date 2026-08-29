import { Search, ArrowUpDown, Download, CreditCard, FileText, X } from 'lucide-react';

interface LeadsFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  filterType: 'all' | 'paid' | 'free';
  onFilterTypeChange: (val: 'all' | 'paid' | 'free') => void;
  sortOrder: 'asc' | 'desc';
  onToggleSort: () => void;
  totalCount: number;
  paidCount: number;
  freeCount: number;
  filteredCount: number;
  onExportCSV: () => void;
}

export default function LeadsFilterBar({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  sortOrder,
  onToggleSort,
  totalCount,
  paidCount,
  freeCount,
  filteredCount,
  onExportCSV,
}: LeadsFilterBarProps) {
  return (
    <div className="bg-white rounded-[28px] p-4 sm:p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      {/* Top Row: Search + Sort + Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by customer name, email, resource or reference..."
            className="w-full bg-slate-50 border border-slate-200/90 rounded-full pl-9 pr-9 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-400 transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 border-none bg-transparent cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort Order & CSV Export */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onToggleSort}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 rounded-full text-xs font-bold transition-colors cursor-pointer"
            title="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>

          <button
            onClick={onExportCSV}
            disabled={totalCount === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV ({filteredCount})
          </button>
        </div>
      </div>

      {/* Bottom Row: Segmented Leads Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
        <button
          onClick={() => onFilterTypeChange('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none ${
            filterType === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          All Contacts ({totalCount})
        </button>

        <button
          onClick={() => onFilterTypeChange('paid')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer border-none flex items-center gap-1.5 ${
            filterType === 'paid'
              ? 'bg-gradient-to-r from-[#ffd148] to-[#e6bd3e] text-slate-950 shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-3 h-3" /> Paid Customers ({paidCount})
        </button>

        <button
          onClick={() => onFilterTypeChange('free')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none flex items-center gap-1.5 ${
            filterType === 'free'
              ? 'bg-[#3e4095] text-white shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-3 h-3" /> Free Downloads ({freeCount})
        </button>
      </div>
    </div>
  );
}
