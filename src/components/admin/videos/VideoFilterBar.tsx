import { Search, LayoutGrid, List, Plus, X } from 'lucide-react';

interface VideoFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  categories: { id: string; name: string }[];
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  totalCount: number;
  onAddNew: () => void;
}

export default function VideoFilterBar({
  search,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  viewMode,
  onViewModeChange,
  totalCount,
  onAddNew,
}: VideoFilterBarProps) {
  return (
    <div className="bg-white rounded-[28px] p-4 sm:p-5 border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
      {/* Top Row: Search + View Switcher + Add Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by video title, topic, or description..."
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

        {/* Right Controls: View Switcher and Add Action */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-full transition-all cursor-pointer border-none ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 bg-transparent'
              }`}
              title="Visual Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-full transition-all cursor-pointer border-none ${
                viewMode === 'table'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-700 bg-transparent'
              }`}
              title="Structured Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Add Video Button */}
          <button
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs border-none cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Video
          </button>
        </div>
      </div>

      {/* Bottom Row: Dynamic Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
        <button
          onClick={() => onSelectCategory('')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none ${
            selectedCategory === ''
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          All Topics ({totalCount})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border-none ${
              selectedCategory === cat.name
                ? 'bg-[#3e4095] text-white shadow-xs'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
