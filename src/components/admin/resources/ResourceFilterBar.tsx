import { Search, LayoutGrid, List, SlidersHorizontal, Plus, X } from 'lucide-react';

interface ResourceFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  priceFilter: 'all' | 'paid' | 'free';
  onPriceFilterChange: (val: 'all' | 'paid' | 'free') => void;
  categoryFilter: string;
  onCategoryFilterChange: (val: string) => void;
  categories: { id: string; name: string }[];
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  totalCount: number;
  paidCount: number;
  freeCount: number;
  onAddNew: () => void;
}

export default function ResourceFilterBar({
  search,
  onSearchChange,
  priceFilter,
  onPriceFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  categories,
  viewMode,
  onViewModeChange,
  totalCount,
  paidCount,
  freeCount,
  onAddNew,
}: ResourceFilterBarProps) {
  return (
    <div className="bg-white rounded-[28px] p-4 sm:p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      {/* Top Row: Search Input + Category + View Mode + Add Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, category, format..."
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

        {/* Right Controls: Category Filter, View Mode, and New Action */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              className="bg-slate-50 border border-slate-200/90 rounded-full pl-3 pr-8 py-2.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-full transition-all cursor-pointer border-none ${
                viewMode === 'grid' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-700 bg-transparent'
              }`}
              title="Visual Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-full transition-all cursor-pointer border-none ${
                viewMode === 'table' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-slate-700 bg-transparent'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Resource Button */}
          <button
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Resource
          </button>
        </div>
      </div>

      {/* Bottom Row: Pricing Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
        <button
          onClick={() => onPriceFilterChange('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none ${
            priceFilter === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          All Items ({totalCount})
        </button>

        <button
          onClick={() => onPriceFilterChange('paid')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all whitespace-nowrap cursor-pointer border-none ${
            priceFilter === 'paid'
              ? 'bg-gradient-to-r from-[#ffd148] to-[#e6bd3e] text-slate-950 shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Paid Products ({paidCount})
        </button>

        <button
          onClick={() => onPriceFilterChange('free')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none ${
            priceFilter === 'free'
              ? 'bg-[#3e4095] text-white shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Free SOP Downloads ({freeCount})
        </button>
      </div>
    </div>
  );
}
